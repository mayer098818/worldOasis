import { Input, InputNumber, Upload } from "antd"
import CabinFormRow from "./CabinFormRow"
import { Controller, type Control, type FieldErrors } from "react-hook-form"
import renderComponent from "../../utils/renderComponent"

const ComponentMap: Record<string, typeof Input | typeof Input.Search | typeof InputNumber | typeof Upload | typeof Input.TextArea | typeof Input.Password> = {
    'input': Input,
    'search': Input.Search,
    'numberInput': InputNumber,
    'textArea': Input.TextArea,
    'inputPassword': Input.Password,
    'upload': Upload
} as const;

type CabinFormProps = {
    cabinData?: any
    onSearch?: (value: string) => void;
    control: Control<any>;
    errors?: FieldErrors<any>;
    cabinConfig: any
    isPending?: boolean,
    disabled?: boolean,
    onInputBlur?: (name: string, value: any) => void
    type?: string
};

const CabinForm = ({ onSearch, onInputBlur, type, cabinConfig, isPending, control, errors }: CabinFormProps) => {
    const renderItem = cabinConfig?.map((item: any) => {
        const Component = ComponentMap[item.type as keyof typeof ComponentMap]
        return (
            <CabinFormRow type={type} item={item} key={item.id} error={errors?.[item.id]}>
                <Controller control={control} name={item.id}
                    rules={item.rules}
                    render={({ field }) => {
                        return renderComponent({ item, field, Component, onSearch, isPending, onInputBlur });
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