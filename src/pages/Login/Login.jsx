import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const MySwal = withReactContent(Swal);

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    console.log('state in the location', location.state);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                const user = result.user;
                MySwal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Login successful!",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                navigate(from, {replace: true});
                console.log(user);
            })
            .catch((error) => {
                let errorMessage = "Failed to login. Please try again.";

                if (error.code === "auth/invalid-credential") {
                    errorMessage = "Email or Password incorrect. Please check and try again.";
                } else if (error.code === "auth/too-many-requests") {
                    errorMessage = "Too many login attempts. Please try again later.";
                }

                MySwal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: errorMessage,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });

                console.error(error);
            });
    };

    return (
        <div>
            <Helmet>
                <title>Login | Tech Hunt</title>
            </Helmet>
            <div className="hero bg-base-100 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold pb-10">Login now!</h1>
                        
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn w-full btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <div className="flex justify-center mb-5">
                            <h2>
                                New here? &nbsp;
                                <Link className="hover:underline" to="/signup">
                                    Create an Account
                                </Link>
                            </h2>
                        </div>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
