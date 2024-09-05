import { ReactElement } from 'react';
import { FormElement } from '../types/FormElements';
import FormElementWrapper from '../components/FormElementWrapper';
import FormItem from '../general_components/form_item';
import Text from '../general_components/text';
import Number from '../general_components/number';
import Date from '../general_components/date';
import Time from '../general_components/time';
import Button from '../general_components/button';
import TextArea from '../general_components/textarea';
import Select from '../general_components/select';
import CheckboxGroup from '../general_components/checkbox_group';
import Radio from '../general_components/radio';

type GenerateFormHtmlProps =
	| {
			mode: 'Builder';
			formData: FormElement[];
			formElement: FormElement;
			index: number;
			onEditElement: (element: FormElement) => void;
			onRemove: (uid: string) => void;
			isDragging: boolean;
			onDragStart: (elementType: FormElement['elementType'], uid: string, isWidget?: boolean) => void;
			onDragOver: (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => void;
			onDragEnd: () => void;
	  }
	| {
			mode: 'Render';
			formData: FormElement[];
			setFormData: React.Dispatch<React.SetStateAction<FormElement[]>>;
			formElement: FormElement;
			index: number;
			onSubmit: (values: any) => void;
	  };

const generateFormHtml = (props: GenerateFormHtmlProps) => {
	let formElementHtml: ReactElement;
	const { mode, formElement, index } = props;
	const { elementType, uid } = formElement;

	if (elementType === 'name' || elementType === 'text') {
		const { label, attributes, labelPosition, labelStyles, elementStyles, required } = formElement;
		formElementHtml = (
			<FormItem
				layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
				label={label || ''}
				name={attributes.name}
				rules={[
					{ required: mode === 'Render' ? required : false, message: 'This field is required' },
					{ min: attributes.minLength, message: `Minimum length is ${attributes.minLength}` },
					{ max: attributes.maxLength, message: `Maximum length is ${attributes.maxLength}` },
				]}
				labelCol={{ className: 'custom-label' }}
				labelStyles={labelStyles}
				elementStyles={elementStyles}
			>
				<Text
					{...attributes}
					className='custom-element'
				/>
			</FormItem>
		);
	} else if (elementType === 'email') {
		const { label, attributes, labelPosition, labelStyles, elementStyles, required } = formElement;
		formElementHtml = (
			<FormItem
				layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
				label={label || ''}
				name={attributes.name}
				rules={
					mode === 'Render'
						? [
								{
									type: 'email',
									message: 'The input is not a valid email address!',
								},
								{ required, message: 'This field is required' },
								{ min: attributes.minLength, message: `Minimum length is ${attributes.minLength}` },
								{ max: attributes.maxLength, message: `Maximum length is ${attributes.maxLength}` },
						  ]
						: []
				}
				labelCol={{ className: 'custom-label' }}
				labelStyles={labelStyles}
				elementStyles={elementStyles}
			>
				<Text
					{...attributes}
					className='custom-element'
				/>
			</FormItem>
		);
		// } else if (elementType === 'phone number') {
	} else if (elementType === 'number') {
		const { label, attributes, labelPosition, labelStyles, elementStyles, required } = formElement;
		formElementHtml = (
			<FormItem
				layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
				label={label || ''}
				name={attributes.name}
				rules={[
					{ required: mode === 'Render' ? required : false, message: 'This field is required' },
					{ min: attributes.min, message: `Minimum length is ${attributes.min}` },
					{ max: attributes.max, message: `Maximum length is ${attributes.max}` },
				]}
				labelCol={{ className: 'custom-label' }}
				labelStyles={labelStyles}
				elementStyles={elementStyles}
			>
				<Number
					{...attributes}
					className='custom-element'
				/>
			</FormItem>
		);
	} else if (elementType === 'date') {
		const { label, attributes, labelPosition, labelStyles, elementStyles, required } = formElement;
		formElementHtml = (
			<FormItem
				layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
				label={label || ''}
				name={attributes.name}
				rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
				labelCol={{ className: 'custom-label' }}
				labelStyles={labelStyles}
				elementStyles={elementStyles}
			>
				<Date
					{...attributes}
					className='custom-element'
				/>
			</FormItem>
		);
	} else if (elementType === 'time') {
		const { label, attributes, labelPosition, labelStyles, elementStyles, required } = formElement;
		formElementHtml = (
			<FormItem
				layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
				label={label || ''}
				name={attributes.name}
				rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
				labelCol={{ className: 'custom-label' }}
				labelStyles={labelStyles}
				elementStyles={elementStyles}
			>
				<Time
					{...attributes}
					className='custom-element'
				/>
			</FormItem>
		);
	} else if (elementType === 'button') {
		const { elementStyles, attributes } = formElement;
		const { placeholder, type, disabled, id } = attributes;

		formElementHtml = (
			<FormItem elementStyles={elementStyles}>
				<Button
					htmlType={type}
					id={id}
					disabled={disabled}
					className='custom-element'
				>
					{placeholder}
				</Button>
			</FormItem>
		);
	} else if (elementType === 'textarea') {
		const { label, labelPosition, labelStyles, elementStyles, attributes, required } = formElement;
		formElementHtml = (
			<FormItem
				layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
				label={label || ''}
				name={attributes.name}
				rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
				labelCol={{ className: 'custom-label' }}
				labelStyles={labelStyles}
				elementStyles={elementStyles}
			>
				<TextArea />
			</FormItem>
		);
	} else if (elementType === 'select') {
		const { label, labelPosition, labelStyles, elementStyles, attributes, options, required } = formElement;
		formElementHtml = (
			<FormItem
				layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
				label={label || ''}
				name={attributes.name}
				rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
				labelCol={{ className: 'custom-label' }}
				labelStyles={labelStyles}
				elementStyles={elementStyles}
			>
				<Select options={options.map(({ label, value }) => ({ value, label }))} />
			</FormItem>
		);
	} else if (elementType === 'checkbox') {
		const { label, labelPosition, labelStyles, elementStyles, attributes, options, required } = formElement;
		formElementHtml = (
			<FormItem
				layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
				label={label || ''}
				name={attributes.name}
				rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
				labelCol={{ className: 'custom-label' }}
				labelStyles={labelStyles}
				elementStyles={elementStyles}
			>
				<CheckboxGroup
					options={options.map(({ label, value, checked, disabled }) => ({
						value,
						label,
						checked,
						disabled,
					}))}
				/>
			</FormItem>
		);
	} else if (elementType === 'radio') {
		const { label, labelPosition, labelStyles, elementStyles, attributes, options, required } = formElement;
		formElementHtml = (
			<FormItem
				layout={labelPosition === 'left' ? 'horizontal' : 'vertical'}
				label={label || ''}
				name={attributes.name}
				rules={[{ required: mode === 'Render' ? required : false, message: 'This field is required' }]}
				labelCol={{ className: 'custom-label' }}
				labelStyles={labelStyles}
				elementStyles={elementStyles}
			>
				<Radio
					options={options.map(({ label, value, disabled }) => ({
						value,
						label,
						disabled,
					}))}
				/>
			</FormItem>
		);
	} else {
		formElementHtml = <></>;
	}

	if (mode === 'Builder') {
		const { isDragging, onDragStart, onDragOver, onDragEnd, formData, onEditElement, onRemove } = props;
		const formElementWrapperProps = {
			uid,
			formData,
			onEditElement,
			onRemove,
		};

		return (
			<div
				key={index}
				className={`form-element ${isDragging && 'is-dragging'}`}
				id={uid}
				draggable
				onDragStart={() => onDragStart(elementType, uid, false)}
				onDragOver={(e: React.DragEvent<HTMLDivElement>) => onDragOver(e, index)}
				onDragEnd={onDragEnd}
			>
				<FormElementWrapper {...formElementWrapperProps}>{formElementHtml}</FormElementWrapper>
			</div>
		);
	} else {
		return (
			<div
				key={index}
				className='form-element'
			>
				{formElementHtml}
			</div>
		);
	}
};

export default generateFormHtml;
