import { ButtonElement, FormElement } from '../../types/FormElements';
import cloneElement from '../../utils/cloneElement';

import InputText from '../../general_components/InputText';
import Select from '../../general_components/Select';
import Checkbox from '../../general_components/Checkbox';
import FormItem from '../../general_components/FormItem';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type GeneralProps = {
    element: FormElement;
    setElement: (value: React.SetStateAction<FormElement>) => void;
};

function General({ element, setElement }: GeneralProps) {
    return (
        <>
            {'type' in element.attributes && element.elementType === 'button' && (
                <FormItem label='Button type' name='buttonType' initialValue={element.attributes.type}>
                    <Select
                        value={element.attributes.type}
                        onChange={(value: ButtonElement['attributes']['type']) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('type' in temp.attributes) temp.attributes.type = value;
                                return temp;
                            })
                        }
                        options={[
                            {
                                value: 'submit',
                                text: 'Submit'
                            },
                            {
                                value: 'button',
                                text: 'Button'
                            },
                            {
                                value: 'reset',
                                text: 'Reset'
                            }
                        ]}
                    />
                </FormItem>
            )}

            {'label' in element && (
                <FormItem label='Label' name='label' initialValue={element.label}>
                    <InputText
                        value={element.label}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('label' in temp) temp.label = e.target.value;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}

            {'labelPosition' in element && (
                <FormItem label='Label position' name='labelPosition' initialValue={element.labelPosition}>
                    <Select
                        value={element.labelPosition}
                        onChange={(value: 'top' | 'left') =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('labelPosition' in temp) temp.labelPosition = value;
                                return temp;
                            })
                        }
                        options={[
                            {
                                value: 'top',
                                text: 'Top'
                            },
                            {
                                value: 'left',
                                text: 'Left'
                            }
                        ]}
                    />
                </FormItem>
            )}

            {'name' in element.attributes && (
                <FormItem
                    label='Name'
                    name='name'
                    initialValue={element.attributes.name}
                    rules={[{ required: true, message: 'Name is required' }]}
                >
                    <InputText
                        value={element.attributes.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('name' in temp.attributes) temp.attributes.name = e.target.value;
                                return temp;
                            })
                        }
                        disabled={
                            element.elementType === 'name' ||
                            element.elementType === 'email' ||
                            element.elementType === 'phone number'
                                ? true
                                : false
                        }
                    />
                </FormItem>
            )}

            {'placeholder' in element.attributes && (
                <FormItem label='Placeholder' name='placeholder' initialValue={element.attributes.placeholder}>
                    <InputText
                        value={element.attributes.placeholder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('placeholder' in temp.attributes) temp.attributes.placeholder = e.target.value;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}

            {'id' in element.attributes && (
                <FormItem label='ID' name='id' initialValue={element.attributes.id}>
                    <InputText
                        value={element.attributes.id}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('id' in temp.attributes) temp.attributes.id = e.target.value;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}

            {'required' in element && (
                <FormItem name='required' initialValue={element.required} style={{ marginBottom: '.2em' }}>
                    <Checkbox
                        checked={element.required}
                        onChange={(e: CheckboxChangeEvent) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('required' in temp) temp.required = e.target.checked;
                                return temp;
                            })
                        }
                    >
                        Required
                    </Checkbox>
                </FormItem>
            )}

            {'requireCountryCode' in element && (
                <FormItem
                    name='requireCountryCode'
                    initialValue={element.requireCountryCode}
                    style={{ marginBottom: '.2em' }}
                >
                    <Checkbox
                        checked={element.requireCountryCode}
                        onChange={(e: CheckboxChangeEvent) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('requireCountryCode' in temp) temp.requireCountryCode = e.target.checked;
                                return temp;
                            })
                        }
                    >
                        Require Country Code
                    </Checkbox>
                </FormItem>
            )}

            {'readOnly' in element.attributes && (
                <FormItem name='readOnly' initialValue={element.attributes.readOnly} style={{ marginBottom: '.2em' }}>
                    <Checkbox
                        checked={element.attributes.readOnly}
                        onChange={(e: CheckboxChangeEvent) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('readOnly' in temp.attributes) temp.attributes.readOnly = e.target.checked;
                                return temp;
                            })
                        }
                    >
                        ReadOnly
                    </Checkbox>
                </FormItem>
            )}

            {'disabled' in element.attributes && (
                <FormItem name='disabled' initialValue={element.attributes.disabled} style={{ marginBottom: '.2em' }}>
                    <Checkbox
                        checked={element.attributes.disabled}
                        onChange={(e: CheckboxChangeEvent) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('disabled' in temp.attributes) temp.attributes.disabled = e.target.checked;
                                return temp;
                            })
                        }
                    >
                        Disabled
                    </Checkbox>
                </FormItem>
            )}
        </>
    );
}

export default General;
