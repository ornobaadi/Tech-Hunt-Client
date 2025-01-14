import { FaHome } from "react-icons/fa";
import { FaCircleChevronUp, FaUser } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { LuBox } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";
import useUpvote from "../hooks/useUpvote";

const Dashboard = () => {
    const [upvote] = useUpvote();
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-80 min-h-screen bg-slate-600 text-white">
                <div className="flex flex-col justify-center items-center mb-10">
                    <img className="w-32" src="/logo 2.png" alt="" />
                    <p className="font-bold text-xl">
                        Tech Hunt
                    </p>
                </div>
                <ul className="menu px-5 w-full *:text-lg">
                    <li>
                        <NavLink className="flex gap-5" to="/dashboard/profile">
                            <FaUser />
                            My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink className="flex gap-5" to="/dashboard/upvotes">
                            <FaCircleChevronUp />
                            My Upvotes ({upvote.length})</NavLink>
                    </li>
                    <li>
                        <NavLink className="flex gap-5" to="/dashboard/addProducts">
                            <IoIosAddCircle />
                            Add Products</NavLink>
                    </li>
                    <li>
                        <NavLink className="flex gap-5" to="/dashboard/myProducts">
                            <LuBox />
                            My Products</NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink className="flex gap-5" to="/"><FaHome />Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="flex gap-5" to="/products"><FaHome />Products</NavLink>
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