import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String },
  description: { type: String },
  publicationDate: { type: Date },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" }, // Khóa ngoại liên kết với Author
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" }, // Khóa ngoại liên kết với Publisher
  isbn: { type: String },
  price: { type: Number },
  stockQuantity: { type: Number },
  coverImage: { type: String }, // URL hoặc tên file ảnh bìa
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
