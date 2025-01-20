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
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { GrTechnology } from "react-icons/gr";

const Dashboard = () => {
    const [upvote] = useUpvote();
    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 min-h-screen z-50`}
            >
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

            {/* Mobile Toggle Button */}
            <button
                className="text-white p-3 fixed top-4 left-4 z-50 bg-gray-800 rounded-md md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <TbLayoutSidebarRightCollapse /> : <TbLayoutSidebarLeftCollapse />}
            </button>

            {/* Glass Effect Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Dashboard Content with max-width container */}
            <div className="md:ml-80 transition-all duration-300">
                <div className="max-w-screen-xl mx-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;