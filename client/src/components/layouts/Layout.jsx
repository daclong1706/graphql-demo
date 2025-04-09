import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../ui/Sidebar";

const Layout = () => {
  const location = useLocation();
  const [headerText, setHeaderText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Cập nhật tiêu đề dựa trên URL
    if (location.pathname === "/") {
      setHeaderText("Quản lý sách");
    } else if (location.pathname === "/author") {
      setHeaderText("Quản lý tác giả");
    } else if (location.pathname === "/publisher") {
      setHeaderText("Quản lý nhà xuất bản");
    } else {
      setHeaderText("");
    }
  }, [location.pathname]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <div
        className={`bg-secondary w-64 min-h-screen text-white absolute md:relative transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 overflow-auto h-screen dark:bg-gray-900 dark:text-white">
        <div className="flex justify-between items-center mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">{headerText}</h2>
          {/* <ButtonDarkMode /> */}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
