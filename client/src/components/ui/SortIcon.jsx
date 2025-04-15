import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

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

export default SortIcon;
