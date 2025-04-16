import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { ADD_AUTHOR, UPDATE_AUTHOR, GET_AUTHORS } from "../../graphql/author";

const AuthorModal = ({ isOpen, onClose, type = "add", author }) => {
  const [formData, setFormData] = useState({
    name: "",
    yearOfBirth: "",
  });

  const [addAuthor] = useMutation(ADD_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  // Điền dữ liệu tác giả khi sửa
  useEffect(() => {
    if (type === "edit" && author) {
      setFormData({
        name: author.name || "",
        yearOfBirth: author.yearOfBirth || "",
      });
    }
  }, [type, author]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "add") {
        await addAuthor({
          variables: {
            name: formData.name,
            yearOfBirth: parseInt(formData.yearOfBirth),
          },
        });
        toast.success("Thêm tác giả thành công!");
      } else if (type === "edit" && author) {
        await updateAuthor({
          variables: {
            id: author.id,
            name: formData.name,
            yearOfBirth: parseInt(formData.yearOfBirth),
          },
        });
        toast.success("Cập nhật tác giả thành công!");
      }
      onClose();
    } catch {
      toast.error(`Lỗi khi ${type === "add" ? "thêm" : "cập nhật"} tác giả!`);
    }
  };

  // Không hiển thị modal nếu không mở
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          {type === "add" ? "Thêm Tác Giả" : "Sửa Tác Giả"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block font-medium mb-1 text-gray-800">
              Tên tác giả
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-800">
              Năm sinh
            </label>
            <input
              type="number"
              name="yearOfBirth"
              className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none"
              value={formData.yearOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              {type === "add" ? "Thêm" : "Sửa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthorModal;
