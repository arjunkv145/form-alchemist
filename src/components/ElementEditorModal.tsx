import { useEffect, useState } from 'react';
import { FormElement } from '../types/FormElements';
import General from './sections/General';
import Styling from './sections/Styling';
import Advanced from './sections/Advanced';
import { Button, Form, Tabs, TabsProps } from 'antd';
import FormItem from '../general_components/FormItem';
import Data from './sections/Data';

type ElementEditorModalProps = {
    show: boolean;
    element: FormElement;
    onSubmit: (element: FormElement) => void;
    onCancel: () => void;
};

function ElementEditorModal(props: ElementEditorModalProps) {
    const [element, setElement] = useState<FormElement>(props.element);
    const [form] = Form.useForm();
    const [isFormSubmittedOnce, setIsFormSubmittedOnce] = useState<boolean>(false);
    const [activeKey, setActiveKey] = useState<string | undefined>('1');

    const resetFields = () => setTimeout(() => form.resetFields(), 10);

    const items: TabsProps['items'] = ['name', 'email', 'text', 'number', 'textarea'].includes(element.elementType)
        ? [
              {
                  key: '1',
                  label: 'General',
                  children: <General element={element} setElement={setElement} />
              },
              {
                  key: '2',
                  label: 'Advanced',
                  children: <Advanced element={element} setElement={setElement} />
              },
              {
                  key: '3',
                  label: 'Styling',
                  children: <Styling element={element} setElement={setElement} />
              }
          ]
        : ['select', 'checkbox', 'radio'].includes(element.elementType)
        ? [
              {
                  key: '1',
                  label: 'General',
                  children: <General element={element} setElement={setElement} />
              },
              {
                  key: '2',
                  label: 'Data',
                  children: (
                      <Data
                          element={element}
                          setElement={setElement}
                          resetFields={resetFields}
                          isFormSubmittedOnce={isFormSubmittedOnce}
                      />
                  )
              },
              {
                  key: '3',
                  label: 'Styling',
                  children: <Styling element={element} setElement={setElement} />
              }
          ]
        : [
              {
                  key: '1',
                  label: 'General',
                  children: <General element={element} setElement={setElement} />
              },
              {
                  key: '2',
                  label: 'Styling',
                  children: <Styling element={element} setElement={setElement} />
              }
          ];

    const onChange = (key: string) => setActiveKey(key);

    const onFinish = () => {
        setIsFormSubmittedOnce(true);
        const { elementType } = element;
        if (elementType === 'select' || elementType === 'checkbox' || elementType === 'radio') {
            if (element.dataSourceType === 'values' && element.options.length === 0) setActiveKey('2');
            else props.onSubmit(element);
        } else props.onSubmit(element);
    };

    const onFinishFailed = (data) => {
        setIsFormSubmittedOnce(true);
        if (data.errorFields[0].name[0].includes('label')) setActiveKey('2');
        else if (data.errorFields[0].name[0].includes('value')) setActiveKey('2');
        else if (data.errorFields[0].name.includes('url')) setActiveKey('2');
        else if (data.errorFields[0].name.includes('dataPath')) setActiveKey('2');
        else if (data.errorFields[0].name.includes('labelKey')) setActiveKey('2');
        else if (data.errorFields[0].name.includes('valueKey')) setActiveKey('2');
        console.log(data);
    };

    useEffect(() => {
        setActiveKey('1');
        setElement(props.element);
        setTimeout(() => form.resetFields(), 10);
        setIsFormSubmittedOnce(false);
    }, [props.element, props.show, form, setIsFormSubmittedOnce]);

    return (
        <Form
            form={form}
            name='modal-form'
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <Tabs defaultActiveKey='1' items={items} activeKey={activeKey} onChange={onChange} />

            <FormItem style={{ marginTop: '1em', display: 'flex', justifyContent: 'flex-end' }}>
                <Button type='default' htmlType='button' onClick={props.onCancel} style={{ marginRight: '1em' }}>
                    cancel
                </Button>
                <Button type='primary' htmlType='submit'>
                    submit
                </Button>
            </FormItem>
        </Form>
    );
}

export default ElementEditorModal;
