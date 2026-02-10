import { Briefcase, CalendarDays, ChartBar } from "lucide-react"
import Stat from "./Stat"
import { formatCurrency } from "../../utils/helpers";

type Booking = {
    totalPrice: number | null | undefined;
    [key: string]: any;
};

type Stay = {
    numNights: number | null | undefined;
    [key: string]: any;
};

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }: { bookings: Booking[], confirmedStays: Stay[], numDays: number, cabinCount: number }) => {
    const numBookings = bookings.length || 0
    const sales = bookings.reduce((acc: number, cur: Booking) => acc + (Number(cur.totalPrice) || 0), 0);
    const checkins = confirmedStays.length;
    const occupation =
        confirmedStays.reduce((acc: number, cur: Stay) => acc + (Number(cur.numNights) || 0), 0);
    const occupationRate = occupation / (Number(numDays) * Number(cabinCount))
    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<Briefcase />}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color="blue"
                icon={<Briefcase />}
                value={formatCurrency(sales)}
            />
            <Stat
                title="Check ins"
                color="indigo"
                icon={<CalendarDays />}
                value={checkins}
            />
            <Stat
                title="Occupancy rate"
                color="yellow"
                icon={<ChartBar />}
                value={Math.round(occupationRate * 100) + "%"}
            />
        </>
    )
}
export default Stats