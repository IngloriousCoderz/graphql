// @see https://www.apollographql.com/docs/react/data/subscriptions/
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'

import { ALL, UPDATE, REMOVE, CREATE_AND_NOTIFY, NEW_TODO } from './queries'

const cache = new InMemoryCache()

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: { reconnect: true },
})
const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)
const client = new ApolloClient({ cache, link, connectToDevTools: true })

export async function all(filter) {
  const { data } = await client.query({
    query: ALL,
    variables: { filter },
  })
  return data.todos
}

export async function create(text) {
  const { data } = await client.mutate({
    mutation: CREATE_AND_NOTIFY,
    variables: { text },
  })
  return data.create
}

export async function update(id, changes) {
  const { data } = await client.mutate({
    mutation: UPDATE,
    variables: { id, changes },
  })
  return data.update
}

export async function remove(id) {
  await client.mutate({
    mutation: REMOVE,
    variables: { id },
    update: cache => {
      const data = cache.readQuery({ query: ALL })
      const index = data.todos.findIndex(todo => todo.id === id)
      data.todos.splice(index, 1)
      cache.writeQuery({ query: ALL, data })
    },
  })
}

const observable = client.subscribe({ query: NEW_TODO })

observable.subscribe(({ data: newData }) => {
  const data = client.readQuery({ query: ALL })
  data.todos.push(newData.newTodo)
  client.writeQuery({ query: ALL, data })
})
