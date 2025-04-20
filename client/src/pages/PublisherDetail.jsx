import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_PUBLISHER_BY_ID } from "../graphql/publisher";
import { useNavigate, useParams } from "react-router-dom";
import BookModalDetail from "./BookModalDetail";

const PublisherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const { loading, error, data } = useQuery(GET_PUBLISHER_BY_ID, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <p className="text-blue-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const publisher = data?.publisher;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-secondary text-white rounded-md hover:scale-105 hover:bg-[#445dbc] absolute top-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {publisher.name}
        </h2>
        <p className="text-gray-600">Địa điểm: {publisher.location}</p>
        <h3 className="text-lg font-medium text-gray-600 mt-4">
          Sách xuất bản:
        </h3>
        <ul className="mt-2">
          {publisher.books.map((b) => (
            <li
              key={b.id}
              className="p-2 bg-gray-100 rounded-md mt-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setSelectedBookId(b.id);
                setIsViewOpen(true);
              }}
            >
              {b.name}
            </li>
          ))}
        </ul>
      </div>

      {isViewOpen && (
        <BookModalDetail
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          bookId={selectedBookId}
        />
      )}
    </div>
  );
};

export default PublisherDetail;
