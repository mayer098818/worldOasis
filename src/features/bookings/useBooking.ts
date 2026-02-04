import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getBooking as getBookingApi } from "../../services/apiBookings"

const useBooking = (bookingId: string) => {

    const { data: booking, isPending } = useQuery({
        queryKey: ['booking'],
        queryFn: () => getBookingApi(bookingId),
        enabled: !!bookingId
    })
    return { booking, isPending }
}
export default useBooking