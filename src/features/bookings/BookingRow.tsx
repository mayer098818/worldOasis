import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag.tsx";
import Table from "../../ui/Table.tsx";

import { formatCurrency } from "../../utils/helpers.ts";
import { formatDistanceFromNow } from "../../utils/helpers.ts";
import Menus from "../../ui/Menus.tsx";
import { Ellipsis, Eye, LogOut, PencilLine, Trash } from "lucide-react";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import useDeleteBooking from "./useDeleteBooking.ts";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout.ts";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

type BookingRowProps = {
  booking: {
    id: number | string;
    startDate: string;
    endDate: string;
    numNights: number;
    totalPrice: number;
    status: string;
    guests: { fullName: string; email: string };
    cabins: { name: string };
  };
};

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: BookingRowProps) {
  const statusToTagName: Record<
    "unconfirmed" | "checked-in" | "checked-out",
    "blue" | "green" | "silver"
  > = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  console.log(status, 'status')
  const navigate = useNavigate()
  const { deleteBookingMuate, isDeleting } = useDeleteBooking()
  const { checkout } = useCheckout()
  const statusKey = status as keyof typeof statusToTagName;
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[statusKey]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>

        <Menus>
          <Menus.Toggle id={String(bookingId)}>
            <Ellipsis />
          </Menus.Toggle>
          <Menus.List id={String(bookingId)}>
            <Menus.Button icon={<Eye />} onClick={() => navigate(`/bookings/${bookingId}`)}>See details</Menus.Button>
            {status === 'unconfirmed' &&
              <Menus.Button icon={<PencilLine />} onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Menus.Button>
            }
            {status === 'checked-in' &&
              <Menus.Button icon={<LogOut />} onClick={() => {
                checkout({ bookingId: String(bookingId) })
                navigate('/')
              }}>
                Check out
              </Menus.Button>
            }
            <Modal.Open name='delete'>
              <Menus.Button icon={<Trash />}>
                Delete booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus>

        <Modal.Window name='delete'>
          <ConfirmDelete resourceName='booking' onConfirm={() => deleteBookingMuate(String(bookingId))} disabled={isDeleting} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
