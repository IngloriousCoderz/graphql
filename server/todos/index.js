const { GraphQLServer, PubSub } = require('graphql-yoga')

const db = require('./db')
const Query = require('./Query')
const Mutation = require('./Mutation')
const Subscription = require('./Subscription')

const typeDefs = __dirname + '/schema.graphql'
const resolvers = { Query, Mutation, Subscription }
const pubsub = new PubSub()
const channel = 'NEW_TODO'

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { db, pubsub, channel },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
