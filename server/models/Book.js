import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
  publishers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Publisher" }],
  coverImage: { type: String },
  description: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
