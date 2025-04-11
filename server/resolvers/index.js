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

export const resolvers = {
  Query: {
    books: async (_, __, { bookService }) => await bookService.getBooks(),
    book: async (_, { id }, { bookService }) =>
      await bookService.getBookById(id),

    authors: async (_, __, { authorService }) =>
      await authorService.getAuthors(),
    author: async (_, { id }, { authorService }) =>
      await authorService.getAuthorById(id),

    publishers: async (_, __, { publisherService }) =>
      await publisherService.getPublishers(),
    publisher: async (_, { id }, { publisherService }) =>
      await publisherService.getPublisherById(id),
  },
  Mutation: {
    addBook: async (_, args, { bookService }) =>
      await bookService.addBook(args),
    addAuthor: async (_, args, { authorService }) =>
      await authorService.addAuthor(args),
    addPublisher: async (_, args, { publisherService }) => {
      await publisherService.addPublisher(args);
    },

    updatePublisher: async (
      _,
      { id, name, location },
      { publisherService }
    ) => {
      return await publisherService.updatePublisher(id, { name, location });
    },

    deletePublisher: async (_, { id }, { publisherService }) => {
      return await publisherService.deletePublisher(id);
    },
  },
  Book: {
    author: async (book, _, { authorService }) => {
      return await authorService.getAuthorById(book.authorId);
    },
    publisher: async (book, _, { publisherService }) => {
      return await publisherService.getPublisherById(book.publisherId);
    },
  },
  Author: {
    books: async (author, _, { bookService }) => {
      return await bookService.getBooksByAuthor(author.id);
    },
  },
  Publisher: {
    books: async (publisher, _, { bookService }) => {
      return await bookService.getBooksByPublisher(publisher.id);
    },
  },
};
