import { FaHome } from "react-icons/fa";
import { FaCircleChevronUp, FaUser } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { LuBox } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";
import useUpvote from "../hooks/useUpvote";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";

const Dashboard = () => {
    const [upvote] = useUpvote();

    // TODO: get isAdmin value from DB
    const isAdmin = true;

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
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink className="flex gap-5" to="/dashboard/statistics">
                                        <IoStatsChartSharp />
                                        Statistics</NavLink>
                                </li>
                                <li>
                                    <NavLink className="flex gap-5" to="/dashboard/manageUsers">
                                        <MdManageAccounts />
                                        Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink className="flex gap-5" to="/dashboard/manageCoupons">
                                        <RiCoupon2Fill />
                                        Manage Coupons</NavLink>
                                </li>

                            </>
                            :
                            <>
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
                            </>
                    }
                    {/* Shared Navlinks */}
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