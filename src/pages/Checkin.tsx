import { useParams } from "react-router-dom"
import CheckinBooking from "../features/check-in-out/CheckinBooking"
import useBooking from "../features/bookings/useBooking"
import Spinner from "../ui/Spinner"

const Checkin = () => {
    const { bookingId } = useParams()
    console.log(bookingId, 'bookingId')
    const { booking, isPending } = useBooking(bookingId!)
    if (isPending) return <Spinner />
    return (
        <CheckinBooking booking={booking} />
    )

}
export default Checkin