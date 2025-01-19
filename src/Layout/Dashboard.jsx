import { FaHome } from "react-icons/fa";
import { FaCircleChevronUp, FaUser } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { LuBox } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";
import useUpvote from "../hooks/useUpvote";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdQueue, MdReportProblem } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";
import { useState } from "react";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { GrTechnology } from "react-icons/gr";

const Dashboard = () => {
    const [upvote] = useUpvote();
    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`transition-all duration-300 bg-slate-600 text-white ${isCollapsed ? "w-20" : "w-80"
                    } min-h-screen`}
            >
                <button
                    className="text-white ml-5 mt-4 text-4xl"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? <TbLayoutSidebarRightCollapse /> : <TbLayoutSidebarLeftCollapse />
                    }
                </button>
                <div className="flex flex-col items-center mb-10">

                    {!isCollapsed && (
                        <>
                            <img className="w-32 mt-4" src="/logo 2.png" alt="" />
                            <p className="font-bold text-xl">Tech Hunt</p>
                        </>
                    )}
                </div>
                <ul className="menu px-5 w-full text-lg">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink
                                    className={`flex gap-5 items-center ${isCollapsed ? "justify-center" : ""
                                        }`}
                                    to="/dashboard/statistics"
                                >
                                    <IoStatsChartSharp />
                                    {!isCollapsed && "Statistics"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={`flex gap-5 items-center ${isCollapsed ? "justify-center" : ""
                                        }`}
                                    to="/dashboard/manageUsers"
                                >
                                    <MdManageAccounts />
                                    {!isCollapsed && "Manage Users"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={`flex gap-5 items-center ${isCollapsed ? "justify-center" : ""
                                        }`}
                                    to="/dashboard/manageCoupons"
                                >
                                    <RiCoupon2Fill />
                                    {!isCollapsed && "Manage Coupons"}
                                </NavLink>
                            </li>
                        </>
                    ) : isModerator ? (
                        <>
                            <li>
                                <NavLink
                                    className={`flex gap-5 items-center ${isCollapsed ? "justify-center" : ""
                                        }`}
                                    to="/dashboard/reviewQueue"
                                >
                                    <MdQueue />
                                    {!isCollapsed && "Product Review Queue"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={`flex gap-5 items-center ${isCollapsed ? "justify-center" : ""
                                        }`}
                                    to="/dashboard/reportedProducts"
                                >
                                    <MdReportProblem />
                                    {!isCollapsed && "Reported Products"}
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    className={`flex gap-5 items-center ${isCollapsed ? "justify-center" : ""
                                        }`}
                                    to="/dashboard/profile"
                                >
                                    <FaUser />
                                    {!isCollapsed && "My Profile"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={`flex gap-5 items-center ${isCollapsed ? "justify-center" : ""
                                        }`}
                                    to="/dashboard/upvotes"
                                >
                                    <FaCircleChevronUp />
                                    {!isCollapsed && `My Upvotes (${upvote.length})`}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={`flex gap-5 items-center ${isCollapsed ? "justify-center" : ""
                                        }`}
                                    to="/dashboard/addProduct"
                                >
                                    <IoIosAddCircle />
                                    {!isCollapsed && "Add Product"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={`flex gap-5 items-center ${isCollapsed ? "justify-center" : ""
                                        }`}
                                    to="/dashboard/myProducts"
                                >
                                    <LuBox />
                                    {!isCollapsed && "My Products"}
                                </NavLink>
                            </li>
                        </>
                    )}
                    {/* Shared Navlinks */}
                    <div className="divider"></div>
                    <li>
                        <NavLink
                            className={`flex gap-5 items-center ${isCollapsed ? "justify-center" : ""
                                }`}
                            to="/"
                        >
                            <FaHome />
                            {!isCollapsed && "Home"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={`flex gap-5 items-center ${isCollapsed ? "justify-center" : ""
                                }`}
                            to="/products"
                        >
                            <GrTechnology />
                            {!isCollapsed && "Products"}
                        </NavLink>
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
