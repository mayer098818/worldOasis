import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button.tsx";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCabin } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.tsx";
import { useState } from "react";

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

const Label = styled.label`
  font-weight: 500;
`;


type createCabinFormProps = {
  onCloseForm?: () => void
  cabinData: any
  isEdit: any
}
type CabinFormData = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList; // 这里是 FileList
};
function CreateCabinForm({ onCloseForm, cabinData = {}, isEdit = false }: createCabinFormProps) {
  const queryClient = useQueryClient()
  const [isEditSection, setIsEditSection] = useState(isEdit)
  const { id, ...cabin } = cabinData
  const defaultValues = {
    ...cabin
  }
  const data = [{
    id: 'name', label: 'Cabin name', type: 'text', rules: {
      required: 'this field is required'
    }
  }, {
    id: 'maxCapacity', label: 'maxCapacity', type: 'number', defaultValue: 0, rules: {
      min: { value: 0, message: 'maxCapacity2 min value is 0' }, valueAsNumber: true
    }
  },
  {
    id: 'regularPrice', label: 'regularPrice', type: 'number', rules: {
      min: { value: 0, message: 'regularPrice min value is 0' }, valueAsNumber: true
    }
  }, {
    id: 'discount', label: 'discount', type: 'number', rules: {
      validate: (value: any, formValues: any) => {
        return Number(value) < Number(formValues.regularPrice) || 'discount should smaller than regularPrice '
      }
    }
  }, {
    id: 'description', label: 'description', type: 'number', rules: {
      required: 'this field is required'
    }
  }, {
    id: 'image', label: 'Cabin photo', type: 'file', rules: {
    }
  }]
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CabinFormData>({ defaultValues })
  const { mutate, isPending } = useMutation({
    mutationFn: createNewCabin,
    onSuccess: () => {
      toast.success('Cabin created successfully')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
      onCloseForm()
    },
    onError: () => {
      toast.error('Error creating cabin')
    }
  })
  const onSubmit = (data) => {
    console.log(data, 'data')
    const file = data.image?.[0]
    console.log(file, 'file')
    mutate({ ...data, image: file })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {data.map(item => (
        <FormRow key={item.id} label={item.label} error={errors?.[item.id]}><Input type={item.type} defaultValue={item.defaultValue || ''} id={item.id} {...register(item.id, item.rules)} /></FormRow>
      ))}

      <FormRowStyled>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseForm}>
          Cancel
        </Button>
        <Button disabled={isPending} type="submit">{isEditSection ? 'Edit Cabin' : 'Add New Cabin'}</Button>
      </FormRowStyled>
    </Form >
  );
}

export default CreateCabinForm;
