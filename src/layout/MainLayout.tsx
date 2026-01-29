import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import GlobalLoader from "../components/GlobalLoader";
import { useLoader } from "../context/LoaderContext";

const MainLayout = () => {
    const { loading } = useLoader();
    return (
        <div className="d-flex min-vh-100">
            {/* LEFT: Full height Sidebar */}
            <Sidebar />

            {/* RIGHT: Header + Content area */}
            <div className="d-flex flex-column flex-grow-1">

                {/* Fixed at top of THIS column only */}
                <Header />

                {/* Scrollable content area */}
                <main className="flex-grow-1 bg-light">
                    {/* Note: mt-5 is only for mobile screens 
             where the Sidebar's mobile-toggle bar is fixed-top 
          */}
                    <div className="p-4 mt-5 mt-lg-0">
                        {loading && <GlobalLoader />}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;