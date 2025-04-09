import { gql } from "@apollo/client";

// Query để lấy danh sách sách
export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
      author {
        name
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
