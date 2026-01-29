import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../ui/Spinner.tsx";
import Button from "../ui/Button.tsx";
import CreateCabinForm from "../features/cabins/CreateCabinForm.tsx";
import { useState } from "react";
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
        <CabinTable cabins={cabins} />
        <Button onClick={() => setShowForm(!showForm)}>Add New Cabin</Button>
        {showForm && <CreateCabinForm onCloseForm={() => setShowForm(false)} />}
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
