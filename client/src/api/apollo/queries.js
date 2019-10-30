import { gql } from 'apollo-boost'
// or import gql from 'graphql-tag'

export const ALL = gql`
  query All($filter: FilterInput) {
    todos(filter: $filter) {
      id
      text
      done
    }
  }
`

export const CREATE = gql`
  mutation Create($text: String!) {
    create(text: $text) {
      id
      text
      done
    }
  }
`

export const UPDATE = gql`
  mutation Update($id: Int!, $changes: ChangesInput!) {
    update(id: $id, changes: $changes) {
      id
      text
      done
    }
  }
`

export const REMOVE = gql`
  mutation Remove($id: Int!) {
    remove(id: $id)
  }
`
