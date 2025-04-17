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
    // Thêm sách mới với nhiều tác giả và nhà sản xuất
    addBook: async (
      _,
      { authorIds, publisherIds, ...args },
      { bookService }
    ) => {
      return await bookService.addBook({
        ...args,
        authors: authorIds,
        publishers: publisherIds,
      });
    },

    updateBook: async (
      _,
      { id, authorIds, publisherIds, ...updateData },
      { bookService }
    ) => {
      return await bookService.updateBook(id, {
        ...updateData,
        authors: authorIds,
        publishers: publisherIds,
      });
    },

    addAuthor: async (_, args, { authorService }) =>
      await authorService.addAuthor(args),

    addPublisher: async (_, args, { publisherService }) =>
      await publisherService.addPublisher(args),

    updateAuthor: async (_, { id, name, yearOfBirth }, { authorService }) =>
      await authorService.updateAuthor(id, { name, yearOfBirth }),

    updatePublisher: async (_, { id, name, location }, { publisherService }) =>
      await publisherService.updatePublisher(id, { name, location }),

    deleteBook: async (_, { id }, { bookService }) =>
      await bookService.deleteBook(id),

    deleteAuthor: async (_, { id }, { authorService }) =>
      await authorService.deleteAuthor(id),

    deletePublisher: async (_, { id }, { publisherService }) =>
      await publisherService.deletePublisher(id),
  },
  Book: {
    authors: async (book, _, { authorService }) => {
      // `book.authors` sẽ chứa các ObjectIds, cần lấy chi tiết từ service
      return await Promise.all(
        book.authors.map((id) => authorService.getAuthorById(id))
      );
    },

    publishers: async (book, _, { publisherService }) => {
      // `book.publishers` sẽ chứa các ObjectIds, cần lấy chi tiết từ service
      return await Promise.all(
        book.publishers.map((id) => publisherService.getPublisherById(id))
      );
    },
  },

  Author: {
    // Lấy danh sách các sách mà tác giả đã viết
    books: async (author, _, { bookService }) => {
      return await bookService.getBooksByAuthor(author.id);
    },
  },

  Publisher: {
    // Lấy danh sách các sách mà nhà sản xuất đã xuất bản
    books: async (publisher, _, { bookService }) => {
      return await bookService.getBooksByPublisher(publisher.id);
    },
  },
};
