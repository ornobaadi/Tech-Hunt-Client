import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useModerator = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isModerator, isPending: isModeratorLoading } = useQuery({
        queryKey: [user?.email, 'isModerator'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/moderator/${user.email}`);
            return res.data?.moderator;
        }
    })
    return [isModerator, isModeratorLoading]
};

export default useModerator;