import ApolloClient from 'apollo-boost'

import { ALL, CREATE, UPDATE, REMOVE } from './queries'

const client = new ApolloClient({ uri: 'http://localhost:4000/' })

export async function all(filter) {
  const { data } = await client.query({
    query: ALL,
    variables: { filter },
  })
  return data.todos
}

export async function create(text) {
  const { data } = await client.mutate({
    mutation: CREATE,
    variables: { text },
    update: (proxy, { data: { create } }) => {
      const data = proxy.readQuery({ query: ALL })
      data.todos.push(create)
      proxy.writeQuery({ query: ALL, data })
    },
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
    update: proxy => {
      const data = proxy.readQuery({ query: ALL })
      const index = data.todos.findIndex(todo => todo.id === id)
      data.todos.splice(index, 1)
      proxy.writeQuery({ query: ALL, data })
    },
  })
}
