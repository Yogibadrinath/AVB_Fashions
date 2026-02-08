import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/AVB_Fashions_Logo.png";
import { useAuth } from "./AuthContext";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const menuItems = [
        { path: "/", label: "Dashboard", activePaths: ["/"], isAuthenticated: true },
        {
            path: "/categories",
            label: "Categories",
            activePaths: ["/categories", "/products"],
            isAuthenticated: true
        },
        { path: "/uploads", label: "Uploads", activePaths: ["/uploads"], isAuthenticated: isAuthenticated },
        { path: "/about", label: "About", activePaths: ["/about"], isAuthenticated: true },
    ];


    // Automatically close sidebar when the route changes (Mobile)
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    // Check if current path matches item or related paths
    const checkActive = (item: typeof menuItems[0]) => {
        return item.activePaths.some(path =>
            location.pathname === path || location.pathname.startsWith(path + "/")
        );
    };

    return (
        <>
            {/* MOBILE TRIGGER BUTTON */}
            <button
                onClick={toggleSidebar}
                className="btn btn-dark d-lg-none sidebar-btn"
                style={{
                    position: "fixed",
                    top: "12px",
                    left: "15px",
                    zIndex: 1100,
                    transition: "all 0.3s ease"
                }}
            >
                {isOpen ? "✕" : "☰"}
            </button>

            {/* MOBILE OVERLAY BACKDROP */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        zIndex: 1040,
                        backdropFilter: "blur(2px)"
                    }}
                />
            )}

            {/* SIDEBAR CONTAINER */}
            <div
                className="bg-dark text-white vh-100 shadow-sm transition-all"
                style={{
                    width: "280px",
                    minWidth: "280px",
                    zIndex: 1050,
                    position: "fixed", // Fixed for mobile
                    left: isOpen ? "0" : "-280px",
                    top: 0,
                    height: "100vh",
                    overflowY: "auto",
                    transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                {/* LOGO AREA */}
                <div className="p-4 text-center border-bottom border-secondary pb-0 mb-2">
                    <img
                        src={logo}
                        alt="Logo"
                        className="img-fluid"
                        style={{ maxHeight: "100px", marginBottom: "0" }}
                    />
                </div>

                {/* NAVIGATION LINKS */}
                <nav className="nav flex-column px-2">
                    {menuItems.map((item) => {
                        const isActive = checkActive(item);

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`nav-link my-1 py-3 px-4 text-white rounded-2 move-up-hover ${isActive ? "bg-primary active-item" : "hover-effect"
                                    }`}
                                style={{
                                    borderBottom: isActive ? "none" : "1px solid rgba(255,255,255,0.05)",
                                    textDecoration: "none",
                                    display: item.isAuthenticated ? "block" : "none"
                                }}
                            >
                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* GLOBAL CSS FOR SIDEBAR EFFECTS */}
            <style>{`
        /* Desktop Override: Make Sidebar Sticky instead of Fixed */
        @media (min-width: 992px) {
          .transition-all { 
              position: sticky !important; 
              left: 0 !important; 
              top: 0 !important;
          }
        }

        /* The Move-Up Animation */
        .move-up-hover {
            transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }

        .move-up-hover:hover {
            transform: translateY(-4px); /* Moves button up */
            background-color: rgba(255, 255, 255, 0.1);
            color: #fff !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            z-index: 10;
        }

        /* Active Item Shadow */
        .active-item {
            box-shadow: 0 4px 10px rgba(13, 110, 253, 0.4);
        }

        /* Ensure smooth scrolling for the whole page */
        html {
            scroll-behavior: smooth;
        }
      `}</style>
        </>
    );
};

export default Sidebar;