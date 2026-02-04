import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy.tsx";

const CabinOperations = ({ options, filterField }: { options: any, filterField: string }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
            <Filter options={options} filterField={filterField} />
            <SortBy options={[{ value: 'name-asc', label: 'Sort by name (A-Z)' }, { value: 'name-desc', label: 'Sort by name (Z-A)' }, { value: 'regularPrice-asc', label: 'Sort by price(low first)' }, { value: 'regularPrice-desc', label: 'Sort by price(high first)' }, { value: 'maxCapacity-asc', label: 'Sort by maxCapacity(low first)' }, { value: 'maxCapacity-desc', label: 'Sort by maxCapacity(high first)' }]} />
        </div>
    )
}
export default CabinOperations