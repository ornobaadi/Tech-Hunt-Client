import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GrUserAdmin } from "react-icons/gr";
import { MdAddModerator } from "react-icons/md";
import Swal from "sweetalert2";
import { Shield } from "lucide-react";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleMakeModerator = user => {
        axiosSecure.patch(`/users/moderator/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is moderator now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <div className="flex justify-evenly text-center my-10">
                <h2 className="text-4xl">All Users: </h2>
                <h2 className="text-4xl">Total Users: {users.length} </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subscription</th>
                            <th>Make Moderator</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                <td>
                                    {user.membershipStatus === 'active' ? (
                                        <div className="flex items-center gap-1 text-green-600">
                                            <span className="font-medium">Premium</span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-500">Free</span>
                                    )}
                                </td>
                                </td>
                                <td>
                                    {
                                        user.role === 'moderator' ? 'Moderator' :
                                        user.role === 'admin' ? 'Admin' :
                                        <button
                                            onClick={() => handleMakeModerator(user)}
                                            className="btn">
                                            <MdAddModerator />
                                        </button>
                                    }
                                </td>
                                <td>
                                    {
                                        user.role === 'admin' ? 'Admin' :
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn">
                                            <GrUserAdmin />
                                        </button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;