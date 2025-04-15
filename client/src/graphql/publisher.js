import { gql } from "@apollo/client";

// Query để lấy danh sách sách
export const GET_PUBLISHERS = gql`
  query GetPublishers {
    publishers {
      id
      name
      location
    }
  }
`;

export const GET_PUBLISHERS_NAME = gql`
  query GetPublishers {
    publishers {
      id
      name
    }
  }
`;

// Query để lấy thông tin chi tiết của một cuốn sách theo ID
export const GET_PUBLISHERS_BY_ID = gql`
  query GetPublisherById($id: ID!) {
    publisher(id: $id) {
      id
      name
      location
    }
  }
`;

export const ADD_PUBLISHER = gql`
  mutation AddPublisher($name: String!, $location: String) {
    addPublisher(name: $name, location: $location) {
      id
    }
  }
`;

export const UPDATE_PUBLISHER = gql`
  mutation UpdatePublisher($id: ID!, $name: String, $location: String) {
    updatePublisher(id: $id, name: $name, location: $location) {
      id
    }
  }
`;

export const DELETE_PUBLISHER = gql`
  mutation DeletePublisher($id: ID!) {
    deletePublisher(id: $id) {
      id
      name
    }
  }
`;
