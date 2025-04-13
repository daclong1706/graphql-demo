import React, { useState } from "react";

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    author: "",
    publisher: "",
    coverImage: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Thêm sách mới</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Tên sách */}
          <div>
          <label className="block font-medium mb-1 text-gray-800">Tên sách</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded px-3 py-2 text-black"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Thể loại */}
          <div>
            <label className="block font-medium mb-1">Thể loại</label>
            <input
              type="text"
              name="genre"
              className="w-full border rounded px-3 py-2"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>

          {/* Tác giả */}
          <div>
            <label className="block font-medium mb-1">Tác giả</label>
            <input
              type="text"
              name="author"
              className="w-full border rounded px-3 py-2"
              value={formData.author}
              onChange={handleChange}
            />
          </div>

          {/* Nhà xuất bản */}
          <div>
            <label className="block font-medium mb-1">Nhà xuất bản</label>
            <input
              type="text"
              name="publisher"
              className="w-full border rounded px-3 py-2"
              value={formData.publisher}
              onChange={handleChange}
            />
          </div>

          {/* Ảnh bìa */}
          <div>
            <label className="block font-medium mb-1">URL ảnh bìa</label>
            <input
              type="text"
              name="coverImage"
              className="w-full border rounded px-3 py-2"
              value={formData.coverImage}
              onChange={handleChange}
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block font-medium mb-1">Mô tả</label>
            <textarea
              name="description"
              rows="4"
              className="w-full border rounded px-3 py-2"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Nút submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Thêm sách
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
