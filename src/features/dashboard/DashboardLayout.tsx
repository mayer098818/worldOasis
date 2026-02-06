import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { recentBookings, isPendingBookings } = useRecentBookings()
  const { stays, isLoadingStays, confirmedStays, numDays } = useRecentStays()
  console.log(recentBookings, stays, 'data')
  console.log(confirmedStays, numDays, 'confirmedStays')
  if (isPendingBookings || isLoadingStays) return <Spinner />
  return (
    <StyledDashboardLayout>
      11
    </StyledDashboardLayout>
  )
}
export default DashboardLayout