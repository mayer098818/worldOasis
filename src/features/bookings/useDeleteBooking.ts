import { useQueryClient, useMutation } from "@tanstack/react-query"
import { deleteBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useModal } from "../../ui/Modal"

const useDeleteBooking = () => {
    const queryClient = useQueryClient()
    const { close } = useModal()
    const { mutate: deleteBookingMuate, isPending: isDeleting } = useMutation({
        mutationKey: ['bookings'],
        mutationFn: deleteBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] })
            toast.success('Booking deleted successfully')
            close()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return { deleteBookingMuate, isDeleting }
}
export default useDeleteBooking