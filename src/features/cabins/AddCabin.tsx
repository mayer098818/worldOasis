import { Button } from "antd";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal.tsx";
import styled from "styled-components";

const ButtonStyled = styled(Button)`
  background-color: var(--color-brand-600);
  color: #fff;
  height: 4rem;
  font-weight: 700;
  font-size: 1.6rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-brand-600);

  &:hover {
    background-color: var(--color-brand-700) !important;
    border-color: var(--color-brand-800) !important;
    color:#fff !important;
  }
`

type AddCabinProps = {
    cabinConfig: any
}
const AddCabin = ({ cabinConfig }: AddCabinProps) => {
    return (
        <>
            <Modal>
                <Modal.Open name="cabin-form"><ButtonStyled>Add new cabin</ButtonStyled></Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm cabinConfig={cabinConfig} />
                </Modal.Window>
            </Modal >

        </>
    )
}
export default AddCabin