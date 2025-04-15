import { useState } from "react";

export const useTable = (data, itemsPerPage) => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp danh sách
  const sortedData = sortDirection
    ? [...filteredData].sort((a, b) => {
        const valueA = a[sortColumn]?.toLowerCase?.() || a[sortColumn];
        const valueB = b[sortColumn]?.toLowerCase?.() || b[sortColumn];
        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : -1;
        } else if (sortDirection === "desc") {
          return valueA < valueB ? 1 : -1;
        }
        return 0;
      })
    : filteredData;

  // Phân trang
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalItems = sortedData.length;

  // Hàm sắp xếp
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(
        sortDirection === "asc" ? "desc" : sortDirection === "desc" ? "" : "asc"
      );
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return {
    paginatedData,
    totalItems,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    handleSort,
    sortColumn,
    sortDirection,
  };
};
