import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import { queryClient } from "../main";
import { useLoaderData } from "react-router-dom";
import CabinTable from "../features/cabins/CabinTable";
function Cabins() {
  const data = useLoaderData()
  console.log(data,'da')
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort</p>
    </Row>
    <Row>
        <CabinTable cabins={ data} />
    </Row>
    </>
  );
}

export async function cabinsLoader() {
  const data=await queryClient.fetchQuery({queryKey:['cabins'],queryFn:getCabins})
  return data
}
export default Cabins;
