import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
    const queryClient = useQueryClient()
    const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
        // 这里只是告诉mutation这个函数,真正传值是在mutate传值的时候
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            toast.success("delete successfully")
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
    return { deleteCabin, isDeleting }
}


export default useDeleteCabin