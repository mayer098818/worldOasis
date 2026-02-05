import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking as updateBookingApi } from "../../services/apiBookings"
import toast from "react-hot-toast"

const useCheckin = () => {
    const queryClient = useQueryClient()
    const { mutate: checkin, isPending: isChecking } = useMutation({
        mutationKey: ['booking'],
        mutationFn: ({ bookingId, breakfast }: { bookingId: string, breakfast: any }) => updateBookingApi(bookingId, {
            status: 'checked-in',
            isPaid: true,
            ...breakfast
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['booking'] })
            toast.success('Booking checked in successfully')
        }
    })
    return { checkin, isChecking }
}
export default useCheckin