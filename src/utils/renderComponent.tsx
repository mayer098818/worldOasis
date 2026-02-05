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
    isPending?: boolean;
    onInputBlur?: (name: string, value: any) => void
};

const renderComponent = ({ item, field, Component, onInputBlur, onSearch, isPending }: RenderComponentProps) => {
    if (item.type === 'input') {
        return <Component {...field}
            disabled={isPending}
            styles={{
                root: {
                    minWidth: '318px'
                }
            }}
            {...item} />;
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
                disabled={isPending}
                onSearch={(value: string) => {
                    field.onChange(value);
                    onSearch?.(value);
                }}
                enterButton={item.icon}
                {...item}
            />
        );
    } else if (item.type === 'numberInput') {
        return <Component {...field} disabled={isPending} styles={{
            root: {
                width: '318px',
            }
        }}
            onBlur={() => {
                field.onBlur()
                onInputBlur?.(field.name, field.value)
            }}
            {...item} />
    } else if (item.type === 'textArea') {
        return <Component {...field} disabled={isPending} autoSize={{ minRows: 2, maxRows: 3 }} styles={{
            root: {
                width: '318px',
            }
        }} />
    } else if (item.type === 'inputPassword') {
        return <Component {...field}
            disabled={isPending}
            styles={{
                root: {
                    minWidth: '318px',
                }
            }}
            {...item} />
    }
    else if (item.type === 'upload') {
        return <Component
            fileList={field.value}
            beforeUpload={() => false}   // 阻止自动上传
            onChange={({ fileList }) => {
                field.onChange(fileList);
            }}
            {...item} >
            <Input
                disabled={isPending}
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
