import styled from "styled-components";
import { formatCurrency } from '../../utils/helpers.ts'
import type { CabinProps } from "./CabinTable.tsx";
import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm.tsx";
import useDeleteCabin from "./useDeleteCabin.ts";
import useCreateCabin from "./useCreateCabin.ts";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import Menus from "../../ui/Menus.tsx";
import { Ellipsis, BookCopy, Pencil, Trash } from 'lucide-react'
import Spinner from "../../ui/Spinner.tsx";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin-left:10px
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const CabinRow = ({ cabin, cabinConfig }: { cabin: CabinProps, cabinConfig: any }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { image, name, maxCapacity, regularPrice, discount, id: cabinId } = cabin;
  const { mutateForm, isPending } = useCreateCabin()
  const handleDuplicate = (cabin: CabinProps) => {
    const { id, image, ...rest } = cabin
    const newCabin = {
      ...rest,
      name: `copy of ${cabin.name}`,
      image
    }
    mutateForm({ newCabinData: newCabin, id: null }, {
      onSuccess: () => {
        toast.success('Duplicate successfully')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }
  if (isPending) return <Spinner />
  return <>
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', flexDirection: 'row', alignItems: 'center' }}>
        <Modal>
          <Menus>
            <Menus.Toggle id={cabinId}>
              <Ellipsis />
            </Menus.Toggle>
            <Menus.List id={cabinId}>
              <Menus.Button icon={<BookCopy />} onClick={() => handleDuplicate(cabin)}>
                Duplicate
              </Menus.Button>
              <Modal.Open name='edit'>
                <Menus.Button icon={<Pencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open name='delete'>
                <Menus.Button icon={<Trash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name='edit'>
              <CreateCabinForm isEdit={true} cabinConfig={cabinConfig} cabinData={cabin}  ></CreateCabinForm>
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete resourceName={cabin.name} onConfirm={() => deleteCabin(cabinId)} disabled={isDeleting} />
            </Modal.Window>

          </Menus >
        </Modal>

      </div>
    </TableRow>


  </>
}
export default CabinRow