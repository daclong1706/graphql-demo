import Book from "../models/Book.js";
import Author from "../models/Author.js";
import Publisher from "../models/Publisher.js";

const bookService = {
  addBook: async (args) => {
    const { authors, publishers, ...bookData } = args;

    const newBook = new Book({
      ...bookData,
      publishers,
      authors,
    });
    const savedBook = await newBook.save();

    await Promise.all(
      authors.map(async (authorId) => {
        await Author.findByIdAndUpdate(authorId, {
          $push: { books: savedBook._id },
        });
      })
    );

    await Promise.all(
      publishers.map(async (publisherId) => {
        await Publisher.findByIdAndUpdate(publisherId, {
          $push: { books: savedBook._id },
        });
      })
    );

    return savedBook;
  },

  updateBook: async (id, updateData) => {
    return await Book.findByIdAndUpdate(id, updateData, { new: true });
  },
  deleteBook: async (id) => {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (deletedBook) {
      await Author.updateMany({ books: id }, { $pull: { books: id } });

      await Publisher.updateMany({ books: id }, { $pull: { books: id } });
    }

    return deletedBook;
  },
  getBooks: async () => await Book.find(),
  getBookById: async (id) =>
    await Book.findById(id).populate("authors publishers"),
  getBooksByAuthor: async (authorId) => {
    return await Book.find({ authors: authorId });
  },
  getBooksByPublisher: async (publisherId) => {
    return await Book.find({ publishers: publisherId });
  },
};

export default bookService;
