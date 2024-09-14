import React, { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import StyledBuilder from '../styles/StyledBuilder';

import formElements from '../templates/formElements';
import { FormElement } from '../types/FormElements';
import { BuilerProps, DragElement, ElementEditor } from '../types/Builder';

import { Button, Form, Modal } from 'antd';
import ElementEditorModal from './ElementEditorModal';

import extractIndexAndElement from '../utils/extractIndexAndElement';
import GenerateFormHtml from '../utils/GenerateFormHtml';
import GlobalStyle from '../styles/GlobalStyle';

const Builder: React.FC<BuilerProps> = (props) => {
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
        if (isWidget) setDragElement({ isWidget, elementType, uid });
        else setDragElement({ isWidget, elementType, uid });
    };

    const handleDragEnd = () => setDragElement(null);

    const handleDragOverContainer = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleDragOverElement = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
        e.preventDefault();

        if (!(e.target instanceof HTMLElement)) return;
        if (!dragElement) return;
        if (dragElement.isWidget) return;
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

        const element = formElements.find((fe) => fe.elementType === dragElement.elementType);
        if (!element) return;

        setElementEditor({ show: true, element: JSON.parse(JSON.stringify(element)) });
    };

    const addElement = (formElement: FormElement) =>
        setFormData((prev) => [...prev, { ...formElement, uid: nanoid() }]);

    const updateElement = (formElement: FormElement) => {
        setFormData((prev) => prev.map((fe) => (fe.uid === formElement.uid ? formElement : fe)));
        form.resetFields();
    };

    const handleElementEditorSubmit = (element: FormElement) => {
        if (element.uid === '') addElement(element);
        else updateElement(element);

        setElementEditor({ show: false, element: null });
    };

    const remove = (uid: string) => setFormData((prev) => prev.filter((fe) => fe.uid !== uid));

    return (
        <>
            <GlobalStyle />
            <StyledBuilder>
                <div className='sidebar'>
                    <h2 className='sidebar__title'>Form Elements</h2>
                    {formElements.map(({ elementType }, i) => (
                        <div
                            className='sidebar__item'
                            key={i}
                            draggable
                            onDragStart={() => handleDragStart(elementType, '', true)}
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
                        <Form form={form} name='builder-form' layout='vertical' autoComplete='off'>
                            {formData.map((formElement, index) => (
                                <React.Fragment key={index}>
                                    <GenerateFormHtml
                                        mode='Builder'
                                        formData={formData}
                                        formElement={formElement}
                                        index={index}
                                        onEditElement={(element: FormElement) =>
                                            setElementEditor({
                                                show: true,
                                                element: JSON.parse(JSON.stringify(element))
                                            })
                                        }
                                        onRemove={(uid: string) => remove(uid)}
                                        isDragging={
                                            dragElement
                                                ? !dragElement.isWidget && dragElement.uid === formElement.uid
                                                : false
                                        }
                                        onDragStart={handleDragStart}
                                        onDragOver={handleDragOverElement}
                                        onDragEnd={handleDragEnd}
                                        dataSourceType={
                                            'dataSourceType' in formElement ? formElement.dataSourceType : null
                                        }
                                        apiOptions={'apiOptions' in formElement ? formElement.apiOptions : null}
                                    />
                                </React.Fragment>
                            ))}
                        </Form>
                    </div>
                    <div className='form-editor__btn-wrapper'>
                        <Button type='primary' htmlType='submit' onClick={() => props.onSave(formData)}>
                            save
                        </Button>
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
                            paddingRight: '.8em'
                        }
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
        </>
    );
};

export default Builder;
