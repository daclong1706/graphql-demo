import { gql } from "@apollo/client";

// Query để lấy danh sách sách
export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
      author {
        id
        name
      }
      publisher {
        id
      }
      coverImage
    }
  }
`;

// Query để lấy thông tin chi tiết của một cuốn sách theo ID
export const GET_BOOK_BY_ID = gql`
  query GetBookById($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        name
      }
      publisher {
        name
      }
      coverImage
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $name: String!
    $authorId: ID!
    $publisherId: ID!
    $genre: String
    $coverImage: String
    $description: String
  ) {
    addBook(
      name: $name
      authorId: $authorId
      publisherId: $publisherId
      genre: $genre
      coverImage: $coverImage
      description: $description
    ) {
      id
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation updateBook(
    $id: ID!
    $name: String
    $authorId: ID!
    $publisherId: ID!
    $genre: String
    $coverImage: String
    $description: String
  ) {
    updateBook(
      id: $id
      name: $name
      authorId: $authorId
      publisherId: $publisherId
      genre: $genre
      coverImage: $coverImage
      description: $description
    ) {
      id
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      name
    }
  }
`;
