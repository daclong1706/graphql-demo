import React, { useState } from "react";

const AddAuthor = () => {
  const [formData, setFormData] = useState({
    name: "",
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
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Thêm tác giả</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Tên tác giả */}
          <div>
          <label className="block font-medium mb-1 text-gray-800">Tên tác giả</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded px-3 py-2 text-black"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nút submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Thêm Tác giả
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAuthor;
