import BookingRow from "./BookingRow.tsx";
import Table from "../../ui/Table";
import useBookings from "./useBookings.ts";
import Spinner from "../../ui/Spinner.tsx";
import Pagination from "../../ui/Pagination.tsx";
import Empty from "../../ui/Empty.tsx"

function BookingTable() {
  const { bookings, isLoading, count } = useBookings()
  if (isLoading) return <Spinner />
  if (count === 0) return <Empty resourceName={'Bookings'} />
  return (
    <>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings || []}
          render={(booking: any) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count || 1} />
        </Table.Footer>
      </Table>
    </>
  );
}

export default BookingTable;
