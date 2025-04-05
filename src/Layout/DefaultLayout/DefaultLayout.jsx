import "./DefaultLayout.css";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Overview from "../../Components/Overview/Overview";
function DefaultLayout() {
    return (
        <div className="default-layout">
            <Header />
            <Overview />
            <div className="content">
                <Outlet />
            </div>
            <Sidebar />
            <Footer />
        </div>
    );
}

export default DefaultLayout;