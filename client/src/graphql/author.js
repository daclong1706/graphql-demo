import { gql } from "@apollo/client";

// Query để lấy danh sách sách
export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      yearOfBirth
    }
  }
`;

export const GET_AUTHOR_BY_ID = gql`
  query GetAuthorById($id: ID!) {
    author(id: $id) {
      id
      name
      yearOfBirth
      books {
        id
        name
      }
    }
  }
`;

export const GET_AUTHORS_NAME = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation addAuthor($name: String!, $yearOfBirth: Int) {
    addAuthor(name: $name, yearOfBirth: $yearOfBirth) {
      id
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $name: String, $yearOfBirth: Int) {
    updateAuthor(id: $id, name: $name, yearOfBirth: $yearOfBirth) {
      id
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
    }
  }
`;
