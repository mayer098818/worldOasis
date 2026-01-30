import styled from "styled-components";

import Form from "../../ui/Form.tsx";
import Button from "../../ui/Button.tsx";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";
import CabinForm from "./CabinForm.tsx";

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
type CabinFormData = {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: FileList; // 这里是 FileList
};
type createCabinFormProps = {
    onCloseForm?: () => void
    cabinData?: any
    isEdit?: any
    cabinConfig: any
}
const data = [{
    id: 'name', label: 'Cabin name', type: 'input', rules: {
        required: 'this field is required'
    }
}, {
    id: 'maxCapacity', label: 'maxCapacity', type: 'numberInput', defaultValue: 0, rules: {
        min: { value: 0, message: 'maxCapacity2 min value is 0' }, valueAsNumber: true
    }
},
{
    id: 'regularPrice', label: 'regularPrice', type: 'numberInput', rules: {
        min: { value: 0, message: 'regularPrice min value is 0' }, valueAsNumber: true
    }
}, {
    id: 'discount', label: 'discount', type: 'numberInput', rules: {
        validate: (value: any, formValues: any) => {
            return Number(value) < Number(formValues.regularPrice) || 'discount should smaller than regularPrice '
        }
    }
}, {
    id: 'description', label: 'description', type: 'input', rules: {
        required: 'this field is required'
    }
}, {
    id: 'image', label: 'Cabin photo', type: 'upload', rules: {
    }
}]
const CreateCabinForm: React.FC<createCabinFormProps> = ({ cabinConfig, onCloseForm, cabinData = {}, isEdit = false }) => {
    const { editId, ...rest } = cabinData
    console.log(cabinConfig, 'cabinConfig')
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

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

    // query
    const query = useQueryClient()
    const { mutate: mutateForm, isPending } = useMutation<any, Error, { newCabinData: any; id: any }>({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success(isEditMode ? 'Cabin updated successfully' : 'Cabin created successfully')
            query.invalidateQueries({ queryKey: ['cabins'] })
            reset()
            onCloseForm?.()
        },
        onError: (err) => {
            toast.error(isEditMode ? `Error updating cabin: ${err.message}` : `Error creating cabin: ${err.message}`)
        },
    })

    const onSubmit = (data: any) => {
        console.log(data, 'data')
        // 处理图片：如果是编辑模式且图片是 URL 字符串，直接使用；否则取 fileList 的第一个
        const image = Array.isArray(data.image) && data.image[0]?.url
            ? data.image[0].url
            : data.image?.[0]?.originFileObj || data.image?.[0]

        // 移除 image 数组，只保留实际图片数据
        const { image: _image, ...restData } = data
        const newCabinData = { ...restData, image }

        mutateForm({ newCabinData, id: editId })
    }
    const onerror = (errors: any) => {
        console.log('errors:', errors)
    }
    const handleSearch = () => { console.log('handleSearch') }
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit, onerror)}>
                <CabinForm onSearch={handleSearch} cabinConfig={cabinConfig} errors={errors} control={control} />
                <FormRowStyled>
                    {/* type is an HTML attribute! */}
                    <Button variation="secondary" type="reset" onClick={onCloseForm}>
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