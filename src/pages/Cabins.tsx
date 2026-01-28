import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import { queryClient } from "../main";
import CabinTable from "../features/cabins/CabinTable";
import {useQuery} from "@tanstack/react-query";
import Spinner from "../ui/Spinner.tsx";
function Cabins() {
  const { data: cabins,isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
    refetchOnWindowFocus: true, // 默认 true
  });
if(isLoading)return <Spinner/>
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort</p>
    </Row>
    <Row>
        <CabinTable cabins={ cabins} />
    </Row>
    </>
  );
}

export async function cabinsLoader() {
  const data=await queryClient.prefetchQuery({queryKey:['cabins'],queryFn:getCabins})
  return data
}
export default Cabins;
