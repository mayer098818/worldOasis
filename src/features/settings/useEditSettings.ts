import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting } from "../../services/apiSettings"
import toast from "react-hot-toast"

function useEditSettings() {
    const query = useQueryClient()
    const { mutate: editSettings, isPending } = useMutation({
        mutationFn: (newSettings: any) => updateSetting(newSettings),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['settings'] })
            toast.success('Settings updated successfully')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return { editSettings, isPending }
}
export default useEditSettings