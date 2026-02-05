import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking.ts";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { bookingId } = useParams()
  const { booking, isPending } = useBooking(bookingId!)
  const { deleteBookingMuate, isDeleting } = useDeleteBooking()
  const navigate = useNavigate()
  const moveBack = useMoveBack()
  if (isPending) return <Spinner />
  if (Object.keys(booking).length === 0) return <Empty resourceName={`Booking ${bookingId}`} />
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[booking?.status]}>{booking?.status.replace("-", " ")}</Tag>
        </HeadingGroup>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          <Modal.Open name='delete'>
            <Button variation="danger">
              Delete booking
            </Button>
          </Modal.Open>

          {booking?.status === 'unconfirmed' &&
            <Button variation="primary" onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          }
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
          <Modal.Window name='delete'>
            <ConfirmDelete resourceName='booking' onConfirm={() => deleteBookingMuate(bookingId)} disabled={isDeleting} />
          </Modal.Window>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
