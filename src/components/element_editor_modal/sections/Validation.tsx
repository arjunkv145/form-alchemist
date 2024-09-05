import { FormElement } from '../../../types/FormElements';
import FormItem from '../../../general_components/form_item';
import Checkbox from '../../../general_components/checkbox';
import Number from '../../../general_components/number';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import cloneElement from '../../../utils/cloneElement';

type ValidationProps = {
	element: FormElement;
	setElement: (value: React.SetStateAction<FormElement>) => void;
};

function Validation({ element, setElement }: ValidationProps) {
	return (
		<>
			{'required' in element && (
				<FormItem
					name='required'
					initialValue={element.required}
					style={{ marginBottom: '.2em' }}
				>
					<Checkbox
						checked={element.required}
						onChange={(e: CheckboxChangeEvent) =>
							setElement(prev => {
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
							setElement(prev => {
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

			{'minLength' in element.attributes && (
				<FormItem
					label='Min Length'
					name='minLength'
					initialValue={element.attributes.minLength}
					rules={[{ required: true, message: 'Mini length is required' }]}
				>
					<Number
						value={element.attributes.minLength}
						onChange={value =>
							setElement(prev => {
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
					<Number
						value={element.attributes.maxLength}
						onChange={value =>
							setElement(prev => {
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
					<Number
						value={element.attributes.min}
						onChange={value =>
							setElement(prev => {
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
					<Number
						value={element.attributes.max}
						onChange={value =>
							setElement(prev => {
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
					<Number
						value={element.attributes.rows}
						onChange={value =>
							setElement(prev => {
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
					<Number
						value={element.attributes.cols}
						onChange={value =>
							setElement(prev => {
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

export default Validation;
