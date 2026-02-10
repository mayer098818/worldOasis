import Select from "./Select.tsx";
import { useSearchParams } from "react-router-dom";

const SortBy = ({ options }: { options: any }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const sortBy = searchParams.get('sortBy') || ""
    function handleChange(e: any) {
        searchParams.set('sortBy', e.target.value)
        setSearchParams(searchParams)
    }
    return <Select options={options} type='white' value={sortBy} onChange={handleChange}></Select>
}
export default SortBy;