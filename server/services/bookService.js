import Book from "../models/Book.js";

const bookService = {
  addBook: async (args) => {
    const newBook = new Book(args);
    return await newBook.save();
  },
  updateBook: async (id, updateData) => {
    return await Book.findByIdAndUpdate(id, updateData, { new: true });
  },
  deleteBook: async (id) => {
    return await Book.findByIdAndDelete(id);
  },
  getBooks: async () => await Book.find(),
  getBookById: async (id) => await Book.findById(id),
  getBooksByAuthor: async (authorId) => {
    return await Book.find({ authorId });
  },
  getBooksByPublisher: async (publisherId) => {
    return await Book.find({ publisherId });
  },
};

export default bookService;
