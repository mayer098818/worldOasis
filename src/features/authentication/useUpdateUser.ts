import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userUpadate as userUpadateApi } from "../../services/apiAuth"
import toast from "react-hot-toast"

const useUpdateUser = () => {
    const queryClient = useQueryClient()
    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationKey: ['user'],
        mutationFn: userUpadateApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            toast.success('User updated successfully')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return { updateUser, isUpdating }

}
export default useUpdateUser