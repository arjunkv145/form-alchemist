import { FormElement } from '../../types/FormElements';
import cloneElement from '../../utils/cloneElement';

import deleteIcon from '../../assets/delete.svg';
import InputText from '../../general_components/InputText';
import { Col, Row, Typography } from 'antd';
import Select from '../../general_components/Select';
import Checkbox from '../../general_components/Checkbox';
import Button from '../../general_components/Button';
import FormItem from '../../general_components/FormItem';

type DataProps = {
    isFormSubmittedOnce: boolean;
    resetFields: () => void;
    element: FormElement;
    setElement: (value: React.SetStateAction<FormElement>) => void;
};

function Data({ element, setElement, resetFields, isFormSubmittedOnce }: DataProps) {
    return (
        <>
            {'multiple' in element.attributes && (
                <FormItem name='multiple' initialValue={element.attributes.multiple} style={{ marginBottom: '.2em' }}>
                    <Checkbox
                        checked={element.attributes.multiple}
                        onChange={(e) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if (temp.elementType === 'select') {
                                    temp.attributes.multiple = e.target.checked;
                                    if (e.target.checked === false)
                                        temp.options = temp.options.map((op) => ({ ...op, selected: false }));
                                }
                                return temp;
                            })
                        }
                    >
                        Multiple
                    </Checkbox>
                </FormItem>
            )}

            {'dataSourceType' in element && (
                <FormItem label='Data source type'>
                    <Select
                        options={[
                            { label: 'Values', value: 'values' },
                            { label: 'API', value: 'api' }
                        ]}
                        value={element.dataSourceType}
                        onChange={(value: 'values' | 'api') =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('dataSourceType' in temp) temp.dataSourceType = value;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}

            {'dataSourceType' in element && element.dataSourceType === 'values' && (
                <>
                    <div className='element-editor__options'>
                        {Array.from({ length: element.options.length }).map((_, i) => (
                            <Row gutter={16} key={i} wrap={true}>
                                <Col flex='auto'>
                                    <FormItem
                                        label='Label'
                                        name={`label${i}`}
                                        rules={[{ required: true, message: 'Label is required' }]}
                                        initialValue={element.options[i].label}
                                    >
                                        <InputText
                                            value={element.options[i].label}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setElement((prev) => {
                                                    const temp = cloneElement(prev);
                                                    if ('options' in temp && 'label' in temp.options[i])
                                                        temp.options[i].label = e.target.value;
                                                    return temp;
                                                })
                                            }
                                        />
                                    </FormItem>
                                </Col>
                                <Col flex='auto'>
                                    <FormItem
                                        label='Value'
                                        name={`value${i}`}
                                        rules={[{ required: true, message: 'Value is required' }]}
                                        initialValue={element.options[i].value}
                                    >
                                        <InputText
                                            value={element.options[i].value}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setElement((prev) => {
                                                    const temp = cloneElement(prev);
                                                    if ('options' in temp && 'value' in temp.options[i])
                                                        temp.options[i].value = e.target.value;
                                                    return temp;
                                                })
                                            }
                                        />
                                    </FormItem>
                                </Col>
                                <Col flex='none'>
                                    <div>
                                        <img
                                            src={deleteIcon}
                                            alt='Delete icon'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setElement((prev) => {
                                                    const temp = cloneElement(prev);
                                                    console.log(i);
                                                    if ('options' in temp) temp.options.splice(i, 1);
                                                    return temp;
                                                });
                                                resetFields();
                                            }}
                                            style={{ cursor: 'pointer', width: '20px' }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        ))}

                        {'options' in element && (
                            <FormItem>
                                <Button
                                    type='default'
                                    htmlType='button'
                                    onClick={() =>
                                        setElement((prev) => {
                                            const temp = cloneElement(prev);
                                            if (temp.elementType === 'select') {
                                                temp.options.push({
                                                    label: '',
                                                    value: '',
                                                    selected: false,
                                                    disabled: false
                                                });
                                            } else if (temp.elementType === 'checkbox') {
                                                temp.options.push({
                                                    label: '',
                                                    value: '',
                                                    checked: false,
                                                    disabled: false
                                                });
                                            } else if (temp.elementType === 'radio') {
                                                temp.options.push({
                                                    label: '',
                                                    value: '',
                                                    checked: false,
                                                    disabled: false
                                                });
                                            }

                                            return temp;
                                        })
                                    }
                                >
                                    add option
                                </Button>
                                {isFormSubmittedOnce && element.options.length === 0 && (
                                    <Typography.Text type='danger' style={{ display: 'block', marginTop: '8px' }}>
                                        Please add atleast one option.
                                    </Typography.Text>
                                )}
                            </FormItem>
                        )}
                    </div>

                    {element.elementType === 'select' && (
                        <FormItem label='Default selected values'>
                            <Select
                                mode={element.attributes.multiple ? 'tags' : undefined}
                                placeholder='Select default values'
                                options={element.options.map(({ label, value }) => ({ label, value }))}
                                value={element.options.filter((option) => option.selected).map(({ value }) => value)}
                                onChange={(value: string | string[]) =>
                                    setElement((prev) => {
                                        const temp = cloneElement(prev);
                                        if (temp.elementType === 'select' && temp.attributes.multiple)
                                            temp.options = temp.options.map((option) =>
                                                value.includes(option.value)
                                                    ? { ...option, selected: true }
                                                    : { ...option, selected: false }
                                            );
                                        else if (temp.elementType === 'select' && !temp.attributes.multiple)
                                            temp.options = temp.options.map((option) =>
                                                value === option.value
                                                    ? { ...option, selected: true }
                                                    : { ...option, selected: false }
                                            );
                                        return temp;
                                    })
                                }
                            />
                        </FormItem>
                    )}

                    {element.elementType === 'checkbox' && (
                        <FormItem label='Default checked values'>
                            <Select
                                mode='tags'
                                placeholder='Select default values'
                                options={element.options.map(({ label, value }) => ({ label, value }))}
                                value={element.options.filter((option) => option.checked).map(({ value }) => value)}
                                onChange={(value: string[]) =>
                                    setElement((prev) => {
                                        const temp = cloneElement(prev);
                                        if (temp.elementType === 'checkbox')
                                            temp.options = temp.options.map((option) =>
                                                value.includes(option.value)
                                                    ? { ...option, checked: true }
                                                    : { ...option, checked: false }
                                            );

                                        return temp;
                                    })
                                }
                            />
                        </FormItem>
                    )}

                    {element.elementType === 'radio' && (
                        <FormItem label='Default checked value'>
                            <Select
                                placeholder='Select default value'
                                options={element.options.map(({ label, value }) => ({ label, value }))}
                                value={element.options.filter((option) => option.checked).map(({ value }) => value)}
                                onChange={(value: string) =>
                                    setElement((prev) => {
                                        const temp = cloneElement(prev);
                                        if (temp.elementType === 'radio')
                                            temp.options = temp.options.map((option) =>
                                                value === option.value
                                                    ? { ...option, checked: true }
                                                    : { ...option, checked: false }
                                            );

                                        return temp;
                                    })
                                }
                            />
                        </FormItem>
                    )}

                    {'options' in element && (
                        <FormItem label='Disabled options'>
                            <Select
                                mode='tags'
                                placeholder='Select default options'
                                options={element.options.map(({ label, value }) => ({ label, value }))}
                                value={element.options.filter((option) => option.disabled).map(({ value }) => value)}
                                onChange={(value: string[]) =>
                                    setElement((prev) => {
                                        const temp = cloneElement(prev);
                                        if (temp.elementType === 'select')
                                            temp.options = temp.options.map((option) =>
                                                value.includes(option.value)
                                                    ? { ...option, disabled: true }
                                                    : { ...option, disabled: false }
                                            );
                                        else if (temp.elementType === 'checkbox')
                                            temp.options = temp.options.map((option) =>
                                                value.includes(option.value)
                                                    ? { ...option, disabled: true }
                                                    : { ...option, disabled: false }
                                            );
                                        else if (temp.elementType === 'radio')
                                            temp.options = temp.options.map((option) =>
                                                value.includes(option.value)
                                                    ? { ...option, disabled: true }
                                                    : { ...option, disabled: false }
                                            );

                                        return temp;
                                    })
                                }
                            />
                        </FormItem>
                    )}
                </>
            )}

            {'dataSourceType' in element && element.dataSourceType === 'api' && (
                <>
                    <FormItem
                        label='URL'
                        name='url'
                        rules={[{ required: true, message: 'URL is required' }]}
                        initialValue={element.apiOptions.url}
                    >
                        <InputText
                            value={element.apiOptions.url}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setElement((prev) => {
                                    const temp = cloneElement(prev);
                                    if ('apiOptions' in temp) temp.apiOptions.url = e.target.value;
                                    return temp;
                                })
                            }
                        />
                    </FormItem>
                    <FormItem
                        label='Data path'
                        name='dataPath'
                        initialValue={element.apiOptions.dataPath}
                        rules={[{ required: true, message: 'Data path is required' }]}
                    >
                        <InputText
                            value={element.apiOptions.dataPath}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setElement((prev) => {
                                    const temp = cloneElement(prev);
                                    if ('apiOptions' in temp) temp.apiOptions.dataPath = e.target.value;
                                    return temp;
                                })
                            }
                        />
                    </FormItem>
                    <FormItem
                        label='Label key'
                        name='labelKey'
                        initialValue={element.apiOptions.labelKey}
                        rules={[{ required: true, message: 'Label key is required' }]}
                    >
                        <InputText
                            value={element.apiOptions.labelKey}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setElement((prev) => {
                                    const temp = cloneElement(prev);
                                    if ('apiOptions' in temp) temp.apiOptions.labelKey = e.target.value;
                                    return temp;
                                })
                            }
                        />
                    </FormItem>
                    <FormItem
                        label='Value key'
                        name='valueKey'
                        initialValue={element.apiOptions.valueKey}
                        rules={[{ required: true, message: 'Value key is required' }]}
                    >
                        <InputText
                            value={element.apiOptions.valueKey}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setElement((prev) => {
                                    const temp = cloneElement(prev);
                                    if ('apiOptions' in temp) temp.apiOptions.valueKey = e.target.value;
                                    return temp;
                                })
                            }
                        />
                    </FormItem>
                </>
            )}
        </>
    );
}

export default Data;
