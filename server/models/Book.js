import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Author" }, // Khóa ngoại liên kết với Author
  publisherId: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" }, // Khóa ngoại liên kết với Publisher
  coverImage: { type: String }, // URL hoặc tên file ảnh bìa
  description: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
