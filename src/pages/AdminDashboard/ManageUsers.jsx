import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Shield, UserCog, XCircle } from "lucide-react";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch, isError, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/users');
                return res.data;
            } catch (error) {
                throw new Error('Failed to fetch users');
            }
        }
    });

    const handleRoleChange = async (user, newRole) => {
        if (!user?._id || !user?.name) {
            Swal.fire({
                icon: "error",
                title: "Invalid User Data",
                text: "Unable to process user information."
            });
            return;
        }

        const currentRole = user.role;
        
        // Prevent changing own role if admin
        const currentUserEmail = localStorage.getItem('userEmail'); // Assuming you store current user's email
        if (user.email === currentUserEmail && user.role === 'admin') {
            Swal.fire({
                icon: "error",
                title: "Operation Not Allowed",
                text: "You cannot remove your own admin role."
            });
            return;
        }

        // Show confirmation dialog
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: newRole === currentRole
                ? `Remove ${currentRole} role from ${user.name}?`
                : `Make ${user.name} a ${newRole}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed!'
        });

        if (!confirmResult.isConfirmed) return;

        // Determine endpoint
        const endpoint = newRole === currentRole ? 
            `/users/remove-role/${user._id}` : 
            `/users/${newRole}/${user._id}`;

        try {
            // Show loading state
            const loadingToast = Swal.fire({
                title: 'Processing...',
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            });

            const res = await axiosSecure.patch(endpoint);
            
            loadingToast.close();

            if (res.data.modifiedCount > 0) {
                await refetch(); // Ensure data is refreshed
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: newRole === currentRole ?
                        `${user.name}'s ${currentRole} role has been removed` :
                        `${user.name} is now a ${newRole}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                throw new Error('Role update did not modify any user');
            }
        } catch (error) {
            console.error('Role change error:', error);
            Swal.fire({
                icon: "error",
                title: "Operation Failed",
                text: error.response?.data?.message || "There was an error updating the user role.",
                footer: 'Please try again or contact support if the issue persists.'
            });
        }
    };

    // Handle loading state
    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    // Handle error state
    if (isError) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <h2 className="text-2xl text-error mb-2">Error Loading Users</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => refetch()}
                >
                    Try Again
                </button>
            </div>
        </div>;
    }

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="bg-base-100 rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <h2 className="text-3xl font-bold text-primary">Manage Users</h2>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Total Users</div>
                            <div className="stat-value text-primary">{users.length}</div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th className="rounded-tl-lg">#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Role Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-base-100">
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="font-semibold">{user.name}</div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            {user.membershipStatus === 'active' ? (
                                                <span className="badge badge-success gap-1">
                                                    Premium
                                                </span>
                                            ) : (
                                                <span className="badge badge-ghost gap-1">
                                                    Free
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleRoleChange(user, 'moderator')}
                                                className={`btn btn-sm ${
                                                    user.role === 'moderator' 
                                                        ? 'btn-error' 
                                                        : 'btn-outline'
                                                }`}
                                                disabled={user.role === 'admin' || user.email === localStorage.getItem('userEmail')}
                                            >
                                                {user.role === 'moderator' ? (
                                                    <>
                                                        <XCircle className="h-4 w-4" />
                                                        Remove Mod
                                                    </>
                                                ) : (
                                                    <>
                                                        <Shield className="h-4 w-4" />
                                                        Make Mod
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                onClick={() => handleRoleChange(user, 'admin')}
                                                className={`btn btn-sm ${
                                                    user.role === 'admin' 
                                                        ? 'btn-error' 
                                                        : 'btn-outline'
                                                }`}
                                                disabled={user.email === localStorage.getItem('userEmail')}
                                            >
                                                {user.role === 'admin' ? (
                                                    <>
                                                        <XCircle className="h-4 w-4" />
                                                        Remove Admin
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserCog className="h-4 w-4" />
                                                        Make Admin
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;