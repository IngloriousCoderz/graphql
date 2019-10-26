module.exports = {
  todos: (parent, args, { db }) => db.all(),
}
