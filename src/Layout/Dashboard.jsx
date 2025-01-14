import { FaHome } from "react-icons/fa";
import { FaCircleChevronUp, FaUser } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { LuBox } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-60 min-h-screen bg-neutral-400">
                <ul className="menu">
                    <li>
                        <NavLink to="/dashboard/profile">
                            <FaUser />
                            My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/upvotes">
                            <FaCircleChevronUp />
                            My Upvotes</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addProducts">
                            <IoIosAddCircle />
                            Add Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myProducts">
                            <LuBox />
                            My Products</NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/"><FaHome />Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products"><FaHome />Products</NavLink>
                    </li>

                </ul>
            </div>
            {/* Dashboard Content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;