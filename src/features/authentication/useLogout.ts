import { useMutation } from "@tanstack/react-query"
import { logout as logoutApi } from "../../services/apiAuth"
import { toast } from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
const useLogout = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate: logout, isPending: isLogouting } = useMutation({
        mutationKey: ['user'],
        mutationFn: () => logoutApi(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            navigate('/login')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return { logout, isLogouting }
}
export default useLogout