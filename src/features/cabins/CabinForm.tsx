import { Input, InputNumber, Upload } from "antd"
import CabinFormRow from "./CabinFormRow"
import { Controller, type Control, type FieldErrors } from "react-hook-form"
import renderComponent from "../../utils/renderComponent"

const ComponentMap: Record<string, typeof Input | typeof Input.Search | typeof InputNumber | typeof Upload> = {
    'input': Input,
    'search': Input.Search,
    'numberInput': InputNumber,
    'upload': Upload
} as const;

type CabinFormProps = {
    cabinData?: any
    onSearch?: (value: string) => void;
    control: Control<any>;
    errors: FieldErrors<any>;
    cabinConfig: any
};

const CabinForm = ({ onSearch, cabinConfig, cabinData, control, errors }: CabinFormProps) => {
    const renderItem = cabinConfig?.map((item: any) => {
        console.log('此时的item', item)
        const Component = ComponentMap[item.type as keyof typeof ComponentMap]
        return (
            <CabinFormRow item={item} key={item.id} error={errors?.[item.id]}>
                <Controller control={control} name={item.id}
                    rules={item.rules}
                    render={({ field }) => {
                        return renderComponent({ item, field, Component, onSearch });
                    }}
                />
            </CabinFormRow>
        )
    })
    return (
        <>
            {renderItem}
        </>
    )
}

export default CabinForm