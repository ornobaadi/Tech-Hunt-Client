import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const MySwal = withReactContent(Swal);

const SignUp = () => {

    const axiosPublic = useAxiosPublic();

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validatePassword = {
        hasMinLength: password.length >= 6,
        hasNumber: /\d/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
    };

    const isPasswordValid =
        validatePassword.hasMinLength &&
        validatePassword.hasNumber &&
        validatePassword.hasLowercase &&
        validatePassword.hasUppercase;

    const onSubmit = (data) => {
        if (!isPasswordValid) {
            MySwal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Password does not meet the required criteria.",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                MySwal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Account created successfully!",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });

                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in DB
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to DB');
                                    reset();
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
            .catch((error) => {
                let errorMessage = "Failed to create account. Please try again.";

                if (error.code === "auth/email-already-in-use") {
                    errorMessage = "This email is already in use. Please try another email.";
                } else if (error.code === "auth/invalid-email") {
                    errorMessage = "The email address is invalid. Please enter a valid email.";
                } else if (error.code === "auth/weak-password") {
                    errorMessage = "The password is too weak. Please use a stronger password.";
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
        <>
            <Helmet>
                <title>Signup | Tech Hunt</title>
            </Helmet>
            <div className="hero bg-base-100 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold pb-10">Sign up now!</h1>
                        
                    </div>
                    <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    placeholder="Name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("photoURL")}
                                    placeholder="PhotoURL"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    placeholder="Email"
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
                                        {...register("password")}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className={`input input-bordered ${isPasswordValid ? "input-success" : ""
                                            }`}
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
                                <div className="mt-2 text-sm">
                                    <p
                                        className={`flex items-center ${validatePassword.hasMinLength ? "text-green-500" : "text-gray-500"
                                            }`}
                                    >
                                        &#10003; At least 6 characters
                                    </p>
                                    <p
                                        className={`flex items-center ${validatePassword.hasNumber ? "text-green-500" : "text-gray-500"
                                            }`}
                                    >
                                        &#10003; At least one number
                                    </p>
                                    <p
                                        className={`flex items-center ${validatePassword.hasLowercase ? "text-green-500" : "text-gray-500"
                                            }`}
                                    >
                                        &#10003; At least one lowercase letter
                                    </p>
                                    <p
                                        className={`flex items-center ${validatePassword.hasUppercase ? "text-green-500" : "text-gray-500"
                                            }`}
                                    >
                                        &#10003; At least one uppercase letter
                                    </p>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn w-full bg-purple-700 text-white" type="submit" value="Signup" />
                            </div>
                        </form>
                        <div className="flex justify-center mb-5">
                            <h2>
                                Already have an account? &nbsp;
                                <Link className="hover:underline" to="/login">
                                    Login
                                </Link>
                            </h2>
                        </div>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
