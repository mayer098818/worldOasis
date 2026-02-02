import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Spinner from "../ui/Spinner.tsx";
import useCabins from "../features/cabins/useCabins.ts";
import Empty from "antd/es/empty/index";
import AddCabin from "../features/cabins/AddCabin.tsx";
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
      console.log(Number(value), value, 'discount')
      if (value === undefined || value === '' || value === null) {
        return true;
      }
      return Number(value) < Number(formValues.regularPrice) || 'discount should smaller than regularPrice '
    }
  }
}, {
  id: 'description', label: 'description', type: 'textArea', rules: {
    required: 'this field is required'
  }
}, {
  id: 'image', label: 'Cabin photo', type: 'upload', rules: {
  }
}]
function Cabins() {
  const { cabins, isLoading, error } = useCabins()

  if (isLoading) return <Spinner />
  if (error) return <Empty />
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      {cabins && cabins.length > 0 &&
        <Row>
          <CabinTable cabins={cabins} cabinConfig={cabinConfig} />
          {/* <Button onClick={() => setShowForm(!showForm)}>Add New Cabin</Button>
          {showForm && <CreateCabinForm cabinConfig={cabinConfig} onCloseForm={() => setShowForm(false)} />} */}
          <AddCabin cabinConfig={cabinConfig} />
        </Row>
      }
    </>
  );
}

export default Cabins;
