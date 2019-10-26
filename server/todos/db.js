module.exports = { all, get, create, update, remove }

let todos = [
  { id: 1, text: 'Todo 1', done: true },
  { id: 2, text: 'Todo 2', done: false },
  { id: 3, text: 'Todo 3' },
]

function all() {
  return todos
}

function get(id) {
  return todos.find(todo => todo.id === id)
}

function create(text) {
  const maxId = todos.length ? todos[todos.length - 1].id : 0
  const todo = { id: maxId + 1, text }
  todos.push(todo)
  return todo
}

function update(id, changes) {
  const todo = get(id)
  Object.assign(todo, changes)
  return todo
}

function remove(id) {
  const index = todos.findIndex(todo => todo.id === id)
  todos.splice(index, 1)
  return true
}
