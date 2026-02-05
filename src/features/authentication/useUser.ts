import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../../services/apiAuth"

const useUser = () => {
    const { data: user, isPending: isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
    })
    const isAuthenticated = user?.role === 'authenticated' ? true : false
    return { user, isLoading, error, isAuthenticated }
}
export default useUser