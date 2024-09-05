import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import StyledBuilder from '../styles/StyledBuilder';

import formElements from '../templates/formElements';
import { FormElement } from '../types/FormElements';
import { BuilerProps, DragElement, ElementEditor } from '../types/Builder';

import { Form, Modal } from 'antd';
import ElementEditorModal from './element_editor_modal/ElementEditorModal';

import extractIndexAndElement from '../utils/extractIndexAndElement';
import generateFormHtml from '../utils/generateFormHtml';

function Builder(props: BuilerProps) {
	const [formData, setFormData] = useState<FormElement[]>([]);

	const [dragElement, setDragElement] = useState<DragElement>(null);
	const dropZoneRef = useRef<HTMLDivElement>(null);

	const [elementEditor, setElementEditor] = useState<ElementEditor>({ show: false, element: null });
	const [form] = Form.useForm();

	useEffect(() => {
		if (props.formData && Array.isArray(props.formData)) setFormData(props.formData);
	}, [props.formData]);

	useEffect(() => {
		if (formData.length === 0) dropZoneRef.current?.classList.add('empty');
		else dropZoneRef.current?.classList.remove('empty');
	}, [formData]);

	const handleDragStart = (elementType: FormElement['elementType'], uid: string, isWidget: boolean = false) => {
		if (isWidget) setDragElement({ isWidget, elementType });
		else setDragElement({ isWidget, uid });
	};

	const handleDragEnd = () => setDragElement(null);

	const handleDragOverContainer = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

	const handleDragOverElement = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
		e.preventDefault();

		if (!(e.target instanceof HTMLElement)) return;
		if (!dragElement || dragElement.isWidget) return;
		if (e.currentTarget.id === dragElement.uid) return;

		const { top } = e.target.getBoundingClientRect();
		const { clientY } = e;
		const { clientHeight } = e.target;

		const verticalCenter = top + clientHeight / 2;
		const distanceFromCenter = verticalCenter - clientY;

		const result = extractIndexAndElement(dragElement.uid, formData);
		if (!result) return;

		const { element, index, filteredData } = result;

		if (index + 1 === dropIndex && distanceFromCenter >= 0) return;
		if (index - 1 === dropIndex && distanceFromCenter <= 0) return;

		filteredData.splice(dropIndex, 0, element);
		setFormData([...filteredData]);
	};

	const handleOnDrop = () => {
		if (!dragElement) return;
		if (!dragElement.isWidget) return;

		const element = formElements.find(fe => fe.elementType === dragElement.elementType);
		if (!element) return;

		setElementEditor({ show: true, element: JSON.parse(JSON.stringify(element)) });
	};

	const addElement = (formElement: FormElement) => setFormData(prev => [...prev, { ...formElement, uid: nanoid() }]);

	const updateElement = (formElement: FormElement) =>
		setFormData(prev => prev.map(fe => (fe.uid === formElement.uid ? formElement : fe)));

	const handleElementEditorSubmit = (element: FormElement) => {
		if (element.uid === '') addElement(element);
		else updateElement(element);

		setElementEditor({ show: false, element: null });
	};

	const remove = (uid: string) => setFormData(prev => prev.filter(fe => fe.uid !== uid));

	return (
		<StyledBuilder>
			<div className='sidebar'>
				<h2 className='sidebar__title'>Form Elements</h2>
				{formElements.map(({ elementType, uid }, i) => (
					<div
						className='sidebar__item'
						key={i}
						draggable
						onDragStart={() => handleDragStart(elementType, uid, true)}
						onDragEnd={handleDragEnd}
					>
						{elementType}
					</div>
				))}
			</div>
			<div className='form-editor'>
				<div
					ref={dropZoneRef}
					className='form-editor__dropzone'
					onDragOver={handleDragOverContainer}
					onDrop={handleOnDrop}
				>
					<Form
						form={form}
						name='builder-form'
						layout='vertical'
						autoComplete='off'
					>
						{formData.map((formElement, index) =>
							generateFormHtml({
								mode: 'Builder',
								formData,
								formElement,
								index,
								onEditElement: (element: FormElement) =>
									setElementEditor({ show: true, element: JSON.parse(JSON.stringify(element)) }),
								onRemove: (uid: string) => remove(uid),
								isDragging: dragElement
									? !dragElement.isWidget && dragElement.uid === formElement.uid
									: false,
								onDragStart: handleDragStart,
								onDragOver: handleDragOverElement,
								onDragEnd: handleDragEnd,
							})
						)}
					</Form>
				</div>
				<div className='form-editor__btn-wrapper'>
					<button
						className='form-editor__btn-save'
						onClick={() => props.onSave(formData)}
					>
						save
					</button>
				</div>
			</div>
			<Modal
				title={
					elementEditor.element &&
					`${elementEditor.element.elementType[0].toUpperCase()}${elementEditor.element.elementType.slice(
						1
					)} Component`
				}
				open={elementEditor.show}
				footer={null}
				onCancel={() => setElementEditor({ show: false, element: null })}
				styles={{
					body: {
						maxHeight: '500px',
						overflowY: 'auto',
						overflowX: 'hidden',
					},
				}}
			>
				{elementEditor.element && (
					<ElementEditorModal
						show={elementEditor.show}
						element={elementEditor.element}
						onSubmit={handleElementEditorSubmit}
						onCancel={() => setElementEditor({ show: false, element: null })}
					/>
				)}
			</Modal>
		</StyledBuilder>
	);
}

export default Builder;
