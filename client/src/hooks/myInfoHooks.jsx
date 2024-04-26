import { useQuery } from "@tanstack/react-query";
import secureApi from "../api/secureApi";

const myInfoHooks = () => {
    const id = localStorage.getItem('id');

    const { refetch, data: myInfo = {} } = useQuery({
        queryKey: ['myInfo', id],
        queryFn: async () => {
            const response = await secureApi.get(`/users/${id}`);
            return response.data; // Assuming the data is directly the user object
        },
    });

    return [myInfo, refetch];
}

export default myInfoHooks;
