import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_ID } from "../graphql/bookQueries";
import { useNavigate, useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book = data.book;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)} // Quay lại trang trước
        className="absolute bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 top-10"
      >
        Quay lại
      </button>

      <div className="flex flex-col md:flex-row items-start">
        {/* Hình ảnh bìa sách */}
        <div className="flex justify-center items-center">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.name}
              className="rounded shadow-lg min-h-96 max-h-[450px]"
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
            <strong>Tác giả:</strong> {book.author?.name || "Unknown"}
          </p>
          <p className="text-neutral-700">
            <strong>Nhà xuất bản:</strong> {book.publisher?.name || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
