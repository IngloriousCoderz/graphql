module.exports = {
  newTodo: {
    subscribe: (parent, args, { pubsub, channel }) =>
      pubsub.asyncIterator(channel),
  },
}
