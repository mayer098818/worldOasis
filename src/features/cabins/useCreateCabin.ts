import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

function useCreateCabin() {
    const query = useQueryClient()
    const { mutate: mutateForm, isPending } = useMutation<any, Error, { newCabinData: any; id: any }>({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['cabins'] })
        },
    })
    return { mutateForm, isPending }
}
export default useCreateCabin