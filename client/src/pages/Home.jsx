import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlusSquare, FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PaginationComponent from "../components/ui/PaginationComponent";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../graphql/bookQueries";
import BookDetail from "./BookDetail";

const Home = () => {
  const [sortColumn, setSortColumn] = useState(""); // Cột để sắp xếp
  const [sortDirection, setSortDirection] = useState(""); // Hướng sắp xếp (asc/desc/unsorted)
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm

  const itemsPerPage = 10;
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredBooks = data.books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp danh sách users
  const sortedBooks = sortDirection
    ? [...filteredBooks].sort((a, b) => {
        const valueA = a[sortColumn]?.toLowerCase?.() || a[sortColumn];
        const valueB = b[sortColumn]?.toLowerCase?.() || b[sortColumn];

        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : -1;
        } else if (sortDirection === "desc") {
          return valueA < valueB ? 1 : -1;
        }
        return 0; // Không sắp xếp nếu ở trạng thái unsorted
      })
    : filteredBooks;

  // Cắt danh sách users theo trang hiện tại
  const paginatedBooks = sortedBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalItems = sortedBooks.length;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      // Nếu đã click cùng cột, thay đổi hướng sắp xếp
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(""); // Lần thứ ba sẽ trở về trạng thái unsorted
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc"); // Mặc định là tăng dần khi chọn cột mới
    }
  };

  const SortIcon = ({ sortColumn, columnName, sortDirection }) => {
    if (sortColumn === columnName) {
      if (sortDirection === "asc") {
        return <FaSortDown />;
      } else if (sortDirection === "desc") {
        return <FaSortUp />;
      }
    }
    return <FaSort />;
  };

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
                onChange={handleSearch}
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

          <div className="flex justify-center items-center gap-2 bg-create-100 px-6 rounded-xl text-white hover:bg-create-200">
            <FaPlusSquare className="h-5 w-5" />
            <Link to="add-book" className="font-medium uppercase">
              Sách
            </Link>
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
            {paginatedBooks.length > 0 ? (
              paginatedBooks.map((book) => (
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
                      <>{book.coverImage}</>
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

                  <td className="px-6 py-4 border-y-2 border-neutral-200 ">
                    <div
                      className="font-normal text-gray-500"
                      style={{
                        maxWidth: "150px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={book.author?.name}
                    >
                      {book.author?.name}
                    </div>
                  </td>

                  <td className="px-6 py-4 border-y-2 border-neutral-200 border-r-2 rounded-r-xl">
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <button className="text-neutral-400 hover:text-blue-400 cursor-pointer">
                        <Link to={`/book/${book.id}`}>
                          <EyeIcon className="size-6" />
                        </Link>
                      </button>
                      <button className="text-neutral-400 hover:text-green-400 cursor-pointer">
                        <PencilSquareIcon className="size-6" />
                      </button>
                      <button
                        className="text-neutral-400 hover:text-red-400 cursor-pointer"
                        onClick={() => {}}
                      >
                        <TrashIcon className="size-6" />
                      </button>
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
      </div>
    </div>
  );
};

export default Home;
