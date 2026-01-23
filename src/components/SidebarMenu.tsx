import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
// import { useAppSelector } from "../hooks";
// import { setLoginStatus } from "../features/auth/authSlice";
// import { store } from "../store";

const SidebarMenu = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (prev: boolean) => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  // const { loginStatus } = useAppSelector((state) => state.auth);
  // const navigate = useNavigate();

  const closeSidebar = () => setIsSidebarOpen(false);

  // const logout = () => {
  //   toast.error("Logged out successfully");
  //   localStorage.removeItem("user");
  //   store.dispatch(setLoginStatus(false));
  //   navigate("/login");
  //   closeSidebar();
  // };

  useEffect(() => {
    if (isSidebarOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";

      // 👇 ensure first render happens OFF-screen
      setVisible(false);

      const timer = setTimeout(() => {
        setVisible(true);
      }, 10); // small delay guarantees paint

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      document.body.style.overflow = "auto";

      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `menu-item ${isActive ? "menu-item-active" : ""}`;

  if (!mounted) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={closeSidebar}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-common-color shadow-2xl
        transform transition-transform duration-300 ease-out
        ${visible ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
          <span className="text-sm tracking-widest text-white">MENU</span>
          <HiXMark
            className="text-3xl text-white cursor-pointer hover:rotate-90 transition-transform"
            onClick={closeSidebar}
          />
        </div>

        {/* BRAND */}
        <div className="flex justify-center py-6 border-b border-white/20">
          <NavLink
            to="/"
            onClick={closeSidebar}
            className="text-xl tracking-[0.35em] uppercase text-white"
          >
            AVB Fashions
          </NavLink>
        </div>

        {/* NAV */}
        <div className="flex flex-col mt-6">
          <NavLink to="/" className={navClass} onClick={closeSidebar}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navClass} onClick={closeSidebar}>
            Shop
          </NavLink>
          <NavLink to="/search" className={navClass} onClick={closeSidebar}>
            Search
          </NavLink>

          {/* {loginStatus ? (
            <button onClick={logout} className="menu-item">
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className={navClass} onClick={closeSidebar}>
                Sign in
              </NavLink>
              <NavLink to="/register" className={navClass} onClick={closeSidebar}>
                Sign up
              </NavLink>
            </>
          )}

          <NavLink to="/cart" className={navClass} onClick={closeSidebar}>
            Cart
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
