import { useQuery } from "@apollo/client";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import PaginationComponent from "../components/ui/PaginationComponent";
import { DELETE_AUTHOR, GET_AUTHORS } from "../graphql/author";
import { useTable } from "../hooks/useTable";
import SortIcon from "../components/ui/SortIcon";
import useDelete from "../hooks/useDelete";
import DeleteButton from "../components/modal/DeleteButton";
import { useState } from "react";
import AuthorModal from "../components/modal/AuthorModal";

const Author = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const { loading, error, data } = useQuery(GET_AUTHORS);
  const itemsPerPage = 10;
  const { handleDelete } = useDelete(DELETE_AUTHOR, "authors", "Author");
  const handleDeleteAuthor = (id) => {
    handleDelete(id);
  };

  const {
    paginatedData: authors,
    totalItems,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    handleSort,
    sortColumn,
    sortDirection,
  } = useTable(data?.authors || [], itemsPerPage);

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
                placeholder="Tìm kiếm tác giả"
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
          <div>
            <button
              onClick={() => setIsAddOpen(true)}
              className="flex justify-center items-center gap-2 bg-create-100 px-6 py-3 rounded-xl text-white hover:bg-create-200"
            >
              <FaPlusSquare className="h-5 w-5" />
              Tác giả
            </button>
          </div>
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
                  <span>Tác giả</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="name"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>

              <th
                scope="col"
                className="px-6 py-3 rounded-l-xl cursor-pointer"
                onClick={() => handleSort("yearOfBirth")}
              >
                <div className="flex items-center space-x-2">
                  <span>Năm sinh</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="yearOfBirth"
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
            {authors.length > 0 ? (
              authors.map((author) => (
                <tr
                  key={author.id}
                  className="bg-white dark:bg-gray-800 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-white border-y-2 border-neutral-200 rounded-l-xl border-l-2">
                    <div className="text-gray-500" title={author.name}>
                      {author.name}
                    </div>
                  </td>

                  <td className="px-6 py-4 border-y-2 border-neutral-200 ">
                    {author.yearOfBirth}
                  </td>

                  <td className="px-6 py-4 border-y-2 border-neutral-200 border-r-2 rounded-r-xl">
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <Link key={author.id} to={`/author/${author.id}`}>
                        <button className="text-neutral-400 hover:text-blue-400 cursor-pointer">
                          <EyeIcon className="size-6" />
                        </button>
                      </Link>

                      <button
                        className="text-neutral-400 hover:text-green-400 cursor-pointer"
                        onClick={() => {
                          setSelectedAuthor(author);
                          setIsEditOpen(true);
                        }}
                      >
                        <PencilSquareIcon className="size-6" />
                      </button>
                      <DeleteButton
                        itemName={author.name}
                        onDelete={() => handleDeleteAuthor(author.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  Không có tác giả nào để hiển thị.
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
          <AuthorModal
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            type="add"
          />
        )}
        {isEditOpen && (
          <AuthorModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            type="edit"
            author={selectedAuthor}
          />
        )}
      </div>
    </div>
  );
};

export default Author;
