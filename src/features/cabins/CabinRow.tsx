import styled from "styled-components";
import { formatCurrency } from '../../utils/helpers.ts'
import type { CabinProps } from "./CabinTable.tsx";
import { deleteCabin } from "../../services/apiCabins.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm.tsx";

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
const cabinConfig = [{
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
const CabinRow = ({ cabin, cabinConfig }: { cabin: CabinProps, cabinConfig: any }) => {
  const queryClient = useQueryClient()
  const [isShowForm, setIsShowForm] = useState(false)
  const deleteCabinMutation = useMutation({
    // 这里只是告诉mutation这个函数,真正传值是在mutate传值的时候
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("delete successfully")
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })
  const { isPending } = deleteCabinMutation;
  const { image, name, maxCapacity, regularPrice, discount, id: cabinId } = cabin;
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
      <button onClick={() => { setIsShowForm((show) => !show) }}>Edit</button>
      <button disabled={isPending} onClick={() => deleteCabinMutation.mutate(cabinId)}>
        {isPending ? 'Delete...' : 'Delete'}
      </button>
    </TableRow>
    {isShowForm && <CreateCabinForm isEdit={true} cabinConfig={cabinConfig} cabinData={cabin} onCloseForm={() => setIsShowForm(false)} ></CreateCabinForm>}
  </>
}
export default CabinRow