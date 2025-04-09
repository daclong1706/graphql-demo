import { Link, NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="pl-4 h-screen flex flex-col">
      <div className="flex justify-center items-center mt-8 mb-16 -ml-4">
        <Link to="/" className="text-2xl font-medium">
          {/* <img src={logo} alt="logo" className="filter brightness-0 invert" /> */}
        </Link>
      </div>
      <nav className="flex flex-col space-y-4 flex-grow">
        <NavLink
          to="/"
          end
          className={() =>
            location.pathname === "/" ||
            location.pathname.startsWith("/book") ||
            location.pathname === "/add-book"
              ? "bg-white text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
              : "text-white hover:bg-white hover:text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
          }
        >
          <span>Sách</span>
        </NavLink>

        <NavLink
          to="/author"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
              : "text-white hover:bg-white hover:text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
          }
        >
          <span>Tác giả</span>
        </NavLink>

        <NavLink
          to="/publisher"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
              : "text-white hover:bg-white hover:text-secondary p-3 pl-6 rounded-l-3xl flex items-center space-x-2 transition duration-300"
          }
        >
          <span>Nhà sản xuất</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
