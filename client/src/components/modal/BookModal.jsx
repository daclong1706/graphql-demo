import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS_NAME } from "../../graphql/author";
import { GET_PUBLISHERS_NAME } from "../../graphql/publisher";
import { ADD_BOOK, UPDATE_BOOK, GET_BOOKS } from "../../graphql/book";
import { toast } from "sonner";

const BookModal = ({ isOpen, onClose, type = "add", book }) => {
  const {
    loading: authorsLoading,
    error: authorsError,
    data: authorsData,
  } = useQuery(GET_AUTHORS_NAME);
  const {
    loading: publishersLoading,
    error: publishersError,
    data: publishersData,
  } = useQuery(GET_PUBLISHERS_NAME);

  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    author: "",
    publisher: "",
    coverImage: "",
    description: "",
  });

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  console.log(book);
  // Cập nhật dữ liệu sách khi sửa
  useEffect(() => {
    if (type === "edit" && book) {
      setFormData({
        name: book.name || "",
        genre: book.genre || "",
        author: book.author?.id || "",
        publisher: book.publisher?.id || "",
        coverImage: book.coverImage || "",
        description: book.description || "",
      });
    }
  }, [type, book]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "add") {
        await addBook({
          variables: {
            name: formData.name,
            authorId: formData.author,
            publisherId: formData.publisher,
            genre: formData.genre,
            coverImage: formData.coverImage,
            description: formData.description,
          },
        });
        toast.success("Thêm sách thành công!");
      } else if (type === "edit" && book) {
        await updateBook({
          variables: {
            id: book.id,
            name: formData.name,
            authorId: formData.author,
            publisherId: formData.publisher,
            genre: formData.genre,
            coverImage: formData.coverImage,
            description: formData.description,
          },
        });
        toast.success("Cập nhật sách thành công!");
      }
      onClose(); // Đóng modal
    } catch (error) {
      toast.error(`Lỗi khi ${type === "add" ? "thêm" : "cập nhật"} sách!`);
    }
  };

  if (authorsLoading || publishersLoading) return <p>Loading data...</p>;
  if (authorsError) return <p>Error loading authors!</p>;
  if (publishersError) return <p>Error loading publishers!</p>;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="max-w-3xl w-full bg-white px-8 py-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">
              {type === "add" ? "Thêm sách mới" : "Sửa sách"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
              {/* Tên sách */}
              <div>
                <label className="block font-medium mb-1 text-gray-800">
                  Tên sách
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none"
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
                  className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none"
                  value={formData.genre}
                  onChange={handleChange}
                />
              </div>

              {/* Tác giả */}
              <div className="flex-1">
                <label
                  htmlFor="authorSelect"
                  className="block font-medium mb-1"
                >
                  Tác giả
                </label>
                <select
                  id="authorSelect"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none h-10"
                >
                  <option value="">Chọn tác giả</option>
                  {authorsData.authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nhà xuất bản */}
              <div className="flex-1">
                <label
                  htmlFor="publisherSelect"
                  className="block font-medium mb-1"
                >
                  Nhà xuất bản
                </label>
                <select
                  id="publisherSelect"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none h-10"
                >
                  <option value="">Chọn nhà xuất bản</option>
                  {publishersData.publishers.map((publisher) => (
                    <option key={publisher.id} value={publisher.id}>
                      {publisher.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ảnh bìa */}
              <div>
                <label className="block font-medium mb-1">URL ảnh bìa</label>
                <input
                  type="text"
                  name="coverImage"
                  className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none"
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
                  className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Nút Submit & Đóng */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  type="button"
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  {type === "add" ? "Thêm sách" : "Sửa sách"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookModal;
