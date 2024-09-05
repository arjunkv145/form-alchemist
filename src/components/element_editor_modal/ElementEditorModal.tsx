import { useEffect, useState } from 'react';
import { FormElement } from '../../types/FormElements';
import General from './sections/General';
import Styling from './sections/Styling';
import Validation from './sections/Validation';
import { Button, Form, Tabs, TabsProps } from 'antd';
import FormItem from '../../general_components/form_item';

type ElementEditorModalProps = {
	show: boolean;
	element: FormElement;
	onSubmit: (element: FormElement) => void;
	onCancel: () => void;
};

function ElementEditorModal(props: ElementEditorModalProps) {
	const [element, setElement] = useState<FormElement>(props.element);
	const [form] = Form.useForm();
	const [activeKey, setActiveKey] = useState<string | undefined>('1');

	useEffect(() => {
		setActiveKey('1');
		setElement(props.element);
		setTimeout(() => form.resetFields(), 10);
	}, [props.element, props.show, form]);

	const resetFields = () => setTimeout(() => form.resetFields(), 10);

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Display',
			children: (
				<General
					element={element}
					setElement={setElement}
					resetFields={resetFields}
				/>
			),
		},
		{
			key: '2',
			label: 'Validation',
			children: (
				<Validation
					element={element}
					setElement={setElement}
				/>
			),
		},
		{
			key: '3',
			label: 'Styling',
			children: (
				<Styling
					element={element}
					setElement={setElement}
				/>
			),
		},
	];

	const onChange = (key: string) => setActiveKey(key);

	const onFinish = (data: unknown) => {
		const { elementType } = element;
		if (elementType === 'select' || elementType === 'checkbox' || elementType === 'radio') {
			if (element.options.length > 0) props.onSubmit(element);
		} else props.onSubmit(element);
	};

	const onFinishFailed = (data: unknown) => console.log(data);

	return (
		<Form
			form={form}
			name='modal-form'
			layout='vertical'
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete='off'
		>
			<Tabs
				defaultActiveKey='1'
				items={items}
				activeKey={activeKey}
				onChange={onChange}
			/>

			<FormItem style={{ marginTop: '1em' }}>
				<Button
					type='default'
					htmlType='button'
					onClick={props.onCancel}
				>
					cancel
				</Button>
				<Button
					type='primary'
					htmlType='submit'
				>
					submit
				</Button>
			</FormItem>
		</Form>
	);
}

export default ElementEditorModal;
