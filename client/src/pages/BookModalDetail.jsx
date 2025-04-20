import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_ID } from "../graphql/book";
import { useNavigate } from "react-router-dom";

const BookModalDetail = ({ isOpen, onClose, bookId }) => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id: bookId },
    skip: !bookId,
  });

  if (!isOpen) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book = data?.book;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row items-start">
          {/* Hình ảnh bìa sách */}
          <div className="flex justify-center items-center">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.name}
                className="rounded shadow-lg min-h-96 max-h-[450px] min-w-80"
              />
            ) : (
              <div className="rounded shadow-lg min-h-96 px-16">
                <p className="text-gray-500">No Image Available</p>
              </div>
            )}
          </div>

          {/* Nội dung chi tiết */}
          <div className="md:pl-8 mt-6 md:mt-0">
            <h1 className="text-2xl font-bold mb-4">{book.name}</h1>
            <p className="text-neutral-700 mb-2">
              <strong>Thể loại:</strong> {book.genre}
            </p>
            <p className="text-neutral-700 mb-2">
              <strong>Tác giả:</strong>{" "}
              {book.authors?.map((author) => (
                <span
                  key={author.id}
                  className="text-blue-500 cursor-pointer hover:underline mr-2"
                  onClick={() => navigate(`/author/${author.id}`)}
                >
                  {author.name}
                </span>
              ))}
            </p>
            <p className="text-neutral-700">
              <strong>Nhà xuất bản:</strong>{" "}
              {book.publishers?.map((publisher) => (
                <span
                  key={publisher.id}
                  className="text-green-500 cursor-pointer hover:underline mr-2"
                  onClick={() => navigate(`/publisher/${publisher.id}`)}
                >
                  {publisher.name}
                </span>
              ))}
            </p>
            <p className="text-neutral-700">
              <strong>Mô tả:</strong> {book.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModalDetail;
