import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Thay bằng URL GraphQL của bạn
  cache: new InMemoryCache(),
});

export default client;
