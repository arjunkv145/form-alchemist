import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import formElements, { FormElement } from '../formElements/formElements';
import GlobalStyle from '../styles/GlobalStyle';
import StyledBuilder from '../styles/StyledBuilder';
import StyledFormElementWrapper from '../styles/StyledFormElementWrapper';

import editIcon from '../assets/edit.svg';
import paletteIcon from '../assets/palette.svg';
import deleteIcon from '../assets/delete.svg';

const rootPid = 'root';
// const optionsLimit = 10;

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

    const dropZoneRef = useRef<HTMLDivElement>(null);
    // const formElementEditorRef = useRef<HTMLDivElement>(null);
    // const [formElementEditor, setFormElementEditor] = useState<{ show: boolean; formElement: FormElement | null }>({
    //     show: false,
    //     formElement: null
    // });
    const [styleEditor, setStyleEditor] = useState<{ show: boolean; uid: string | null; customStyles: string }>({
        show: false,
        uid: null,
        customStyles: ``
    });

    const handleDragOverContainer = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    // const handleDragOverElement = (e: React.DragEvent<HTMLDivElement>, uid: string, dropIndex: number) => {
    //     e.preventDefault();
    //     if (e.target instanceof HTMLElement) {
    //         if (e.currentTarget.id === currentDragElement?.uid) return;
    //         const { top } = e.target.getBoundingClientRect();
    //         const { clientY } = e;
    //         const { clientHeight } = e.target;

    //         const verticalCenter = top + clientHeight / 2;
    //         const distanceFromCenter = verticalCenter - clientY;

    //         if (currentDragElement === null) return;
    //         const currentElement = findIndexByUid(formData, currentDragElement.uid);

    //         if (currentElement === null) {
    //             console.log(distanceFromCenter);
    //             return;
    //         }

    //         if (currentElement.index + 1 === dropIndex && distanceFromCenter >= 0) return;
    //         if (currentElement.index - 1 === dropIndex && distanceFromCenter <= 0) return;
    //         const tempFormData = formData.filter((fe) => fe.uid !== currentDragElement.uid);

    //         const targetElement = findIndexByUid(formData, uid);
    //         if (targetElement === null) return;
    //         tempFormData.splice(targetElement.index, 0, currentElement.element);
    //         setFormData([...tempFormData]);
    //     }
    // };

    const startEdit = (uid: string) => {
        console.log(uid);
    };

    const remove = (uid: string) => setFormData((prev) => prev.filter((fe) => fe.uid !== uid));

    const FormElementWrapper: React.FC<{
        children: React.ReactNode;
        elementType: string;
        uid: string;
        customStyles: string;
        index: number;
    }> = ({ children, uid, customStyles }) => {
        return (
            <>
                <div className='form-element__modify-options'>
                    <button onClick={() => startEdit(uid)}>
                        <img src={editIcon} alt='edit icon' />
                    </button>
                    <button onClick={() => setStyleEditor(() => ({ show: true, uid, customStyles }))}>
                        <img src={paletteIcon} alt='palette icon' />
                    </button>
                    <button onClick={() => remove(uid)}>
                        <img src={deleteIcon} alt='delete icon' />
                    </button>
                </div>
                <StyledFormElementWrapper $customstyles={customStyles}>{children}</StyledFormElementWrapper>
            </>
        );
    };

    const generateFormHtml = (formElement: FormElement, uid: string, index: number) => {
        let formElementHtml: ReactElement;
        const { elementType, customStyles, attributes } = formElement;

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
            formElementHtml = (
                <FormElementWrapper elementType={elementType} uid={uid} customStyles={customStyles} index={index}>
                    {elementType !== 'hidden'
                        ? formElement.label && <label htmlFor={attributes.id}>{formElement.label}</label>
                        : 'Hidden input element'}
                    <input {...attributes} />
                </FormElementWrapper>
            );
        } else if (elementType === 'button') {
            const { text, ...rest } = attributes;
            formElementHtml = (
                <FormElementWrapper elementType={elementType} uid={uid} customStyles={customStyles} index={index}>
                    <button {...rest}>{text}</button>
                </FormElementWrapper>
            );
        } else if (elementType === 'textarea') {
            const { label } = formElement;
            formElementHtml = (
                <FormElementWrapper elementType={elementType} uid={uid} customStyles={customStyles} index={index}>
                    {label && <label htmlFor={attributes.id}>{label}</label>}
                    <textarea {...attributes}></textarea>
                </FormElementWrapper>
            );
        } else if (elementType === 'select') {
            const { label, optionsCount, options } = formElement;
            formElementHtml = (
                <FormElementWrapper elementType={elementType} uid={uid} customStyles={customStyles} index={index}>
                    {label && <label htmlFor={attributes.id}>{label}</label>}
                    <select {...attributes}>
                        <option>select an option</option>
                        {Array.from({ length: optionsCount }).map((_, i) => (
                            <option key={i} value={options.value[i]} disabled={options.disabled[i]}>
                                {options.text[i]}
                            </option>
                        ))}
                    </select>
                </FormElementWrapper>
            );
        } else if (elementType === 'checkbox') {
            const { label, optionsCount, options } = formElement;
            formElementHtml = (
                <FormElementWrapper elementType={elementType} uid={uid} customStyles={customStyles} index={index}>
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
            const { label, optionsCount, options } = formElement;
            formElementHtml = (
                <FormElementWrapper elementType={elementType} uid={uid} customStyles={customStyles} index={index}>
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
        return (
            <div
                key={index}
                // className={`form-element ${dragElement?.uid === uid && ' is-dragging'}`}
                id={uid}
                draggable
                // onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, elementType, uid)}
                // onDragOver={(e: React.DragEvent<HTMLDivElement>) => handleDragOverElement(e, uid, index)}
                // onDragEnd={handleDragEnd}
            >
                {formElementHtml}
            </div>
        );
    };

    const updateStyle = () => {
        const { uid, customStyles } = styleEditor;
        setFormData((prev) => prev.map((fe) => (fe.uid === uid ? { ...fe, customStyles } : fe)));
        setStyleEditor((p) => ({ ...p, show: false, uid: null, customStyles: `` }));
    };

    function Draggable({
        children,
        elementType,
        uid,
        isWidget
    }: {
        children: ReactNode;
        elementType: FormElement['elementType'];
        uid: string;
        isWidget: boolean;
    }) {
        const [dragElement, setDragElement] = useState<{
            elementType: string;
            uid: string;
            isWidget: boolean;
        } | null>(null);

        const [isDragging, setIsDragging] = useState(false);
        const [position, setPosition] = useState({ x: 0, y: 0 });
        const [offset, setOffset] = useState({ x: 0, y: 0 });

        const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setIsDragging(true);
            setOffset({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
            setDragElement({ elementType, uid, isWidget });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setPosition({
                x: 0,
                y: 0
            });
            const dropZone = dropZoneRef.current;
            if (!dropZone) return;
            dropZone.style.backgroundColor = 'hsl(0, 0%, 95%)';
            setDragElement(null);
        };

        useEffect(() => {
            const handleDrop = () => {
                if (dragElement?.isWidget) {
                    const formElement = formElements.find((fe) => fe.elementType === dragElement?.elementType);
                    if (formElement) setFormData((prev) => [...prev, { ...formElement, uid: nanoid(), pid: rootPid }]);
                }
            };
            const handleMouseMove = (e: MouseEvent) => {
                if (isDragging) {
                    setPosition({
                        x: e.clientX - offset.x,
                        y: e.clientY - offset.y
                    });

                    const dropZone = dropZoneRef.current;
                    if (!dropZone) return;
                    if (!(e.target instanceof HTMLDivElement)) return;

                    const { clientX, clientY } = e;
                    const dropAreaRect = dropZone.getBoundingClientRect();

                    if (
                        clientX > dropAreaRect.left &&
                        clientX < dropAreaRect.right &&
                        clientY > dropAreaRect.top &&
                        clientY < dropAreaRect.bottom
                    ) {
                        dropZone.style.backgroundColor = 'hsl(0, 0%, 85%)';
                        if (!isDragging) handleDrop();
                    } else {
                        dropZone.style.backgroundColor = 'hsl(0, 0%, 95%)';
                    }
                }
            };

            if (isDragging) document.addEventListener('mousemove', handleMouseMove);
            else document.removeEventListener('mousemove', handleMouseMove);

            return () => document.removeEventListener('mousemove', handleMouseMove);
        }, [isDragging, offset.x, offset.y, dragElement?.elementType, dragElement?.isWidget]);

        return (
            <div
                style={{
                    position: 'relative',
                    // left: position.x,
                    // top: position.y,
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    cursor: isDragging ? 'grabbing' : 'grab',
                    userSelect: 'none',
                    zIndex: isDragging ? 999 : 998
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                {children}
            </div>
        );
    }
    return (
        <>
            <GlobalStyle />
            <StyledBuilder>
                <div className='sidebar'>
                    <h2 className='sidebar__title'>FORM ELEMENTS</h2>
                    {formElements.map(({ elementType }, i) => (
                        <div className='sidebar-item' key={i}>
                            <div
                                className='sidebar-item__background'
                                // draggable
                                // onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                                //     (e.target as HTMLDivElement).style.cursor = 'move';
                                //     handleDragStart(elementType, '', true);
                                // }}
                                // onDragEnd={handleDragEnd}
                            >
                                {elementType}
                            </div>
                            <Draggable elementType={elementType} uid={''} isWidget={true}>
                                <div
                                    className='sidebar-item__draggable'
                                    // draggable
                                    // onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                                    //     (e.target as HTMLDivElement).style.cursor = 'move';
                                    //     handleDragStart(elementType, '', true);
                                    // }}
                                    // onDragEnd={handleDragEnd}
                                >
                                    {elementType}
                                </div>
                            </Draggable>
                        </div>
                    ))}
                </div>
                <div className='form-editor'>
                    <div
                        ref={dropZoneRef}
                        className='form-editor__droppoint'
                        // onDragOver={handleDragOverContainer}
                        // onDrop={handleDrop}
                        // onMouseEnter={() => {
                        //     console.log('enter');
                        // }}
                        // onDragEnter={() => console.log('ert')}
                    >
                        {/* {formData.map((fe, i) => generateFormHtml(fe, fe.uid, i))} */}
                        {formData.map((fe, i) => (
                            <div key={i}>{fe.elementType}</div>
                        ))}
                    </div>
                    <div className='form-editor__btn-wrapper'>
                        <button className='form-editor__btn-save'>save</button>
                    </div>
                </div>
                {styleEditor.show && (
                    <div className='style-editor'>
                        <h2 className='style-editor__title'>Styles</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateStyle();
                            }}
                        >
                            <textarea
                                className='style-editor__editor'
                                value={styleEditor.customStyles}
                                onChange={(e) => setStyleEditor((prev) => ({ ...prev, customStyles: e.target.value }))}
                            ></textarea>
                            <div className='style-editor__btn-wrapper'>
                                <button
                                    type='button'
                                    className='style-editor__btn-cancel'
                                    onClick={() =>
                                        setStyleEditor((prev) => ({
                                            ...prev,
                                            show: false,
                                            uid: null,
                                            customStyles: ``
                                        }))
                                    }
                                >
                                    cancel
                                </button>
                                <button type='submit' className='style-editor__btn-save'>
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
