import { gql } from "@apollo/client";

// Query để lấy danh sách sách
export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
      authors {
        id
        name
      }
      publishers {
        id
        name
      }
      coverImage
      description
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
      authors {
        id
        name
      }
      publishers {
        id
        name
      }
      coverImage
      description
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $name: String!
    $authorIds: [ID!]! # Mảng ID
    $publisherIds: [ID!]! # Mảng ID
    $genre: String
    $coverImage: String
    $description: String
  ) {
    addBook(
      name: $name
      authorIds: $authorIds
      publisherIds: $publisherIds
      genre: $genre
      coverImage: $coverImage
      description: $description
    ) {
      id
      name
      authors {
        id
        name
      }
      publishers {
        id
        name
      }
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation updateBook(
    $id: ID!
    $name: String
    $authorIds: [ID!] # Mảng ID
    $publisherIds: [ID!] # Mảng ID
    $genre: String
    $coverImage: String
    $description: String
  ) {
    updateBook(
      id: $id
      name: $name
      authorIds: $authorIds
      publisherIds: $publisherIds
      genre: $genre
      coverImage: $coverImage
      description: $description
    ) {
      id
      name
      authors {
        id
        name
      }
      publishers {
        id
        name
      }
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
