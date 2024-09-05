import { ButtonElement, FormElement } from '../../../types/FormElements';
import cloneElement from '../../../utils/cloneElement';

import deleteIcon from '../../../assets/delete.svg';
import Text from '../../../general_components/text';
import { Col, Row, Typography } from 'antd';
import Select from '../../../general_components/select';
import Checkbox from '../../../general_components/checkbox';
import Button from '../../../general_components/button';
import FormItem from '../../../general_components/form_item';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type GeneralProps = {
	element: FormElement;
	setElement: (value: React.SetStateAction<FormElement>) => void;
	resetFields: () => void;
};

function General({ element, setElement, resetFields }: GeneralProps) {
	return (
		<>
			{'type' in element.attributes && element.elementType === 'button' && (
				<FormItem
					label='Button type'
					name='buttonType'
					initialValue={element.attributes.type}
				>
					<Select
						value={element.attributes.type}
						onChange={(value: ButtonElement['attributes']['type']) =>
							setElement(prev => {
								const temp = cloneElement(prev);
								if ('type' in temp.attributes) temp.attributes.type = value;
								return temp;
							})
						}
						options={[
							{
								value: 'submit',
								text: 'Submit',
							},
							{
								value: 'button',
								text: 'Button',
							},
							{
								value: 'reset',
								text: 'Reset',
							},
						]}
					/>
				</FormItem>
			)}

			{'label' in element && (
				<FormItem
					label='Label'
					name='label'
					initialValue={element.label}
				>
					<Text
						className='test'
						value={element.label}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setElement(prev => {
								const temp = cloneElement(prev);
								if ('label' in temp) temp.label = e.target.value;
								return temp;
							})
						}
					/>
				</FormItem>
			)}

			{'labelPosition' in element && (
				<FormItem
					label='Label position'
					name='labelPosition'
					initialValue={element.labelPosition}
				>
					<Select
						value={element.labelPosition}
						onChange={(value: 'top' | 'left') =>
							setElement(prev => {
								const temp = cloneElement(prev);
								if ('labelPosition' in temp) temp.labelPosition = value;
								return temp;
							})
						}
						options={[
							{
								value: 'top',
								text: 'Top',
							},
							{
								value: 'left',
								text: 'Left',
							},
						]}
					/>
				</FormItem>
			)}

			{'id' in element.attributes && (
				<FormItem
					label='ID'
					name='id'
					initialValue={element.attributes.id}
				>
					<Text
						value={element.attributes.id}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setElement(prev => {
								const temp = cloneElement(prev);
								if ('id' in temp.attributes) temp.attributes.id = e.target.value;
								return temp;
							})
						}
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
					<Text
						value={element.attributes.name}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setElement(prev => {
								const temp = cloneElement(prev);
								if ('name' in temp.attributes) temp.attributes.name = e.target.value;
								return temp;
							})
						}
					/>
				</FormItem>
			)}

			{'placeholder' in element.attributes && (
				<FormItem
					label='Placeholder'
					name='placeholder'
					initialValue={element.attributes.placeholder}
				>
					<Text
						value={element.attributes.placeholder}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setElement(prev => {
								const temp = cloneElement(prev);
								if ('placeholder' in temp.attributes) temp.attributes.placeholder = e.target.value;
								return temp;
							})
						}
					/>
				</FormItem>
			)}

			{'readOnly' in element.attributes && (
				<FormItem
					name='readOnly'
					initialValue={element.attributes.readOnly}
					style={{ marginBottom: '.2em' }}
				>
					<Checkbox
						checked={element.attributes.readOnly}
						onChange={(e: CheckboxChangeEvent) =>
							setElement(prev => {
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
				<FormItem
					name='disabled'
					initialValue={element.attributes.disabled}
					style={{ marginBottom: '.2em' }}
				>
					<Checkbox
						checked={element.attributes.disabled}
						onChange={(e: CheckboxChangeEvent) =>
							setElement(prev => {
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

			{'multiple' in element.attributes && (
				<FormItem
					name='multiple'
					initialValue={element.attributes.multiple}
					style={{ marginBottom: '.2em' }}
				>
					<Checkbox
						checked={element.attributes.multiple}
						onChange={e =>
							setElement(prev => {
								const temp = cloneElement(prev);
								if (temp.elementType === 'select') {
									temp.attributes.multiple = e.target.checked;
									if (e.target.checked === false)
										temp.options = temp.options.map(op => ({ ...op, selected: false }));
								}
								return temp;
							})
						}
					>
						Multiple
					</Checkbox>
				</FormItem>
			)}

			{'options' in element && (
				<div className='element-editor__options'>
					{Array.from({ length: element.options.length }).map((_, i) => (
						<Row
							gutter={16}
							key={i}
							wrap={true}
						>
							<Col flex='auto'>
								<FormItem
									label='Label'
									name={`label${i}`}
									rules={[{ required: true, message: 'Label is required' }]}
									initialValue={element.options[i].label}
								>
									<Text
										value={element.options[i].label}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setElement(prev => {
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
									<Text
										value={element.options[i].value}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setElement(prev => {
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
										onClick={e => {
											e.preventDefault();
											setElement(prev => {
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
									setElement(prev => {
										const temp = cloneElement(prev);
										if (temp.elementType === 'select') {
											temp.options.push({
												label: '',
												value: '',
												selected: false,
												disabled: false,
											});
										} else if (temp.elementType === 'checkbox') {
											temp.options.push({
												label: '',
												value: '',
												checked: false,
												disabled: false,
											});
										} else if (temp.elementType === 'radio') {
											temp.options.push({
												label: '',
												value: '',
												checked: false,
												disabled: false,
											});
										}

										return temp;
									})
								}
							>
								add option
							</Button>
							{element.options.length === 0 && (
								<Typography.Text
									type='danger'
									style={{ display: 'block', marginTop: '8px' }}
								>
									Please add atleast one option.
								</Typography.Text>
							)}
						</FormItem>
					)}
				</div>
			)}
		</>
	);
}

export default General;
