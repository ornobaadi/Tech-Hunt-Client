import { useContext, useEffect, useState } from "react";
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
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { GrTechnology } from "react-icons/gr";

const Dashboard = () => {
    const [upvote] = useUpvote();
    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeChange = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const handleNavClick = () => {
        setIsSidebarOpen(false);
    };

    const NavItem = ({ to, icon, children }) => (
        <li>
            <NavLink
                className="flex gap-5 items-center"
                to={to}
                onClick={handleNavClick}
            >
                {icon}
                <span>{children}</span>
            </NavLink>
        </li>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 transition-all duration-300 bg-gray-900 text-white w-80
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 min-h-screen z-50 flex flex-col justify-between`}
            >
                <div>
                    <div className="flex flex-col items-center mb-10">
                        <img className="w-32 mt-4" src="/logo 2.png" alt="" />
                        <p className="font-bold text-xl">Tech Hunt</p>
                    </div>
                    <ul className="menu px-5 w-full text-lg">
                        {isAdmin ? (
                            <>
                                <NavItem to="/dashboard/statistics" icon={<IoStatsChartSharp />}>
                                    Statistics
                                </NavItem>
                                <NavItem to="/dashboard/manageUsers" icon={<MdManageAccounts />}>
                                    Manage Users
                                </NavItem>
                                <NavItem to="/dashboard/manageCoupons" icon={<RiCoupon2Fill />}>
                                    Manage Coupons
                                </NavItem>
                            </>
                        ) : isModerator ? (
                            <>
                                <NavItem to="/dashboard/reviewQueue" icon={<MdQueue />}>
                                    Product Review Queue
                                </NavItem>
                                <NavItem to="/dashboard/reportedProducts" icon={<MdReportProblem />}>
                                    Reported Products
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem to="/dashboard/profile" icon={<FaUser />}>
                                    My Profile
                                </NavItem>
                                <NavItem to="/dashboard/upvotes" icon={<FaCircleChevronUp />}>
                                    My Upvotes ({upvote.length})
                                </NavItem>
                                <NavItem to="/dashboard/addProduct" icon={<IoIosAddCircle />}>
                                    Add Product
                                </NavItem>
                                <NavItem to="/dashboard/myProducts" icon={<LuBox />}>
                                    My Products
                                </NavItem>
                            </>
                        )}
                        <div className="divider"></div>
                        <NavItem to="/" icon={<FaHome />}>
                            Home
                        </NavItem>
                        <NavItem to="/products" icon={<GrTechnology />}>
                            Products
                        </NavItem>
                    </ul>
                </div>

                {/* Theme Toggle at bottom of sidebar */}
                <div className="px-6 pb-6 flex items-center gap-3">
                    
                    <label className="swap swap-rotate text-white">
                        <input
                            type="checkbox"
                            checked={theme === "dark"}
                            onChange={handleThemeChange}
                        />
                        <svg
                            className="swap-off h-8 w-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        <svg
                            className="swap-on h-8 w-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                    <span className="text-sm">Change Theme</span>
                </div>
            </div>

            {/* Mobile Toggle Button */}
            <button
                className="text-white p-3 fixed top-4 left-4 z-50 bg-gray-800 rounded-md md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <TbLayoutSidebarLeftCollapse /> : <TbLayoutSidebarRightCollapse />}
            </button>

            {/* Glass Effect Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Dashboard Content with max-width container */}
            <div className="md:ml-80 bg-base-100 min-h-screen transition-all duration-300">
                <div className="max-w-screen-xl mx-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;