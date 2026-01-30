import { Input } from "antd";
import { Upload as UploadIcon } from "lucide-react";
import type { ReactNode } from "react";
type RenderComponentProps = {
    item: {
        type: string;
        icon?: ReactNode;
        [key: string]: any;
    };
    field: {
        onChange: (value: any) => void;
        value: any;
        [key: string]: any;
    };
    Component: React.ComponentType<any>;
    onSearch?: (value: string) => void;
};

const renderComponent = ({ item, field, Component, onSearch }: RenderComponentProps) => {
    if (item.type === 'input') {
        return <Component {...field} {...item} />;
    } else if (item.type === 'search') {
        return (
            <Component
                styles={{
                    root: {
                        borderColor: item.bdColor ?? undefined
                    },
                    active: {
                        borderColor: item.focusBorderColor ?? 'var(--color-brand-600)',
                        boxShadow: `0 0 0 2px ${item.focusBorderColor ?? 'var(--color-brand-600)'}33`
                    },
                    input: {
                        width: '262px',
                        marginLeft: '188px'
                    },
                    button: {
                        root: {
                            backgroundColor: item.bgColor ?? 'var(--color-brand-600)'
                        }
                    }
                }}
                {...field}
                onSearch={(value: string) => {
                    field.onChange(value);
                    onSearch?.(value);
                }}
                enterButton={item.icon}
                {...item}
            />
        );
    } else if (item.type === 'numberInput') {
        // <InputNumber min={item.min} max={item.max} value={item.defaultValue} onChange={setValue} />
        return <Component {...field} styles={{
            root: {
                width: '318px',
            }
        }}
            {...item} />
    } else if (item.type) {
        return <Component
            fileList={field.value}
            beforeUpload={() => false}   // 阻止自动上传
            onChange={({ fileList }) => {
                field.onChange(fileList);
            }}
            {...item} >
            <Input
                styles={{
                    root: {
                        width: '320px'
                    }
                }}
                placeholder="Click to upload file"
                readOnly
                suffix={<UploadIcon />}
            />
        </Component>
    }
    // Fallback: return a div if type doesn't match
    return <div>Unknown type: {item.type}</div>;
};

export default renderComponent;
