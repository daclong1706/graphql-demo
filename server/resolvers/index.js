// const Author = [
//   { id: "A1", name: "J.K. Rowling", age: 57, books: [] },
//   { id: "A2", name: "George R.R. Martin", age: 74, books: [] },
//   { id: "A3", name: "J.R.R. Tolkien", age: 81, books: [] },
// ];

// const Publisher = [
//   { id: "P1", name: "Bloomsbury", location: "London, UK", books: [] },
//   { id: "P2", name: "Bantam Books", location: "New York, USA", books: [] },
//   { id: "P3", name: "Allen & Unwin", location: "Sydney, Australia", books: [] },
// ];

// const Book = [
//   {
//     id: "B1",
//     name: "Harry Potter and the Philosopher's Stone",
//     genre: "Fantasy",
//     description: "The first book in the Harry Potter series.",
//     publicationDate: "1997-06-26",
//     author: "A1",
//     publisher: "P1",
//     isbn: "9780747532699",
//     price: 19.99,
//     stockQuantity: 100,
//     coverImage: "https://example.com/harrypotter1.jpg",
//   },
//   {
//     id: "B2",
//     name: "A Game of Thrones",
//     genre: "Fantasy",
//     description: "The first book in A Song of Ice and Fire series.",
//     publicationDate: "1996-08-06",
//     author: "A2",
//     publisher: "P2",
//     isbn: "9780553103540",
//     price: 24.99,
//     stockQuantity: 50,
//     coverImage: "https://example.com/got1.jpg",
//   },
//   {
//     id: "B3",
//     name: "The Fellowship of the Ring",
//     genre: "Fantasy",
//     description: "The first book in The Lord of the Rings trilogy.",
//     publicationDate: "1954-07-29",
//     author: "A3",
//     publisher: "P3",
//     isbn: "9780345339706",
//     price: 29.99,
//     stockQuantity: 30,
//     coverImage: "https://example.com/lotr1.jpg",
//   },
// ];

import { Author, Book, Publisher } from "../models/index.js";

export const resolvers = {
  Query: {
    books: async () => await Book.find(),
    book: async (_, { id }) => await Book.findById(id),
    authors: async () => await Author.find(),
    author: async (_, { id }) => await Author.findById(id),
    publishers: async () => await Publisher.find(),
    publisher: async (_, { id }) => await Publisher.findById(id),
  },
  Mutation: {
    addBook: async (_, args) => {
      const newBook = new Book(args);
      return await newBook.save();
    },
    addAuthor: async (_, args) => {
      const newAuthor = new Author(args);
      return await newAuthor.save();
    },
    addPublisher: async (_, args) => {
      const newPublisher = new Publisher(args);
      return await newPublisher.save();
    },
  },
  Book: {
    author: async (book) => await Author.findById(book.author),
    publisher: async (book) => await Publisher.findById(book.publisher),
  },
  Author: {
    books: async (author) => await Book.find({ author: author.id }),
  },
  Publisher: {
    books: async (publisher) => await Book.find({ publisher: publisher.id }),
  },
};
