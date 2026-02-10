import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from '../../utils/constants';

const useBookings = () => {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const filterValue = searchParams.get('status')
    // { field: "totalPrice", value: 5000, method: "gte" };
    const filter = !filterValue || filterValue === 'all' ? undefined : { field: 'status', value: filterValue }
    //    sort
    const sortByRow = searchParams.get('sortBy') || "startDate-desc";
    const [field, direction] = sortByRow.split('-')
    const sortBy = { field, direction: direction as "asc" | "desc" }
    // PAGINATION
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const { data: { data: bookings, count } = {}, isPending: isLoading } = useQuery({
        queryKey: ['bookings', { filter, sortBy, page }],
        queryFn: () => getBookings({ filter, sortBy, page }),
    })

    // pre-fetching
    // pageCount:total pages,page:current page
    const pageCount = Math.ceil((count || 0) / PAGE_SIZE)
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', { filter, sortBy, page: page + 1 }],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        })
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', { filter, sortBy, page: page - 1 }],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
        })
    }
    return { bookings, isLoading, count }
}
export default useBookings