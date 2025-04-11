import Author from "../models/Author.js";

const authorService = {
  addAuthor: async (args) => {
    const author = new Author(args);
    return await author.save();
  },
  updateAuthor: async (id, updateData) => {
    return await Author.findByIdAndUpdate(id, updateData, { new: true });
  },
  deleteAuthor: async (id) => {
    return await Author.findByIdAndDelete(id);
  },
  getAuthors: async () => await Author.find(),
  getAuthorById: async (id) => {
    const author = await Author.findById(id);
    if (!author) throw new Error("Author not found");
    return author;
  },
};

export default authorService;
