import Swal from "sweetalert2";
import useUpvote from "../../hooks/useUpvote";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Upvotes = () => {
    const [upvote, refetch] = useUpvote();
    const axiosSecure = useAxiosSecure();


    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                
                axiosSecure.delete(`/upvotes/${id}`)
                .then(res => {
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your upvote has been deleted.",
                            icon: "success"
                        });
                    }
                })
            }
        });
    }

    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold text-center my-10">My Upvotes: {upvote.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            upvote.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.productImage}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h2>{item.productName}</h2>
                                </td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn text-white btn-error btn-sm">delete</button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Upvotes;