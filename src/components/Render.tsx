import { useState, useEffect } from 'react';
import { FormElement } from '../types/FormElements';
import GenerateFormHtml from '../utils/GenerateFormHtml';
import { RenderProps } from '../types/Render';
import { Form } from 'antd';
import GlobalStyle from '../styles/GlobalStyle';

const Render: React.FC<RenderProps> = (props) => {
    if (!Array.isArray(props.formData)) throw new Error('The "form" prop must be an array.');

    const [formData, setFormData] = useState<FormElement[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        setFormData(() => props.formData);
    }, [props.formData]);

    const onFinish = (values: { [key: string]: string | number | string[] | number[] | boolean }) => {
        // const modifiedData = Object.keys(values).map((item) => ({ fieldName: item, fieldValue: values[item] }));
        props.onSubmit(values);
    };

    const onFinishFailed = (data: unknown) => console.log(data);

    return (
        <>
            <GlobalStyle />
            <Form
                form={form}
                name='render-form'
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                {formData.map((formElement, index) => (
                    <GenerateFormHtml
                        mode='Render'
                        formData={formData}
                        setFormData={setFormData}
                        formElement={formElement}
                        index={index}
                        dataSourceType={'dataSourceType' in formElement ? formElement.dataSourceType : null}
                        apiOptions={'apiOptions' in formElement ? formElement.apiOptions : null}
                    />
                ))}
            </Form>
        </>
    );
};

export default Render;
