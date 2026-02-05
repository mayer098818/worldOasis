import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking as updateBookingApi } from "../../services/apiBookings"
import toast from "react-hot-toast"
const useCheckout = () => {
    const queryClient = useQueryClient()
    const { mutate: checkout, isPending: isCheckingOut } = useMutation({
        mutationKey: ['booking'],
        mutationFn: ({ bookingId }: { bookingId: string }) => updateBookingApi(bookingId, {
            status: 'checked-out',
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['booking'] })
            toast.success('Booking checked out successfully')
        }
    })
    return { checkout, isCheckingOut }
}
export default useCheckout