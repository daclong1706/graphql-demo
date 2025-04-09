import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PaginationComponent = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Hiển thị{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        trong tổng số{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems}
        </span>
      </span>
      <ul className="inline-flex text-sm h-8">
        <li>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 h-8 ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-500 hover:text-gray-700"
            } bg-white border border-gray-300 rounded-s-lg`}
          >
            <FaChevronLeft />
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <button
              onClick={() => setCurrentPage(index + 1)}
              className={`flex items-center justify-center px-3 h-8 border border-gray-300 ${
                currentPage === index + 1
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 h-8 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-500 hover:text-gray-700"
            } bg-white border border-gray-300 rounded-e-lg`}
          >
            <FaChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
