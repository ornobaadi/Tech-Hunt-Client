import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import Login from "../pages/Login/Login";
import Error from "../components/Error/Error";
import SignUp from "../pages/SignUp/SignUp";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Upvotes from "../pages/User Dashboard/Upvotes";
import Profile from "../pages/User Dashboard/Profile";
import AddProducts from "../pages/User Dashboard/AddProducts";
import MyProducts from "../pages/User Dashboard/MyProducts";
import Statistics from "../pages/AdminDashboard/Statistics";
import ManageUsers from "../pages/AdminDashboard/ManageUsers"
import ManageCoupons from "../pages/AdminDashboard/ManageCoupons"
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import ProductReviewQueue from "../pages/ModeratorDashboard/ProductReviewQueue";
import ReportedProducts from "../pages/ModeratorDashboard/ReportedProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: 'products',
                element: <Products></Products>,
            },
            {
                path: 'login',
                element: <Login></Login>,
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>,
            },
            {
                path: 'product/:id',
                element: <PrivateRoute>
                    <ProductDetails></ProductDetails>
                </PrivateRoute>,
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <Dashboard></Dashboard>
        </PrivateRoute>,
        children: [
            // User routes
            {
                path: 'profile',
                element: <Profile></Profile>,
            },
            {
                path: 'upvotes',
                element: <Upvotes></Upvotes>,
            },
            {
                path: 'addProducts',
                element: <AddProducts></AddProducts>,
            },
            {
                path: 'myProducts',
                element: <MyProducts></MyProducts>,
            },

            // Admin Dashboard Routes
            {
                path: 'statistics',
                element: <AdminRoute><Statistics></Statistics></AdminRoute>,
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
            },
            {
                path: 'manageCoupons',
                element: <AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>,
            },
            // Moderator Dashboard Routes
            {
                path: 'reviewQueue',
                element: <ModeratorRoute><ProductReviewQueue></ProductReviewQueue></ModeratorRoute>,
            },
            {
                path: 'reportedProducts',
                element: <ModeratorRoute><ReportedProducts></ReportedProducts></ModeratorRoute>,
            },
        ]
    },
]);