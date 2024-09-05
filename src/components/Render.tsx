import { useState, useEffect } from 'react';
import StyledRender from '../styles/StyledRender';
import { FormElement } from '../types/FormElements';
import generateFormHtml from '../utils/generateFormHtml';
import { RenderProps } from '../types/Render';
import { Form } from 'antd';

function Render(props: RenderProps) {
    if (!Array.isArray(props.formData)) throw new Error('The "form" prop must be an array.');

    const [formData, setFormData] = useState<FormElement[]>([]);
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        props.onSubmit(values);
    };

    useEffect(() => {
        setFormData(() => props.formData);
    }, [props.formData]);

    const onFinish = (data: unknown) => {
        console.log(data);
    };

    const onFinishFailed = (data: unknown) => {
        console.log(data);
    };

    return (
        <StyledRender>
            <Form
                form={form}
                name='render-form'
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                {formData.map((formElement, index) =>
                    generateFormHtml({
                        mode: 'Render',
                        formData,
                        setFormData,
                        onSubmit: handleSubmit,
                        formElement,
                        index
                    })
                )}
            </Form>
        </StyledRender>
    );
}

export default Render;
