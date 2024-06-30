import { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'

import editIcon from '../assets/edit.svg'
import paletteIcon from '../assets/palette.svg'
import deleteIcon from '../assets/delete.svg'

import GlobalStyle from '../styles/GlobalStyle'
import StyledBuilder from '../styles/StyledBuilder'
import StyledFormElementWrapper from '../styles/StyledFormElementWrapper'
import {
    containerStyle,
    textStyle,
    numberStyle,
    dateStyle,
    timeStyle,
    textareaStyle,
    selectStyle,
    checkboxStyle,
    radioStyle,
    buttonStyle
} from '../styles/formElementStyles'

import findIndexByUid from '../utils/findIndexByUid'

const formLayouts = ['container']

const formElements = { 
    text: ['label', 'id', 'name', 'placeholder', 'required', 'readOnly', 'disabled', 'minLength', 'maxLength'],
    number: ['label', 'id', 'name', 'placeholder', 'required', 'readOnly', 'disabled', 'min', 'max'],
    textarea: ['label', 'id', 'name', 'placeholder', 'required', 'readOnly', 'disabled', 'minLength', 'maxLength', 'rows', 'cols'],
    select: ['label', 'id', 'name', 'required', 'disabled', 'multiple', 'optionsCount', { options: ['value', 'text', 'selected', 'disabled'] }],
    checkbox: ['heading', 'required', 'optionsCount', { options: ['label', 'id', 'name', 'value', 'checked', 'disabled'] }],
    radio: ['heading', 'name', 'required', 'optionsCount', { options: ['label', 'id', 'value', 'checked', 'disabled'] }],
    date: ['label', 'id', 'name', 'required', 'readOnly', 'disabled'],
    time: ['label', 'id', 'name', 'required', 'readOnly', 'disabled'],
    button: ['buttonType', 'id', 'name', 'disabled', 'text'],
    hidden: ['id', 'name', 'value']
}

const defaultStyles = {
    container: containerStyle,
    text: textStyle,
    number: numberStyle,
    textarea: textareaStyle,
    select: selectStyle,
    checkbox: checkboxStyle,
    radio: radioStyle,
    date: dateStyle,
    time: timeStyle,
    button: buttonStyle,
    hidden: ``,
}

const mainDropPointUid = 'main'
const formElementOptionsLimit = 10 // change formElementData when changing this

const initialFormElementData = {
    type: '', // places outside attributes for ease of drag drop functionality
    buttonType: 'submit', // submit or button
    label: '',
    text: '',
    heading: '', // for radio and checkbox
    optionsCount: 0,
    customStyles: '',
    attributes: {
        id: '',
        name: '',
        value: '',
        placeholder: '',
        min: 0,
        max: 50,
        minLength: 0,
        maxLength: 100,
        rows: 5,
        cols: 40,
        required: true, // write custom validation
        readOnly: false,
        disabled: false,
        multiple: false,
    },
    select: {
        options: {
            value: [],
            text: [],
            selected: [],
            disabled: []
        }
    },
    checkbox: {
        options: {
            label: [],
            id: [],
            name: [],
            value: [],
            checked: [],
            disabled: []
        }
    },
    radio: {
        options: {
            label: [],
            id: [],
            value: [],
            checked: [],
            disabled: []
        }
    }
}

const getInitialFormElementData = () => ({
    ...initialFormElementData,
    attributes: { ...initialFormElementData.attributes },
    select: {
        options: {
            value: Array.from({ length: formElementOptionsLimit }).map(() => ''),
            text: Array.from({ length: formElementOptionsLimit }).map(() => ''),
            selected: Array.from({ length: formElementOptionsLimit }).map(() => false),
            disabled: Array.from({ length: formElementOptionsLimit }).map(() => false)
        }
    },
    checkbox: {
        options: {
            label: Array.from({ length: formElementOptionsLimit }).map(() => ''),
            id: Array.from({ length: formElementOptionsLimit }).map(() => ''),
            name: Array.from({ length: formElementOptionsLimit }).map(() => ''),
            value: Array.from({ length: formElementOptionsLimit }).map(() => ''),
            checked: Array.from({ length: formElementOptionsLimit }).map(() => false),
            disabled: Array.from({ length: formElementOptionsLimit }).map(() => false)
        }
    },
    radio: {
        options: {
            label: Array.from({ length: formElementOptionsLimit }).map(() => ''),
            id: Array.from({ length: formElementOptionsLimit }).map(() => ''),
            value: Array.from({ length: formElementOptionsLimit }).map(() => ''),
            checked: Array.from({ length: formElementOptionsLimit }).map(() => false),
            disabled: Array.from({ length: formElementOptionsLimit }).map(() => false)
        }
    }
})

function Builder({ build = () => {} }) {
    if (typeof build !== 'function') {
        throw new Error('The "build" prop must be a function.');
    }

    const [formData, setFormData] = useState([])
    const dropPointRef = useRef(null)
    const elementEditorRef = useRef(null)
    const [elementEditor, setElementEditor] = useState({
        show: false,
        element: { type: null, dropPointUid: null, uid: null },
        type: null // add or edit
    })
    const [styleEditor, setStyleEditor] = useState({
        show: false,
        uid: null,
        customStyles: ``
    })

    const [formElementData, setFormElementData] = useState(() => getInitialFormElementData())

    const handleOnDragStart = (e, type, uid= null, initialDrop= true) => e.dataTransfer.setData('formField', JSON.stringify({ type, uid, initialDrop }))
    const handleOnDragOver = e => e.preventDefault()
    const handleOnDragEnter = () => dropPointRef.current.classList.add('border-color')
    const handleOnDragLeave = () => dropPointRef.current.classList.remove('border-color')
    const handleOnDrop = (e, dropPointUid=mainDropPointUid) => {
        const { type, uid, initialDrop } = JSON.parse(e.dataTransfer.getData('formField'))
        dropPointRef.current.classList.remove('border-color')

        if (initialDrop) {
            if (type === 'container') {
                setFormData(prev => [
                    ...prev,
                    {
                        type,
                        uid: nanoid(),
                        parentContainerUid: mainDropPointUid,
                        customStyles: defaultStyles[type],
                        children: []
                    }
                ])
            } else {
                setFormElementData(() => getInitialFormElementData())
                setElementEditor(prev => ({ ...prev, show: true, element: { type, dropPointUid, uid: null }, type: 'add'}))
            }
        } else {
            if (dropPointUid === mainDropPointUid) {
                const { index, nestedElement } = findIndexByUid(formData, uid)
                if (nestedElement) {
                    setFormData(prev => {
                        const newState = prev.map(
                            (formElement, i) => (i === index) ?
                            ({
                                ...formElement,
                                children: formElement.children.filter((_, i) => nestedElement.index !== i)
                            }) :
                            formElement
                        )
                        return [ ...newState, { ...nestedElement.element, parentContainerUid: mainDropPointUid } ]
                    })
                }
            } else {
                const { index, element, nestedElement } = findIndexByUid(formData, uid)
                if (dropPointUid !== nestedElement?.element?.parentContainerUid) {
                    if (element) {
                        setFormData(prev => {
                            const newState = prev.map(
                                formElement => formElement.uid === dropPointUid ? 
                                ({ 
                                    ...formElement, 
                                    children: [
                                        ...formElement.children, 
                                        { ...element, parentContainerUid: formElement.uid }
                                    ] 
                                }) : 
                                formElement
                            )
                            return newState.filter((_, i) => index !== i)
                        })
                    } else {
                        setFormData(prev => {
                            const newState = prev.map(
                                formElement => formElement.uid === dropPointUid ? 
                                ({ 
                                    ...formElement, 
                                    children: [
                                        ...formElement.children, 
                                        { ...nestedElement.element, parentContainerUid: formElement.uid }
                                    ] 
                                }) : 
                                formElement
                            )
                            return newState.map(
                                (formElement, i) => i === index ? 
                                ({
                                     ...formElement, 
                                     children: formElement.children.filter((_, i) => nestedElement.index !== i) 
                                }) : 
                                formElement
                            )
                        })
                    }
                }
            }
        }
    }

    const drop = ({ type, dropPointUid }) => {
        const attrList = formElements[type]
        const filteredData = {}
        filteredData.attributes = Object.keys(formElementData.attributes).filter(attr => attrList.includes(attr)).reduce((data, attr) => {
            data[attr] = formElementData.attributes[attr]
            return data
        }, {})
        filteredData.type = type
        filteredData.customStyles = defaultStyles[type]
        if (type === 'button') {
            filteredData.buttonType = formElementData.buttonType
        }
        if (formElements[type].includes('label')) {
            filteredData.label = formElementData.label
        }
        if (formElements[type].includes('text')) {
            filteredData.text = formElementData.text
        }
        if (formElements[type].includes('heading')) {
            filteredData.heading = formElementData.heading
        }
        if (['select', 'checkbox', 'radio'].includes(type)) {
            filteredData.options = formElementData[type].options
            filteredData.optionsCount = formElementData.optionsCount
        }
        if (dropPointUid === mainDropPointUid) {
            setFormData(prev => ([
                ...prev,
                {
                    uid: nanoid(),
                    parentContainerUid: mainDropPointUid,
                    ...filteredData
                }
            ]))
        } else {
            setFormData(prev => prev.map(
                formElement => formElement.uid === dropPointUid ?
                ({
                    ...formElement,
                    children: [
                        ...formElement.children,
                        {
                            uid: nanoid(),
                            parentContainerUid: formElement.uid,
                            ...filteredData
                        }
                    ]
                }) :
                formElement
            ))
        }
    }

    const generateFormHtml = (formElement, i) => {
        let formElementHtml = ''
        const { uid, parentContainerUid, type, buttonType, label, text, heading, optionsCount, customStyles, options, ...rest } = formElement
        const attributes = rest?.attributes
        const id = attributes?.id

        if (type === 'text' || type === 'number' || type === 'date' || type === 'time' || type === 'hidden') {
            formElementHtml = (
                <div
                    className={`form-element${type === 'hidden' ? ' hidden-input' : ''}`}
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <div className='form-element__modify-options'>
                        <button onClick={() => startEdit(uid, type)}>
                            <img src={editIcon} alt='edit icon'/>
                        </button>
                        <button onClick={() => setStyleEditor(p => ({ ...p, show: true, uid, customStyles }))}>
                            <img src={paletteIcon} alt='palette icon'/>
                        </button>
                        <button onClick={() => remove(uid, parentContainerUid)}>
                            <img src={deleteIcon} alt='delete icon'/>
                        </button>
                    </div>
                    {type === 'hidden' ? ' Hidden input element' : ''}
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        { label && <label htmlFor={id}>{label}</label> }
                        <input {...attributes} type={type} id={id} />
                    </StyledFormElementWrapper>
                </div>
            )
        } else if (type === 'container') {
            formElementHtml = (
                <div
                    className='form-element form-element--container'
                    onDrop={e => {
                        e.stopPropagation()
                        handleOnDrop(e, uid)
                    }}
                    onDragOver={handleOnDragOver}
                >
                    <div className='form-element__modify-options'>
                        <button onClick={() => setStyleEditor(p => ({ ...p, show: true, uid, customStyles }))}>
                            <img src={paletteIcon} alt='palette icon'/>
                        </button>
                        <button onClick={() => remove(uid, parentContainerUid)}>
                            <img src={deleteIcon} alt='delete icon'/>
                        </button>
                    </div>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        {
                            formElement.children.map(generateFormHtml)
                        }
                    </StyledFormElementWrapper>
                </div>
            )
        } else if (type === 'button') {
            formElementHtml = (
                <div
                    className='form-element'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <div className='form-element__modify-options'>
                        <button onClick={() => startEdit(uid, type)}>
                            <img src={editIcon} alt='edit icon'/>
                        </button>
                        <button onClick={() => setStyleEditor(p => ({ ...p, show: true, uid, customStyles }))}>
                            <img src={paletteIcon} alt='palette icon'/>
                        </button>
                        <button onClick={() => remove(uid, parentContainerUid)}>
                            <img src={deleteIcon} alt='delete icon'/>
                        </button>
                    </div>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        <button
                            type={buttonType}
                            {...attributes}
                        >
                            {text}
                        </button>
                    </StyledFormElementWrapper>
                </div>
            )
        } else if (type === 'textarea') {
            formElementHtml = (
                <div
                    className='form-element'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <div className='form-element__modify-options'>
                        <button onClick={() => startEdit(uid, type)}>
                            <img src={editIcon} alt='edit icon'/>
                        </button>
                        <button onClick={() => setStyleEditor(p => ({ ...p, show: true, uid, customStyles }))}>
                            <img src={paletteIcon} alt='palette icon'/>
                        </button>
                        <button onClick={() => remove(uid, parentContainerUid)}>
                            <img src={deleteIcon} alt='delete icon'/>
                        </button>
                    </div>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        { label && <label htmlFor={id}>{label}</label> }
                        <textarea
                            {...attributes}
                            id={id}
                        >
                        </textarea>
                    </StyledFormElementWrapper>
                </div>
            )
        } else if (type === 'select') {
            formElementHtml = (
                <div
                    className='form-element'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <div className='form-element__modify-options'>
                        <button onClick={() => startEdit(uid, type)}>
                            <img src={editIcon} alt='edit icon'/>
                        </button>
                        <button onClick={() => setStyleEditor(p => ({ ...p, show: true, uid, customStyles }))}>
                            <img src={paletteIcon} alt='palette icon'/>
                        </button>
                        <button onClick={() => remove(uid, parentContainerUid)}>
                            <img src={deleteIcon} alt='delete icon'/>
                        </button>
                    </div>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        { label && <label htmlFor={id}>{label}</label> }
                        <select
                            {...attributes}
                            id={id}
                            onClick={e => e.target.style.pointerEvents = 'none'}
                        >
                            <option>select an option</option>
                            {
                                Array.from({ length: optionsCount }).map((_, i) => (
                                    <option
                                        key={i}
                                        value={options.value[i]}
                                        disabled={options.disabled[i]}
                                    >
                                        {options.text[i]}
                                    </option>
                                ))
                            }
                        </select>
                    </StyledFormElementWrapper>
                </div>
            )
        } else if (type === 'checkbox') {
            formElementHtml = (
                <div
                    className='form-element'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <div className='form-element__modify-options'>
                        <button onClick={() => startEdit(uid, type)}>
                            <img src={editIcon} alt='edit icon'/>
                        </button>
                        <button onClick={() => setStyleEditor(p => ({ ...p, show: true, uid, customStyles }))}>
                            <img src={paletteIcon} alt='palette icon'/>
                        </button>
                        <button onClick={() => remove(uid, parentContainerUid)}>
                            <img src={deleteIcon} alt='delete icon'/>
                        </button>
                    </div>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        <span>{heading}</span>
                        {
                            Array.from({ length: optionsCount }).map((_, i) => (
                                <div key={i}>
                                    <input
                                        type={type}
                                        id={options.id[i]}
                                        name={options.name[i]}
                                        checked={options.checked[i]}
                                        disabled={options.disabled[i]}
                                        readOnly={true}
                                    />
                                    { options.label[i] && <label htmlFor={options.id[i]}>{options.label[i]}</label> }
                                </div>
                            ))
                        }
                    </StyledFormElementWrapper>
                </div>
            )
        } else if (type === 'radio') {
            formElementHtml = (
                <div
                    className='form-element'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <div className='form-element__modify-options'>
                        <button onClick={() => startEdit(uid, type)}>
                            <img src={editIcon} alt='edit icon'/>
                        </button>
                        <button onClick={() => setStyleEditor(p => ({ ...p, show: true, uid, customStyles }))}>
                            <img src={paletteIcon} alt='palette icon'/>
                        </button>
                        <button onClick={() => remove(uid, parentContainerUid)}>
                            <img src={deleteIcon} alt='delete icon'/>
                        </button>
                    </div>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        <span>{heading}</span>
                        {
                            Array.from({ length: optionsCount }).map((_, i) => (
                                <div key={i}>
                                    <input
                                        type={type}
                                        id={options.id[i]}
                                        name={attributes.name}
                                        checked={options.checked[i]}
                                        disabled={options.disabled[i]}
                                        readOnly={true}
                                    />
                                    { options.label[i] && <label htmlFor={options.id[i]}>{options.label[i]}</label> }
                                </div>
                            ))
                        }
                    </StyledFormElementWrapper>
                </div>
            )
        }
        return (
            <div key={i}>{formElementHtml}</div>
        )
    }

    const startEdit = (uid, type) => {
        const initialFormElementData = getInitialFormElementData()
        const { element, nestedElement } = findIndexByUid(formData, uid)
        let editFormElementData
        editFormElementData = element ? element : nestedElement.element

        const { uid: omit1, parentContainerUid: omit2, attributes, options, ...rest } = editFormElementData

        initialFormElementData.attributes = {
            ...initialFormElementData.attributes,
            ...attributes
        }

        if (type === 'select') {
            initialFormElementData.select.options = {
                value: [...options.value],
                text: [...options.text],
                selected: [...options.selected],
                disabled: [...options.disabled]
            }
        } else if (type === 'checkbox') {
            initialFormElementData.checkbox.options = {
                label: [...options.label],
                id: [...options.id],
                name: [...options.name],
                value: [...options.value],
                checked: [...options.checked],
                disabled: [...options.disabled]
            }
        } else if (type === 'radio') {
            initialFormElementData.radio.options = {
                label: [...options.label],
                id: [...options.id],
                value: [...options.value],
                checked: [...options.checked],
                disabled: [...options.disabled]
            }
        }

        setFormElementData({ ...initialFormElementData, ...rest })
        setElementEditor(prev => ({ ...prev, show: true, element: { type, dropPointUid: null, uid }, type: 'edit' }))
    }

    const endEdit = ({ uid, type }) => {
        const attrList = formElements[type]
        const filteredData = {}
        filteredData.attributes = Object.keys(formElementData.attributes).filter(attr => attrList.includes(attr)).reduce((data, attr) => {
            data[attr] = formElementData.attributes[attr]
            return data
        }, {})
        filteredData.type = type
        filteredData.customStyles = defaultStyles[type]
        if (type === 'button') {
            filteredData.buttonType = formElementData.buttonType
        }
        if (formElements[type].includes('label')) {
            filteredData.label = formElementData.label
        }
        if (formElements[type].includes('text')) {
            filteredData.text = formElementData.text
        }
        if (formElements[type].includes('heading')) {
            filteredData.heading = formElementData.heading
        }
        if (['select', 'checkbox', 'radio'].includes(type)) {
            filteredData.options = formElementData[type].options
            filteredData.optionsCount = formElementData.optionsCount
        }
        const { index, element, nestedElement } = findIndexByUid(formData, uid)
        if (element) {
            setFormData(prev => prev.map(
                formElement => formElement.uid === uid ? 
                ({ ...formElement, ...filteredData }) : 
                formElement
            ))
        } else {
            setFormData(prev => prev.map(
                (formElement, i) => i === index ? 
                ({ 
                    ...formElement, 
                    children: formElement.children.map(
                        (nestedFormElement, i) => i === nestedElement.index ? 
                        ({ ...nestedFormElement, ...filteredData }) : 
                        nestedFormElement
                    ) 
                }) : 
                formElement
            ))
        }
    }

    const updateStyle = () => {
        const { uid, customStyles } = styleEditor
        const { index, element, nestedElement } = findIndexByUid(formData, uid)
        if (element) {
            setFormData(prev => prev.map(formElement => formElement.uid === uid ? ({ ...formElement, customStyles }) : formElement))
        } else {
            setFormData(prev => prev.map((formElement, i) => i === index ? ({ ...formElement, children: formElement.children.map((nestedFormElement, i) => i === nestedElement.index ? ({ ...nestedFormElement, customStyles }) : nestedFormElement) }) : formElement))
        }
        setStyleEditor(p => ({ ...p, show: false, uid: null, customStyles: `` }))
    }

    const remove = (uid, parentContainerUid) => {
        if (parentContainerUid === mainDropPointUid) {
            setFormData(prev => prev.filter(formElement => formElement.uid !== uid))
        } else {
            setFormData(prev => prev.map(formElement => formElement.uid === parentContainerUid ? ({ ...formElement, children: formElement.children.filter(nestedFormElement => nestedFormElement.uid !== uid) }) : formElement))
        }
    }

    const save = () => {
        build(formData)
        setFormData([])
    }

    useEffect(() => {
        if (elementEditor.show) {
            elementEditorRef.current.scrollTop = 0
        }
    }, [elementEditor.show])

    return (
        <>
            <GlobalStyle />
            <StyledBuilder>
                <div className='sidebar'>
                    {
                        formLayouts.map((layout, i) => (
                            <div
                                key={i}
                                className='sidebar-item'
                                draggable
                                onDragStart={e => handleOnDragStart(e, layout)}
                            >
                                {layout}
                            </div>
                        ))
                    }
                    {
                        Object.keys(formElements).map((field, i) => (
                            <div
                                key={i}
                                className='sidebar-item'
                                draggable
                                onDragStart={e => handleOnDragStart(e, field)}
                            >
                                {field}
                            </div>
                        ))
                    }
                </div>
                <div className='form-editor'>
                    <div
                        className={`form-editor__droppoint${formData.length === 0 ? ' show-inst' : ''}`}
                        onDrop={handleOnDrop}
                        onDragOver={handleOnDragOver}
                        onDragEnter={handleOnDragEnter}
                        onDragLeave={handleOnDragLeave}
                        ref={dropPointRef}
                    >
                        {
                            formData.map(generateFormHtml)
                        }
                    </div>
                    <div className='form-editor__btn-wrapper'>
                        <button onClick={save} className='form-editor__btn-save'>save</button>
                    </div>
                </div>
                {
                    styleEditor.show &&
                    <div className='style-editor'>
                        <h2 className='style-editor__title'>Styles</h2>
                        <form onSubmit={e => {
                            e.preventDefault()
                            updateStyle()
                        }}>
                            <textarea
                                className='style-editor__editor'
                                value={styleEditor.customStyles}
                                onChange={e => setStyleEditor(prev => ({ ...prev, customStyles: e.target.value }))}
                            ></textarea>
                            <div className='style-editor__btn-wrapper'>
                                <button
                                    type='button'
                                    className='style-editor__btn-cancel'
                                    onClick={() => setStyleEditor(prev => ({ ...prev, show: false, uid: null, customStyles: `` }))}
                                >
                                    cancel
                                </button>
                                <button type='submit' className='style-editor__btn-save'>
                                    save
                                </button>
                            </div>
                        </form>
                    </div>
                }
                <div className={`element-editor--popup-bg${elementEditor.show === true ? ' show' : ''}`}>
                    <div className='element-editor element-editor--popup' ref={elementEditorRef}>
                        <form onSubmit={e => {
                            e.preventDefault()
                            if (elementEditor.type === 'add') {
                                drop(elementEditor.element)
                                setElementEditor(prev => ({ ...prev, show: false }))
                            } else if (elementEditor.type === 'edit') {
                                endEdit(elementEditor.element)
                                setElementEditor(prev => ({ ...prev, show: false }))
                            }
                        }}>
                            <h2 className='element-editor__title'>Attributes</h2>
                            {
                                formElements[elementEditor.element.type]?.includes('buttonType') &&
                                <div>
                                    <span>Button type</span>
                                    <input
                                        type='radio'
                                        name='buttonType'
                                        value='submit'
                                        id='buttonTypeId1'
                                        onChange={e => setFormElementData(prev => ({ ...prev, buttonType: e.target.value }))}
                                        checked={formElementData.buttonType === 'submit'}
                                    />
                                    <label htmlFor='buttonTypeId1'>Submit</label>
                                    <input
                                        type='radio'
                                        name='buttonType'
                                        value='button'
                                        id='buttonTypeId2'
                                        onChange={e => setFormElementData(prev => ({ ...prev, buttonType: e.target.value }))}
                                        checked={formElementData.buttonType === 'button'}
                                    />
                                    <label htmlFor='buttonTypeId2'>Button</label>
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('text') &&
                                <div>
                                    <input
                                        type='text'
                                        name='text'
                                        value={formElementData.text}
                                        placeholder='Text'
                                        onChange={e => setFormElementData(prev => ({ ...prev, text: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('heading') &&
                                <div>
                                    <input
                                        type='text'
                                        name='heading'
                                        value={formElementData.heading}
                                        placeholder='Heading'
                                        onChange={e => setFormElementData(prev => ({ ...prev, heading: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('label') &&
                                <div>
                                    <input
                                        type='text'
                                        name='label'
                                        value={formElementData.label}
                                        placeholder='Label'
                                        onChange={e => setFormElementData(prev => ({ ...prev, label: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('id') &&
                                <div>
                                    <input
                                        type='text'
                                        name='id'
                                        value={formElementData.attributes.id}
                                        placeholder='ID'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, id: e.target.value } }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('name') &&
                                <div>
                                    <input
                                        type='text'
                                        name='name'
                                        value={formElementData.attributes.name}
                                        placeholder='Name'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, name: e.target.value } }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('value') &&
                                <div>
                                    <input
                                        type='text'
                                        name='value'
                                        value={formElementData.attributes.value}
                                        placeholder='Value'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, value: e.target.value } }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('placeholder') &&
                                <div>
                                    <input
                                        type='text'
                                        name='placeholder'
                                        value={formElementData.attributes.placeholder}
                                        placeholder='Placeholder'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, placeholder: e.target.value } }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('min') &&
                                <div>
                                    <input
                                        type='number'
                                        name='min'
                                        value={formElementData.attributes.min}
                                        placeholder='Min length'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, min: e.target.value } }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('max') &&
                                <div>
                                    <input
                                        type='number'
                                        name='max'
                                        value={formElementData.attributes.max}
                                        placeholder='Max length'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, max: e.target.value } }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('minLength') &&
                                <div>
                                    <input
                                        type='number'
                                        name='minLength'
                                        value={formElementData.attributes.minLength}
                                        placeholder='Min length'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, minLength: e.target.value } }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('maxLength') &&
                                <div>
                                    <input
                                        type='number'
                                        name='maxLength'
                                        value={formElementData.attributes.maxLength}
                                        placeholder='Max length'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, maxLength: e.target.value } }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('rows') &&
                                <div>
                                    <input
                                        type='number'
                                        name='rows'
                                        value={formElementData.attributes.rows}
                                        placeholder='Rows'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, rows: e.target.value } }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('cols') &&
                                <div>
                                    <input
                                        type='number'
                                        name='cols'
                                        value={formElementData.attributes.cols}
                                        placeholder='Columns'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, cols: e.target.value } }))}
                                    />
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('required') &&
                                <div>
                                    <span>Required</span>
                                    <input
                                        type='radio'
                                        name='required'
                                        value='true'
                                        id='requiredId1'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, required: JSON.parse(e.target.value) } }))}
                                        checked={formElementData.attributes.required === true}
                                    />
                                    <label htmlFor='requiredId1'>Yes</label>
                                    <input
                                        type='radio'
                                        name='required'
                                        value='false'
                                        id='requiredId2'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, required: JSON.parse(e.target.value) } }))}
                                        checked={formElementData.attributes.required === false}
                                    />
                                    <label htmlFor='requiredId2'>No</label>
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('readOnly') &&
                                <div>
                                    <span>Readonly</span>
                                    <input
                                        type='radio'
                                        name='readOnly'
                                        value='true'
                                        id='readOnlyId1'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, readOnly: JSON.parse(e.target.value) } }))}
                                        checked={formElementData.attributes.readOnly === true}
                                    />
                                    <label htmlFor='readOnlyId1'>Yes</label>
                                    <input
                                        type='radio'
                                        name='readOnly'
                                        value='false'
                                        id='readOnlyId2'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, readOnly: JSON.parse(e.target.value) } }))}
                                        checked={formElementData.attributes.readOnly === false}
                                    />
                                    <label htmlFor='readOnlyId2'>No</label>
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('disabled') &&
                                <div>
                                    <span>Disabled</span>
                                    <input
                                        type='radio'
                                        name='disabled'
                                        value='true'
                                        id='disabledId1'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, disabled: JSON.parse(e.target.value) } }))}
                                        checked={formElementData.attributes.disabled === true}
                                    />
                                    <label htmlFor='disabledId1'>Yes</label>
                                    <input
                                        type='radio'
                                        name='disabled'
                                        value='false'
                                        id='disabledId2'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, disabled: JSON.parse(e.target.value) } }))}
                                        checked={formElementData.attributes.disabled === false}
                                    />
                                    <label htmlFor='disabledId2'>No</label>
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('multiple') &&
                                <div>
                                    <span>Multiple</span>
                                    <input
                                        type='radio'
                                        name='multiple'
                                        value='true'
                                        id='multipleId1'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, multiple: JSON.parse(e.target.value) } }))}
                                        checked={formElementData.attributes.multiple === true}
                                    />
                                    <label htmlFor='multipleId1'>Yes</label>
                                    <input
                                        type='radio'
                                        name='multiple'
                                        value='false'
                                        id='multipleId2'
                                        onChange={e => setFormElementData(prev => ({ ...prev, attributes: { ...prev.attributes, multiple: JSON.parse(e.target.value) } }))}
                                        checked={formElementData.attributes.multiple === false}
                                    />
                                    <label htmlFor='multipleId2'>No</label>
                                </div>
                            }
                            {
                                formElements[elementEditor.element.type]?.includes('optionsCount') &&
                                <div>
                                    <select
                                        name='optionsCount'
                                        id='optionsCount'
                                        value={formElementData.optionsCount}
                                        onChange={e => setFormElementData(prev => ({ ...prev, optionsCount: e.target.value }))}
                                    >
                                        <option>select no of options</option>
                                        {
                                            Array.from({ length: formElementOptionsLimit }).map((_, i) => (
                                                <option value={i + 1} key={i}>{i + 1}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            }
                            {
                                formElementData.optionsCount > 0 &&
                                Array.from({ length: formElementData.optionsCount }).map((_, i) => (
                                    <div className='element-editor__input-options-wrapper' key={i}>
                                        {
                                            (
                                                elementEditor.element.type === 'checkbox' ||
                                                elementEditor.element.type === 'radio'
                                            ) &&
                                            <div>
                                                <input
                                                    type='text'
                                                    name={`labelOption${i + 1}`}
                                                    value={formElementData[elementEditor.element.type].options.label[i]}
                                                    placeholder='Label'
                                                    onChange={e => setFormElementData(prev => (
                                                        {
                                                            ...prev,
                                                            [elementEditor.element.type]: {
                                                                options: {
                                                                    ...prev[elementEditor.element.type].options,
                                                                    label: prev[elementEditor.element.type].options.label.map((op, i1) => i1 === i ? e.target.value : op)
                                                                }
                                                            }
                                                        }
                                                    ))}
                                                />
                                            </div>
                                        }
                                        {
                                            (
                                                elementEditor.element.type === 'checkbox' ||
                                                elementEditor.element.type === 'radio'
                                            ) &&
                                            <div>
                                                <input
                                                    type='text'
                                                    name={`idOption${i + 1}`}
                                                    value={formElementData[elementEditor.element.type].options.id[i]}
                                                    placeholder='ID'
                                                    onChange={e => setFormElementData(prev => (
                                                        {
                                                            ...prev,
                                                            [elementEditor.element.type]: {
                                                                options: {
                                                                    ...prev[elementEditor.element.type].options,
                                                                    id: prev[elementEditor.element.type].options.id.map((op, i1) => i1 === i ? e.target.value : op)
                                                                }
                                                            }
                                                        }
                                                    ))}
                                                />
                                            </div>
                                        }
                                        {
                                            elementEditor.element.type === 'checkbox' &&
                                            <div>
                                                <input
                                                    type='text'
                                                    name={`nameOption${i + 1}`}
                                                    value={formElementData[elementEditor.element.type].options.name[i]}
                                                    placeholder='Name'
                                                    onChange={e => setFormElementData(prev => (
                                                        {
                                                            ...prev,
                                                            [elementEditor.element.type]: {
                                                                options: {
                                                                    ...prev[elementEditor.element.type].options,
                                                                    name: prev[elementEditor.element.type].options.name.map((op, i1) => i1 === i ? e.target.value : op)
                                                                }
                                                            }
                                                        }
                                                    ))}
                                                />
                                            </div>
                                        }
                                        {
                                            <div>
                                                <input
                                                    type='text'
                                                    name={`valueOption${i + 1}`}
                                                    value={formElementData[elementEditor.element.type].options.value[i]}
                                                    placeholder='Value'
                                                    onChange={e => setFormElementData(prev => (
                                                        {
                                                            ...prev,
                                                            [elementEditor.element.type]: {
                                                                options: {
                                                                    ...prev[elementEditor.element.type].options,
                                                                    value: prev[elementEditor.element.type].options.value.map((op, i1) => i1 === i ? e.target.value : op)
                                                                }
                                                            }
                                                        }
                                                    ))}
                                                />
                                            </div>
                                        }
                                        {
                                            elementEditor.element.type === 'select' &&
                                            <div>
                                                <input
                                                    type='text'
                                                    name={`textOption${i + 1}`}
                                                    value={formElementData[elementEditor.element.type].options.text[i]}
                                                    placeholder='Text'
                                                    onChange={e => setFormElementData(prev => (
                                                        {
                                                            ...prev,
                                                            [elementEditor.element.type]: {
                                                                options: {
                                                                    ...prev[elementEditor.element.type].options,
                                                                    text: prev[elementEditor.element.type].options.text.map((op, i1) => i1 === i ? e.target.value : op)
                                                                }
                                                            }
                                                        }
                                                    ))}
                                                />
                                            </div>
                                        }
                                        {
                                            elementEditor.element.type === 'select' &&
                                            <div>
                                                <span>Selected</span>
                                                <input
                                                    type='radio'
                                                    name={`selectedOption${i + 1}`}
                                                    value='true'
                                                    id={`selectedOptionIdA${i + 1}`}
                                                    checked={formElementData[elementEditor.element.type].options.selected[i] === true}
                                                    onChange={e => setFormElementData(prev => (
                                                        {
                                                            ...prev,
                                                            [elementEditor.element.type]: {
                                                                options: {
                                                                    ...prev[elementEditor.element.type].options,
                                                                    selected: prev[elementEditor.element.type].options.selected.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                }
                                                            }
                                                        }
                                                    ))}
                                                />
                                                <label htmlFor={`selectedOptionIdA${i + 1}`}>Yes</label>
                                                <input
                                                    type='radio'
                                                    name={`selectedOption${i + 1}`}
                                                    value='false'
                                                    id={`selectedOptionIdB${i + 1}`}
                                                    checked={formElementData[elementEditor.element.type].options.selected[i] === false}
                                                    onChange={e => setFormElementData(prev => (
                                                        {
                                                            ...prev,
                                                            [elementEditor.element.type]: {
                                                                options: {
                                                                    ...prev[elementEditor.element.type].options,
                                                                    selected: prev[elementEditor.element.type].options.selected.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                }
                                                            }
                                                        }
                                                    ))}
                                                />
                                                <label htmlFor={`selectedOptionIdB${i + 1}`}>No</label>
                                            </div>
                                        }
                                        {
                                            (
                                                elementEditor.element.type === 'checkbox' ||
                                                elementEditor.element.type === 'radio'
                                            ) &&
                                            <div>
                                                <span>Checked</span>
                                                <input
                                                    type='radio'
                                                    name={`checkedOption${i + 1}`}
                                                    value='true'
                                                    id={`checkedOptionIdA${i + 1}`}
                                                    checked={formElementData[elementEditor.element.type].options.checked[i] === true}
                                                    onChange={e => setFormElementData(prev => (
                                                        {
                                                            ...prev,
                                                            [elementEditor.element.type]: {
                                                                options: {
                                                                    ...prev[elementEditor.element.type].options,
                                                                    checked: prev[elementEditor.element.type].options.checked.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                }
                                                            }
                                                        }
                                                    ))}
                                                />
                                                <label htmlFor={`checkedOptionIdA${i + 1}`}>Yes</label>
                                                <input
                                                    type='radio'
                                                    name={`checkedOption${i + 1}`}
                                                    value='false'
                                                    id={`checkedOptionIdB${i + 1}`}
                                                    checked={formElementData[elementEditor.element.type].options.checked[i] === false}
                                                    onChange={e => setFormElementData(prev => (
                                                        {
                                                            ...prev,
                                                            [elementEditor.element.type]: {
                                                                options: {
                                                                    ...prev[elementEditor.element.type].options,
                                                                    checked: prev[elementEditor.element.type].options.checked.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                }
                                                            }
                                                        }
                                                    ))}
                                                />
                                                <label htmlFor={`checkedOptionIdB${i + 1}`}>No</label>
                                            </div>
                                        }
                                        {
                                            <div>
                                                <span>Disabled</span>
                                                <input
                                                    type='radio'
                                                    name={`disabledOption${i + 1}`}
                                                    value='true'
                                                    id={`disabledOptionIdA${i + 1}`}
                                                    checked={formElementData[elementEditor.element.type].options.disabled[i] === true}
                                                    onChange={e => setFormElementData(prev => (
                                                        {
                                                            ...prev,
                                                            [elementEditor.element.type]: {
                                                                options: {
                                                                    ...prev[elementEditor.element.type].options,
                                                                    disabled: prev[elementEditor.element.type].options.disabled.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                }
                                                            }
                                                        }
                                                    ))}
                                                />
                                                <label htmlFor={`disabledOptionIdA${i + 1}`}>Yes</label>
                                                <input
                                                    type='radio'
                                                    name={`disabledOption${i + 1}`}
                                                    value='false'
                                                    id={`disabledOptionIdB${i + 1}`}
                                                    checked={formElementData[elementEditor.element.type].options.disabled[i] === false}
                                                    onChange={e => setFormElementData(prev => (
                                                        {
                                                            ...prev,
                                                            [elementEditor.element.type]: {
                                                                options: {
                                                                    ...prev[elementEditor.element.type].options,
                                                                    disabled: prev[elementEditor.element.type].options.disabled.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                }
                                                            }
                                                        }
                                                    ))}
                                                />
                                                <label htmlFor={`disabledOptionIdB${i + 1}`}>No</label>
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                            <div className='element-editor__btn-wrapper'>
                                <button
                                    type='button'
                                    className='element-editor__btn-cancel'
                                    onClick={() => setElementEditor(p => ({ ...p, show: false }))}
                                >
                                    cancel
                                </button>
                                <button type='submit' className='element-editor__btn-submit'>
                                    submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </StyledBuilder>
        </>
    )
}

export default Builder