import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../ui/Spinner.tsx";
import Button from "../ui/Button.tsx";
import CreateCabinForm from "../features/cabins/CreateCabinForm.tsx";
import { useState } from "react";
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
function Cabins() {
  const [showForm, setShowForm] = useState(false);
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
    refetchOnWindowFocus: true, // 默认 true
  });
  if (isLoading) return <Spinner />
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable cabins={cabins} cabinConfig={cabinConfig} />
        <Button onClick={() => setShowForm(!showForm)}>Add New Cabin</Button>
        {showForm && <CreateCabinForm cabinConfig={cabinConfig} onCloseForm={() => setShowForm(false)} />}
      </Row>
    </>
  );
}

export async function cabinsLoader() {
  const queryClient = useQueryClient()
  const data = await queryClient.prefetchQuery({ queryKey: ['cabins'], queryFn: getCabins })
  return data
}
export default Cabins;
