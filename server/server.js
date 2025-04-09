import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas/index.js";
import { resolvers } from "./resolvers/index.js";
import {
  authorService,
  bookService,
  publisherService,
} from "./services/index.js";
import connectDB from "./config/connectDB.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: () => ({ authorService, bookService, publisherService }),
});

console.log(`🚀  Server ready at: ${url}`);
