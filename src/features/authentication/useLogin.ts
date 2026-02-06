import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Login as LoginApi } from '../../services/apiAuth';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate: login, isPending: isLogining } = useMutation({
        mutationKey: ['user'],
        mutationFn: ({ email, password }: { email: string, password: string }) => LoginApi({ email, password }),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user)
            navigate('/dashboard', { replace: true });
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return { login, isLogining }
}
export default useLogin