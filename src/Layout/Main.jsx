import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Navbar from "../pages/Shared/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="w-11/12 mx-auto">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;