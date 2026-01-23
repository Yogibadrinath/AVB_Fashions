import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";

const SidebarMenu = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (prev: boolean) => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { loginStatus } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const logout = () => {
    toast.error("Logged out successfully");
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    navigate("/login");
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {(isSidebarOpen || isAnimating) && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={closeSidebar}
          />

          {/* SIDEBAR */}
          <div
            className={
              isSidebarOpen
                ? "fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl transform translate-x-0 transition-transform duration-300 ease-out"
                : "fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl transform -translate-x-full transition-transform duration-300 ease-out"
            }
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="text-sm tracking-widest text-gray-500">
                MENU
              </span>
              <HiXMark
                className="text-3xl cursor-pointer hover:rotate-90 transition-transform duration-200"
                onClick={closeSidebar}
              />
            </div>

            {/* BRAND */}
            <div className="flex justify-center py-6 border-b">
              <Link
                to="/"
                onClick={closeSidebar}
                className="text-3xl font-light tracking-[0.35em] uppercase"
              >
                Fashion
              </Link>
            </div>

            {/* NAV LINKS */}
            <div className="flex flex-col mt-6">
              <Link to="/" onClick={closeSidebar} className="w-full py-3 text-lg font-light tracking-wide 
           text-gray-800 text-center cursor-pointer
           transition-all duration-200 ease-in-out
           hover:bg-black hover:text-white text-decoration-none">
                Home
              </Link>
              <Link to="/shop" onClick={closeSidebar} className="w-full py-3 text-lg font-light tracking-wide 
           text-gray-800 text-center cursor-pointer
           transition-all duration-200 ease-in-out
           hover:bg-black hover:text-white text-decoration-none">
                Shop
              </Link>
              <Link to="/search" onClick={closeSidebar} className="w-full py-3 text-lg font-light tracking-wide 
           text-gray-800 text-center cursor-pointer
           transition-all duration-200 ease-in-out
           hover:bg-black hover:text-white text-decoration-none">
                Search
              </Link>

              {loginStatus ? (
                <button onClick={logout} className="w-full py-3 text-lg font-light tracking-wide 
           text-gray-800 text-center cursor-pointer
           transition-all duration-200 ease-in-out
           hover:bg-black hover:text-white text-decoration-none">
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeSidebar}
                    className="w-full py-3 text-lg font-light tracking-wide 
           text-gray-800 text-center cursor-pointer
           transition-all duration-200 ease-in-out
           hover:bg-black hover:text-white text-decoration-none"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeSidebar}
                    className="w-full py-3 text-lg font-light tracking-wide 
           text-gray-800 text-center cursor-pointer
           transition-all duration-200 ease-in-out
           hover:bg-black hover:text-white text-decoration-none"
                  >
                    Sign up
                  </Link>
                </>
              )}

              <Link to="/cart" onClick={closeSidebar} className="w-full py-3 text-lg font-light tracking-wide 
           text-gray-800 text-center cursor-pointer
           transition-all duration-200 ease-in-out
           hover:bg-black hover:text-white text-decoration-none">
                Cart
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SidebarMenu;
