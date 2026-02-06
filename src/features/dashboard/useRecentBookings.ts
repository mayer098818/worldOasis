import { useQuery } from "@tanstack/react-query"
import { getBookingsAfterDate } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { subDays } from "date-fns"

const useRecentBookings = () => {
    const [searchParams] = useSearchParams()
    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'))
    // caculate the day after numDays
    const queryDate = subDays(new Date(), numDays).toISOString()
    // only the numDays change will refetch the query
    const { data: recentBookings, isPending: isPendingBookings } = useQuery({
        queryKey: ['bookings', `last-${numDays}`],
        queryFn: () => getBookingsAfterDate(queryDate)
    })
    return { recentBookings, isPendingBookings }
}
export default useRecentBookings