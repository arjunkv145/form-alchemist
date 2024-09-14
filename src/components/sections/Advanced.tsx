import { FormElement } from '../../types/FormElements';
import FormItem from '../../general_components/FormItem';
import InputNumber from '../../general_components/InputNumber';
import cloneElement from '../../utils/cloneElement';

type AdvancedProps = {
    element: FormElement;
    setElement: (value: React.SetStateAction<FormElement>) => void;
};

function Advanced({ element, setElement }: AdvancedProps) {
    return (
        <>
            {'minLength' in element.attributes && (
                <FormItem
                    label='Min Length'
                    name='minLength'
                    initialValue={element.attributes.minLength}
                    rules={[{ required: true, message: 'Mini length is required' }]}
                >
                    <InputNumber
                        value={element.attributes.minLength}
                        onChange={(value) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('minLength' in temp.attributes)
                                    temp.attributes.minLength = typeof value === 'number' ? value : 0;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}

            {'maxLength' in element.attributes && (
                <FormItem
                    label='Max Length'
                    name='maxLength'
                    initialValue={element.attributes.maxLength}
                    rules={[{ required: true, message: 'Max length is required' }]}
                >
                    <InputNumber
                        value={element.attributes.maxLength}
                        onChange={(value) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('maxLength' in temp.attributes)
                                    temp.attributes.maxLength = typeof value === 'number' ? value : 0;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}

            {'min' in element.attributes && (
                <FormItem
                    label='Min Value'
                    name='min'
                    initialValue={element.attributes.min}
                    rules={[{ required: true, message: 'Min Value is required' }]}
                >
                    <InputNumber
                        value={element.attributes.min}
                        onChange={(value) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('min' in temp.attributes)
                                    temp.attributes.min = typeof value === 'number' ? value : 0;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}

            {'max' in element.attributes && (
                <FormItem
                    label='Max Value'
                    name='max'
                    initialValue={element.attributes.max}
                    rules={[{ required: true, message: 'Max length is required' }]}
                >
                    <InputNumber
                        value={element.attributes.max}
                        onChange={(value) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('max' in temp.attributes)
                                    temp.attributes.max = typeof value === 'number' ? value : 0;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}

            {'rows' in element.attributes && (
                <FormItem
                    label='No of rows'
                    name='rows'
                    initialValue={element.attributes.rows}
                    rules={[{ required: true, message: 'No of rows is required' }]}
                >
                    <InputNumber
                        value={element.attributes.rows}
                        onChange={(value) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('rows' in temp.attributes)
                                    temp.attributes.rows = typeof value === 'number' ? value : 0;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}

            {'cols' in element.attributes && (
                <FormItem
                    label='No of cols'
                    name='cols'
                    initialValue={element.attributes.cols}
                    rules={[{ required: true, message: 'No of cols is required' }]}
                >
                    <InputNumber
                        value={element.attributes.cols}
                        onChange={(value) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('cols' in temp.attributes)
                                    temp.attributes.cols = typeof value === 'number' ? value : 0;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}
        </>
    );
}

export default Advanced;
