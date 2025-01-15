import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GrUserAdmin } from "react-icons/gr";
import { MdAddModerator } from "react-icons/md";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
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
                                    <button className="btn"><MdAddModerator /></button>
                                </td>
                                <td>
                                    <button className="btn"><GrUserAdmin /></button>
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