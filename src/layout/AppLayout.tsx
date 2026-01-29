import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="pt-20 px-6">{children}</main>
            </div>
        </div>
    );
};

export default AppLayout;