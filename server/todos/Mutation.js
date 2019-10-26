module.exports = {
  create: (parent, args, { db }) => db.create(args.text),
  update: (parent, args, { db }) => db.update(args.id, args.changes),
  remove: (parent, args, { db }) => db.remove(args.id),

  createAndNotify: (parent, args, { db, pubsub, channel }) => {
    const todo = db.create(args.text)
    pubsub.publish(channel, { newTodo: todo })
    return todo
  },
}
