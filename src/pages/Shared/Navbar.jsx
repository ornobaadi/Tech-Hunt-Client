import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useUpvote from "../../hooks/useUpvote";

const Navbar = () => {
    const [upvote] = useUpvote();
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");


    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeChange = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    // Dashboard route based on the user's role
    const getDashboardRoute = () => {
        if (user?.role === "admin") return "/dashboard/statistics";
        if (user?.role === "moderator") return "/dashboard/reviewQueue";
        return "/dashboard/profile";
    };

    const links = (
        <>
            <li><NavLink to="/" className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-base-content"
            }>Home</NavLink></li>
            
            <li><NavLink to="/products" className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-base-content"
            }>Products</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-base-content"
            }>About</NavLink></li>
            {user && (
                <>
                <li><NavLink to="/coupons" className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : "text-base-content"
                }>Coupons</NavLink></li>
                <li><NavLink to="/dashboard/profile" className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : "text-base-content"
                }>My Profile</NavLink></li>
                </>
            )}
        </>
    );



    return (
        <div className="navbar px-2 md:px-20 sticky top-0 z-50 bg-base-200/70 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl">
                    <img className="w-8" src="/logo 2.png" alt="" />
                    Tech Hunt</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-5">
                <Link to="/dashboard/upvotes" className="btn hidden md:flex">
                    Upvotes <div className="badge badge-sm rounded-full bg-[#C836E9] text-white">{upvote.length}</div>
                </Link>
                <label className="swap swap-rotate">
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

                {
                    user ?
                        <>
                            <div className="dropdown dropdown-end">
                                <button tabIndex={0} className="avatar btn btn-ghost btn-circle">
                                    <div className="w-10 rounded-full">
                                        <img
                                            src={user?.photoURL || "/default-user.png"}
                                            alt="User Avatar"
                                        />
                                    </div>
                                </button>
                                <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-lg">
                                    <li className="">
                                        <p className="">{user?.displayName || "User"}</p>
                                    </li>
                                    <li>
                                        <Link to={getDashboardRoute()}>Dashboard</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogOut}>Logout</button>
                                    </li>
                                </ul>
                            </div>


                        </> : <>
                            <Link to='/login' className="btn btn-outline">Login</Link>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;