import CabinRow from "./CabinRow";
import Table from "../../ui/Table";

export type CabinProps = {
  id: string
  image: string
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
}
function CabinTable({ cabins, cabinConfig }: { cabins: CabinProps[], cabinConfig: any }) {
  return (
    <>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={cabins} render={(cabin: CabinProps) => (
          <CabinRow cabin={cabin} key={cabin.id} cabinConfig={cabinConfig} />
        )}>
        </Table.Body>
      </Table>
    </>
  )
}
export default CabinTable