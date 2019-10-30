import * as api from './api/axios'

const $form = document.querySelector('form')
const $text = document.querySelector('input')
const $list = document.querySelector('ul')
const $filter = document.querySelector('nav')

let filter = undefined

$form.addEventListener('submit', handleSubmit)
$list.addEventListener('click', handleClick)
$filter.addEventListener('click', handleFilter)

render()

// api.observable.subscribe((data) => console.log(data) || render())

async function render() {
  const todos = await api.all(filter)
  $list.innerHTML = todos
    .map(
      ({ id, text, done }) =>
        `
          <li id="${id}">
            <span class="${done ? 'done' : ''}">${text}</span>
            <button>x</button>
          </li>
        `,
    )
    .join('')
}

async function handleSubmit(event) {
  event.preventDefault()
  const text = $text.value
  $text.value = ''
  await api.create(text)
  render()
}

async function handleClick(event) {
  const { parentElement, tagName, className } = event.target
  const id = parseInt(parentElement.id, 10)

  switch (tagName) {
    case 'SPAN':
      await api.update(id, { done: !className.includes('done') })
      break

    case 'BUTTON':
      await api.remove(id)
      break
  }

  render()
}

function handleFilter(event) {
  event.preventDefault()

  switch (event.target.innerHTML) {
    case 'all':
      filter = undefined
      break

    case 'done':
      filter = { done: true }
      break

    case 'undone':
      filter = { done: false }
      break
  }

  render()
}
