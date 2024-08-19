import { ReactElement, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import formElements, { FormElement } from '../formElements/formElements';
import GlobalStyle from '../styles/GlobalStyle';
import StyledBuilder from '../styles/StyledBuilder';
import StyledFormElementWrapper from '../styles/StyledFormElementWrapper';

import editIcon from '../assets/edit.svg';
import paletteIcon from '../assets/palette.svg';
import deleteIcon from '../assets/delete.svg';
import { rootPid } from '../constants/forms';

function findIndexByUid(formElements: FormElement[], uid: string) {
	for (let i = 0; i < formElements.length; i++) {
		const element = formElements[i];
		if (element.uid === uid) {
			return { index: i, element };
		}
		// if (element.children) {
		//     const nestedElement = findIndexByUid(element.children, uid);
		//     if (nestedElement) {
		//         return { index: i, nestedElement };
		//     }
		// }
	}
	return null;
}

function Builder() {
	const [formData, setFormData] = useState<FormElement[]>([]);
	const [dragElement, setDragElement] = useState<{
		elementType: FormElement['elementType'];
		uid: string;
		isWidget: boolean;
	} | null>(null);
	const dropZoneRef = useRef<HTMLDivElement>(null);
	// const formElementEditorRef = useRef<HTMLDivElement>(null);
	// const [formElementEditor, setFormElementEditor] = useState<{ show: boolean; formElement: FormElement | null }>({
	//     show: false,
	//     formElement: null
	// });
	const [styleEditor, setStyleEditor] = useState<{ show: boolean; uid: string | null; customStyles: string }>({
		show: false,
		uid: null,
		customStyles: ``,
	});

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		elementType: FormElement['elementType'],
		uid: string,
		isWidget: boolean = false
	) => {
		e.stopPropagation();
		setDragElement({ elementType, uid, isWidget });
	};
	const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setDragElement(null);
	};

	const handleDragOverContainer = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

	// const handleDragOverElement = (e: React.DragEvent<HTMLDivElement>, pid: string, uid: string, dropIndex: number) => {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// 	if (e.target instanceof HTMLElement) {
	// 		if (e.currentTarget.id === dragElement?.uid) return;
	// 		const { top } = e.target.getBoundingClientRect();
	// 		const { clientY } = e;
	// 		const { clientHeight } = e.target;

	// 		const verticalCenter = top + clientHeight / 2;
	// 		const distanceFromCenter = verticalCenter - clientY;

	// 		if (dragElement === null) return;
	// 		const currentElement = findIndexByUid(formData, dragElement.uid);

	// 		if (currentElement === null) return;

	// 		if (currentElement.index + 1 === dropIndex && distanceFromCenter >= 0) return;
	// 		if (currentElement.index - 1 === dropIndex && distanceFromCenter <= 0) return;
	// 		const tempFormData = formData.filter(fe => fe.uid !== dragElement.uid);

	// 		const targetElement = findIndexByUid(formData, uid);
	// 		if (targetElement === null) return;
	// 		tempFormData.splice(targetElement.index, 0, currentElement.element);
	// 		setFormData([...tempFormData]);
	// 	}
	// };

	const handleOnDrop = (dropZoneId: string) => {
		if (!dragElement) return;
		if (!dragElement.isWidget) return;

		if (dropZoneId === rootPid) {
			const formElement = formElements.find(fe => fe.elementType === dragElement.elementType);
			if (!formElement) return;
			setFormData(prev => [...prev, { ...formElement, uid: nanoid(), pid: rootPid }]);
		} else if (dragElement.elementType === 'container') {
			const formElement = formElements.find(fe => fe.elementType === dragElement.elementType);
			if (!formElement) return;
			setFormData(prev => [...prev, { ...formElement, uid: nanoid(), pid: rootPid }]);
		} else {
			const formElement = formElements.find(fe => fe.elementType === dragElement.elementType);
			if (!formElement) return;
			setFormData(prev =>
				prev.map(fe =>
					fe.uid === dropZoneId && fe.elementType === 'container'
						? { ...fe, children: [...fe.children, { ...formElement, uid: nanoid(), pid: fe.uid }] }
						: fe
				)
			);
		}
	};

	const startEdit = (uid: string) => {
		console.log(uid);
	};

	const remove = (pid: string, uid: string) => {
		if (pid === rootPid) setFormData(prev => prev.filter(fe => fe.uid !== uid));
		else
			setFormData(prev => {
				const temp: FormElement[] = JSON.parse(JSON.stringify(prev));
				return temp.map(fe =>
					fe.elementType === 'container' && fe.uid === pid
						? { ...fe, children: fe.children.filter(nfe => nfe.uid !== uid) }
						: fe
				);
			});
	};

	const FormElementWrapper: React.FC<{
		children: React.ReactNode;
		elementType: FormElement['elementType'];
		pid: string;
		uid: string;
		customStyles: string;
		index: number;
	}> = ({ children, elementType, pid, uid, customStyles }) => {
		return (
			<>
				<div className='form-element__modify-options'>
					{elementType !== 'container' && (
						<button onClick={() => startEdit(uid)}>
							<img
								src={editIcon}
								alt='edit icon'
							/>
						</button>
					)}
					<button onClick={() => setStyleEditor(() => ({ show: true, uid, customStyles }))}>
						<img
							src={paletteIcon}
							alt='palette icon'
						/>
					</button>
					<button onClick={() => remove(pid, uid)}>
						<img
							src={deleteIcon}
							alt='delete icon'
						/>
					</button>
				</div>
				<StyledFormElementWrapper $customstyles={customStyles}>{children}</StyledFormElementWrapper>
			</>
		);
	};

	const generateFormHtml = (formElement: FormElement, index: number) => {
		let formElementHtml: ReactElement;
		const { elementType, pid, uid, customStyles } = formElement;

		if (
			elementType === 'name' ||
			elementType === 'email' ||
			elementType === 'phone number' ||
			elementType === 'text' ||
			elementType === 'number' ||
			elementType === 'date' ||
			elementType === 'time' ||
			elementType === 'hidden'
		) {
			const { attributes } = formElement;
			formElementHtml = (
				<FormElementWrapper
					elementType={elementType}
					pid={pid}
					uid={uid}
					customStyles={customStyles}
					index={index}
				>
					{elementType !== 'hidden'
						? formElement.label && <label htmlFor={attributes.id}>{formElement.label}</label>
						: 'Hidden input element'}
					<input {...attributes} />
				</FormElementWrapper>
			);
		} else if (elementType === 'container') {
			const { children } = formElement;
			formElementHtml = (
				<FormElementWrapper
					elementType={elementType}
					pid={pid}
					uid={uid}
					customStyles={customStyles}
					index={index}
				>
					{children.map((fe, i) => generateFormHtml(fe, i))}
				</FormElementWrapper>
			);
		} else if (elementType === 'button') {
			const { text, ...rest } = formElement.attributes;
			formElementHtml = (
				<FormElementWrapper
					elementType={elementType}
					pid={pid}
					uid={uid}
					customStyles={customStyles}
					index={index}
				>
					<button {...rest}>{text}</button>
				</FormElementWrapper>
			);
		} else if (elementType === 'textarea') {
			const { label, attributes } = formElement;
			formElementHtml = (
				<FormElementWrapper
					elementType={elementType}
					pid={pid}
					uid={uid}
					customStyles={customStyles}
					index={index}
				>
					{label && <label htmlFor={attributes.id}>{label}</label>}
					<textarea {...attributes}></textarea>
				</FormElementWrapper>
			);
		} else if (elementType === 'select') {
			const { label, attributes, optionsCount, options } = formElement;
			formElementHtml = (
				<FormElementWrapper
					elementType={elementType}
					pid={pid}
					uid={uid}
					customStyles={customStyles}
					index={index}
				>
					{label && <label htmlFor={attributes.id}>{label}</label>}
					<select {...attributes}>
						<option>select an option</option>
						{Array.from({ length: optionsCount }).map((_, i) => (
							<option
								key={i}
								value={options.value[i]}
								disabled={options.disabled[i]}
							>
								{options.text[i]}
							</option>
						))}
					</select>
				</FormElementWrapper>
			);
		} else if (elementType === 'checkbox') {
			const { label, attributes, optionsCount, options } = formElement;
			formElementHtml = (
				<FormElementWrapper
					elementType={elementType}
					pid={pid}
					uid={uid}
					customStyles={customStyles}
					index={index}
				>
					<span>{label}</span>
					{Array.from({ length: optionsCount }).map((_, i) => (
						<div key={i}>
							<input
								{...attributes}
								id={options.id[i]}
								name={options.name[i]}
								checked={options.checked[i]}
								disabled={options.disabled[i]}
							/>
							{options.label[i] && <label htmlFor={options.id[i]}>{options.label[i]}</label>}
						</div>
					))}
				</FormElementWrapper>
			);
		} else if (elementType === 'radio') {
			const { label, attributes, optionsCount, options } = formElement;
			formElementHtml = (
				<FormElementWrapper
					elementType={elementType}
					pid={pid}
					uid={uid}
					customStyles={customStyles}
					index={index}
				>
					<span>{label}</span>
					{Array.from({ length: optionsCount }).map((_, i) => (
						<div key={i}>
							<input
								{...attributes}
								id={options.id[i]}
								checked={options.checked[i]}
								disabled={options.disabled[i]}
							/>
							{options.label[i] && <label htmlFor={options.id[i]}>{options.label[i]}</label>}
						</div>
					))}
				</FormElementWrapper>
			);
		} else {
			formElementHtml = <></>;
		}

		const isDragging = dragElement?.uid === uid;
		const isContainer = elementType === 'container';
		return (
			<div
				key={index}
				className={`form-element ${isDragging && 'is-dragging'} ${isContainer && 'form-element--container'}`}
				id={uid}
				// draggable
				// onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, elementType, uid)}
				// onDragOver={(e: React.DragEvent<HTMLDivElement>) => handleDragOverElement(e, pid, uid, index)}
				// onDragEnd={handleDragEnd}
				onDrop={(e: React.DragEvent<HTMLDivElement>) => {
					e.stopPropagation();
					if (elementType === 'container') handleOnDrop(uid);
					else if (formElement.pid !== rootPid) handleOnDrop(formElement.pid);
					else handleOnDrop(rootPid);
				}}
			>
				{formElementHtml}
			</div>
		);
	};

	const updateStyle = () => {
		const { uid, customStyles } = styleEditor;
		setFormData(prev => prev.map(fe => (fe.uid === uid ? { ...fe, customStyles } : fe)));
	};
	return (
		<>
			<GlobalStyle />
			<StyledBuilder>
				<div className='sidebar'>
					{formElements.map(({ elementType, uid }, i) => (
						<div
							className='sidebar-item'
							key={i}
							draggable
							onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
								handleDragStart(e, elementType, uid, true)
							}
							onDragEnd={handleDragEnd}
						>
							{elementType}
						</div>
					))}
				</div>
				<div className='form-editor'>
					<div
						ref={dropZoneRef}
						className='form-editor__droppoint'
						onDragOver={handleDragOverContainer}
						onDrop={() => handleOnDrop(rootPid)}
					>
						{formData.map((fe, i) => generateFormHtml(fe, i))}
					</div>
					<div className='form-editor__btn-wrapper'>
						<button className='form-editor__btn-save'>save</button>
					</div>
				</div>
				{styleEditor.show && (
					<div className='style-editor'>
						<h2 className='style-editor__title'>Styles</h2>
						<form
							onSubmit={e => {
								e.preventDefault();
								updateStyle();
							}}
						>
							<textarea
								className='style-editor__editor'
								value={styleEditor.customStyles}
								onChange={e => setStyleEditor(prev => ({ ...prev, customStyles: e.target.value }))}
							></textarea>
							<div className='style-editor__btn-wrapper'>
								<button
									type='button'
									className='style-editor__btn-cancel'
									onClick={() =>
										setStyleEditor(prev => ({
											...prev,
											show: false,
											uid: null,
											customStyles: ``,
										}))
									}
								>
									cancel
								</button>
								<button
									type='submit'
									className='style-editor__btn-save'
								>
									save
								</button>
							</div>
						</form>
					</div>
				)}
				<div className='element-editor'> </div>
			</StyledBuilder>
		</>
	);
}

export default Builder;
