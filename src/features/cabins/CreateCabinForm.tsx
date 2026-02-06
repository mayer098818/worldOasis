import styled from "styled-components";

import Form from "../../ui/Form.tsx";
import Button from "../../ui/Button.tsx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CabinForm from "./CabinForm.tsx";
import useCreateCabin from "./useCreateCabin.ts";
import { useModal } from "../../ui/Modal.tsx";

const FormRowStyled = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
type createCabinFormProps = {
    onCloseModal?: () => void
    cabinData?: any
    isEdit?: any
    cabinConfig: any
}
const CreateCabinForm: React.FC<createCabinFormProps> = ({ cabinConfig, onCloseModal, cabinData = {}, isEdit = false }) => {
    const { close: closeModal } = useModal()

    const { id: editId, ...rest } = cabinData
    // 根据 editId 判断是编辑还是新增模式
    const isEditMode = Boolean(editId) || isEdit

    const defaultValues = {
        ...rest,
        image: rest.image
            ? [
                {
                    uid: '-1',
                    name: 'cabin.jpg',
                    status: 'done',
                    url: rest.image,
                }
            ]
            : []
    }

    // 定义空值用于重置表单
    const emptyValues = {
        name: '',
        maxCapacity: 0,
        regularPrice: null,
        discount: null,
        description: '',
        image: []
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

    const { mutateForm, isPending } = useCreateCabin()
    const onSubmit = (data: any) => {
        // 处理图片：如果是编辑模式且图片是 URL 字符串，直接使用；否则取 fileList 的第一个
        const image = Array.isArray(data.image) && data.image[0]?.url
            ? data.image[0].url
            : data.image?.[0]?.originFileObj || data.image?.[0]

        // 移除 image 数组，只保留实际图片数据
        const { image: _image, ...restData } = data
        const newCabinData = { ...restData, image }

        mutateForm({ newCabinData, id: editId }, {
            onSuccess: () => {
                toast.success(isEditMode ? 'Cabin updated successfully' : 'Cabin created successfully')
                // 重置到空值，而不是 defaultValues
                reset(emptyValues)
                handleClose()
            },
            onError: (err) => {
                toast.error(isEditMode ? `Error updating cabin: ${err.message}` : `Error creating cabin: ${err.message}`)
            },
        })
    }
    const onerror = (errors: any) => {
        console.log('errors:', errors)
    }
    const handleClose = closeModal || onCloseModal
    const handleSearch = () => { console.log('handleSearch') }
    return (
        <>
            <Form type={onCloseModal ? "modal" : "regular"} onSubmit={handleSubmit(onSubmit, onerror)} >
                <CabinForm onSearch={handleSearch} cabinConfig={cabinConfig} errors={errors} control={control} isPending={isPending} />
                <FormRowStyled>
                    {/* type is an HTML attribute! */}
                    <Button variation="secondary" type="reset" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button disabled={isPending} type="submit">
                        {isEditMode ? 'Update Cabin' : 'Add New Cabin'}
                    </Button>
                </FormRowStyled>
            </Form>
        </>)
}
export default CreateCabinForm