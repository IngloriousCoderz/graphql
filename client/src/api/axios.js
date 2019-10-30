import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:4000/' })

export async function all(filter) {
  const { data } = await client.post('', {
    query: `
      query All($filter: FilterInput) {
        todos(filter: $filter) {
          id
          text
          done
        }
      }
    `,
    variables: { filter },
  })
  return data.data.todos
}

export async function create(text) {
  const { data } = await client.post('', {
    query: `
      mutation Create($text: String!) {
        create(text: $text) {
          id
          text
          done
        }
      }
    `,
    variables: { text },
  })
  return data.data.create
}

export async function update(id, changes) {
  const { data } = await client.post('', {
    query: `
      mutation Update($id: Int!, $changes: ChangesInput!) {
        update(id: $id, changes: $changes) {
          id
          text
          done
        }
      }
    `,
    variables: { id, changes },
  })
  return data.update
}

export async function remove(id) {
  await client.post('', {
    query: `
      mutation Remove($id: Int!) {
        remove(id: $id)
      }
    `,
    variables: { id },
  })
}
