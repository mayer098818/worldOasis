import { Button } from "antd";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { Modal } from "../../ui/Modal";
type AddCabinProps = {
    cabinConfig: any
}
const AddCabin = ({ cabinConfig }: AddCabinProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <>
            <Button onClick={() => setIsOpenModal(true)}>Add New Cabin</Button>
            {/* <CreateCabinForm cabinConfig={cabinConfig} onCloseForm={() => setIsOpenModal(false)} /> */}
            {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}><CreateCabinForm cabinConfig={cabinConfig} onCloseModal={() => setIsOpenModal(false)} /></Modal>}
        </>
    )
}
export default AddCabin