import { useQuery } from "@apollo/client";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteButton from "../components/modal/DeleteButton";
import PaginationComponent from "../components/ui/PaginationComponent";
import SortIcon from "../components/ui/SortIcon";
import { DELETE_BOOK, GET_BOOKS } from "../graphql/book";
import useDelete from "../hooks/useDelete";
import { useTable } from "../hooks/useTable";
import { useState } from "react";
import BookModal from "../components/modal/BookModal";
import NoImage from "../assets/no-image.png";
import BookModalDetail from "./BookModalDetail";

const Home = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const { loading, error, data } = useQuery(GET_BOOKS);
  const itemsPerPage = 10;
  const { handleDelete } = useDelete(DELETE_BOOK, "books", "Book");
  const handleDeleteBook = (id) => {
    handleDelete(id);
  };

  const {
    paginatedData: books,
    totalItems,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    handleSort,
    sortColumn,
    sortDirection,
  } = useTable(data?.books || [], itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="overflow-x-auto sm:rounded-lg">
        <div className="flex flex-row mb-6 justify-between">
          <label htmlFor="search">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sách"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white px-4 py-2 pr-12 rounded-xl focus:outline-none w-full placeholder:text-neutral-400 border-[#e7e7e7] border-2"
              />

              {/* Search Icon */}
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                <AiOutlineSearch className="h-6 w-6" />
              </button>
            </div>
          </label>
          {/* <Link to="add-book" className="font-medium uppercase"> */}
          <div>
            <button
              onClick={() => setIsAddOpen(true)}
              className="flex justify-center items-center gap-2 bg-create-100 px-6 py-3 rounded-xl text-white hover:bg-create-200"
            >
              <FaPlusSquare className="h-5 w-5" />
              Sách
            </button>
          </div>
          {/* </Link> */}
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-separate border-spacing-y-4">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 rounded-l-xl cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center space-x-2">
                  {/* <span></span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="name"
                    sortDirection={sortDirection}
                  /> */}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center space-x-2">
                  <span>Sách</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="name"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("author")}
              >
                <div className="flex items-center space-x-2">
                  <span>Thể loại</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="author"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("publisher")}
              >
                <div className="flex items-center space-x-2">
                  <span>Tác giả</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="publisher"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>

              <th scope="col" className="px-6 py-3 rounded-r-xl">
                <div className="flex justify-center">Thao tác</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr
                  key={book.id}
                  className="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white border-y-2 border-neutral-200 rounded-l-xl border-l-2"
                  >
                    {book.coverImage ? (
                      <img
                        className="w-14 h-14 rounded"
                        src={book.coverImage}
                        alt={book.name}
                      />
                    ) : (
                      <img
                        className="w-14 h-14 rounded"
                        src={NoImage}
                        alt="No Image"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 border-y-2 border-neutral-200 ">
                    <div className="ps-3">
                      <div
                        className="text-base font-semibold"
                        title={book.name}
                      >
                        {book.name}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 border-y-2 border-neutral-200 ">
                    {book.genre}
                  </td>

                  <td className="px-6 py-4 border-y-2 border-neutral-200">
                    <div
                      className="font-normal text-gray-500"
                      style={{
                        maxWidth: "250px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={book.authors
                        ?.map((author) => author.name)
                        .join(", ")}
                    >
                      {book.authors?.map((author) => author.name).join(", ")}
                    </div>
                  </td>

                  <td className="px-6 py-4 border-y-2 border-neutral-200 border-r-2 rounded-r-xl">
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <button
                        className="text-neutral-400 hover:text-blue-400 cursor-pointer"
                        onClick={() => {
                          setSelectedBookId(book.id);
                          setIsViewOpen(true);
                        }}
                      >
                        <EyeIcon className="size-6" />
                      </button>
                      <button
                        className="text-neutral-400 hover:text-green-400 cursor-pointer"
                        onClick={() => {
                          setSelectedBook(book);
                          setIsEditOpen(true);
                        }}
                      >
                        <PencilSquareIcon className="size-6" />
                      </button>
                      <DeleteButton
                        itemName={book.name}
                        onDelete={() => handleDeleteBook(book.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  Không có người dùng nào để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PaginationComponent
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {isAddOpen && (
          <BookModal
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            type="add"
          />
        )}

        {isEditOpen && (
          <BookModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            type="edit"
            book={selectedBook}
          />
        )}
        {isViewOpen && (
          <BookModalDetail
            isOpen={isViewOpen}
            onClose={() => setIsViewOpen(false)}
            bookId={selectedBookId}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
