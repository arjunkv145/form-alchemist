import { useEffect, useRef, useState } from 'react'
import GlobalStyle from '../styles/GlobalStyle'
import StyledRender from '../styles/StyledRender'
import StyledFormElementWrapper from '../styles/StyledFormElementWrapper'
import findIndexByUid from '../utils/findIndexByUid'

function Render({ form = [], submit = () => {} }) {
    if (!Array.isArray(form)) {
        throw new Error('The "form" prop must be an array.');
    }
    
    if (typeof submit !== 'function') {
        throw new Error('The "submit" prop must be a function.');
    }

    const [formData, setFormData] = useState([])
    const [loading, setLoading] = useState(true)
    const formDataInitialised = useRef(null)

    const updateElement = (feValue, uid, type, optionIndex) => {
        const { index, element, nestedElement } = findIndexByUid(formData, uid)
        const feError = ''
        if (type === 'checkbox') {
            if (element) {
                setFormData(prev => prev.map(
                    formElement => formElement.uid === uid ? 
                    ({ 
                        ...formElement, 
                        feError, 
                        options: { 
                            ...formElement.options, 
                            checked: formElement.options.checked.map((checkedVal, i) => i === optionIndex ? !checkedVal : checkedVal)} 
                    }) : 
                    formElement
                ))
            } else {
                setFormData(prev => prev.map(
                    (formElement, i) => i === index ?
                    ({ 
                        ...formElement, 
                        children: formElement.children.map(
                            (nestedFormElement, i) => i === nestedElement.index ? 
                            ({ 
                                ...nestedFormElement, 
                                feError, 
                                options: { 
                                    ...nestedFormElement.options, 
                                    checked: nestedFormElement.options.checked.map((checkedVal, i) => i === optionIndex ? !checkedVal : checkedVal)
                                } 
                            }) : 
                            nestedFormElement
                        ) 
                    }) : 
                    formElement
                ))
            }
        } else if (type === 'radio') {
            if (element) {
                setFormData(prev => prev.map(
                    formElement => formElement.uid === uid ? 
                    ({ 
                        ...formElement, 
                        feValue, 
                        feError, 
                        options: { 
                            ...formElement.options, 
                            checked: formElement.options.checked.map((_, i) => i === optionIndex ? true : false)
                        } 
                    }) : 
                    formElement
                ))
            } else {
                setFormData(prev => prev.map(
                    (formElement, i) => i === index ?
                    ({ 
                        ...formElement, 
                        children: formElement.children.map(
                            (nestedFormElement, i) => i === nestedElement.index ? 
                            ({ 
                                ...nestedFormElement, 
                                feValue, 
                                feError, 
                                options: { 
                                    ...nestedFormElement.options, 
                                    checked: nestedFormElement.options.checked.map((_, i) => i === optionIndex ? true : false)
                                } 
                            }) : 
                            nestedFormElement
                        ) 
                    }) : 
                    formElement
                ))
            }
        } else {
            if (element) {
                setFormData(prev => prev.map(
                    formElement => formElement.uid === uid ? 
                    ({ ...formElement, feValue, feError }) : 
                    formElement
                ))
            } else {
                setFormData(prev => prev.map(
                    (formElement, i) => i === index ? 
                    ({ 
                        ...formElement, 
                        children: formElement.children.map(
                            (nestedFormElement, i) => i === nestedElement.index ? 
                            ({ ...nestedFormElement, feValue, feError }) : 
                            nestedFormElement
                        ) 
                    }) : 
                    formElement
                ))
            }
        }
    }

    const getformValues = () => {
        let formValues = []
        for (let i = 0; i < formData.length; i++) {
            const formElement = formData[i]
            if (formElement.type === 'button') {
                continue
            }
            if (formElement.type === 'container') {
                for (let j = 0; j < formElement.children.length; j++) {
                    const nestedFormElement = formElement.children[j]
                    if (nestedFormElement.type !== 'button') {
                        if (nestedFormElement.type === 'checkbox') {
                            const checkboxValues = Array.from({ length: nestedFormElement.optionsCount }).map(
                                (_, i) => ({ 
                                    [nestedFormElement.options.name[i]]: nestedFormElement.options.checked[i] 
                                })
                            )
                            formValues = [...formValues, ...checkboxValues]
                        } else {
                            formValues = [...formValues, { [nestedFormElement.name]: nestedFormElement.feValue }]
                        }
                    }
                }
            } else if (formElement.type === 'checkbox') {
                const checkboxValues = Array.from({ length: formElement.optionsCount }).map(
                    (_, i) => ({ [formElement.options.name[i]]: formElement.options.checked[i] })
                )
                formValues = [...formValues, ...checkboxValues]
            } else {
                formValues = [...formValues, { [formElement.name]: formElement.feValue }]
            }
        }
        return formValues
    }

    const setErrorMessage = (uid) => {
        const { index, element, nestedElement } = findIndexByUid(formData, uid)
        const feError = 'This field is required'
        if (element) {
            setFormData(prev => prev.map(
                formElement => formElement.uid === uid ? 
                ({ ...formElement, feError }) : 
                formElement
            ))
        } else {
            setFormData(prev => prev.map(
                (formElement, i) => i === index ? 
                ({ 
                    ...formElement, 
                    children: formElement.children.map(
                        (nestedFormElement, i) => i === nestedElement.index ? 
                        ({ ...nestedFormElement, feError }) : 
                        nestedFormElement
                    ) 
                }) : 
                formElement
            ))
        }
    }

    const handleSubmit = () => {
        let hasError = false

        for (let i = 0; i < formData.length; i++) {
            const formElement = formData[i]

            if (formElement.type === 'button' || formElement.type === 'hidden') {
                continue
            }

            if (formElement.type === 'container') {
                for (let j = 0; j < formElement.children.length; j++) {
                    const nestedFormElement = formElement.children[j]

                    if (nestedFormElement.type === 'button' || nestedFormElement.type === 'hidden') {
                        continue
                    }

                    if (nestedFormElement.required === true) {
                        if (nestedFormElement.type === 'checkbox') {
                            if (!nestedFormElement.options.checked.slice(0, nestedFormElement.optionsCount).includes(true)) {
                                hasError = true
                                setErrorMessage(nestedFormElement.uid)
                            }
                        } else {
                            if (nestedFormElement.feValue.trim() === '') {
                                hasError = true
                                setErrorMessage(nestedFormElement.uid)
                            }
                        }
                    }
                }
            } else {
                if (formElement.required === true) {
                    if (formElement.type === 'checkbox') {
                        if (!formElement.options.checked.slice(0, formElement.optionsCount).includes(true)) {
                            hasError = true
                            setErrorMessage(formElement.uid)
                        }
                    } else {
                        if (formElement.feValue.trim() === '') {
                            hasError = true
                            setErrorMessage(formElement.uid)
                        }
                    }
                }
            }
        }

        if (!hasError) {
            const formValues = getformValues()
            submit(formValues)
        }
    }

    const generateFormHtml = (formElement, i) => {
        let formElementHtml = ''
        const { uid, parentContainerUid, type, buttonType, label, text, heading, optionsCount, customStyles, options, feValue, feError, ...rest } = formElement
        const attributes = rest?.attributes
        const id = attributes?.id
        const required = attributes?.required

        if (type === 'text' || type === 'number' || type === 'date' || type === 'time' || type === 'hidden') {
            formElementHtml = (
                <div className={`form-element${required ? ' required' : ''}`}>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        {type === 'hidden' ? ' Hidden input element' : ''}
                        { label && <label htmlFor={id}>{label}</label> }
                        <input
                            {...attributes}
                            type={type}
                            id={id}
                            value={feValue}
                            onChange={e => updateElement(e.target.value, uid)}
                        />
                    </StyledFormElementWrapper>
                    { feError && <div className='form-element__error-message'>{feError}</div> }
                </div>
            )
        } else if (type === 'container') {
            formElementHtml = (
                <div className='form-element'>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        {
                            formElement.children.map(generateFormHtml)
                        }
                    </StyledFormElementWrapper>
                </div>
            )
        } else if (type === 'button') {
            formElementHtml = (
                <div className='form-element'>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        <button
                            type={buttonType}
                            {...attributes}
                            onClick={() => {
                                if (buttonType === 'submit') {
                                    handleSubmit()
                                }
                            }}
                        >
                            {text}
                        </button>
                    </StyledFormElementWrapper>
                </div>
            )
        } else if (type === 'textarea') {
            formElementHtml = (
                <div className={`form-element${required ? ' required' : ''}`}>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        { label && <label htmlFor={id}>{label}</label> }
                        <textarea
                            {...attributes}
                            id={id}
                            value={feValue}
                            onChange={e => updateElement(e.target.value, uid)}
                        >
                        </textarea>
                    </StyledFormElementWrapper>
                    { feError && <div className='form-element__error-message'>{feError}</div> }
                </div>
            )
        } else if (type === 'select') {
            formElementHtml = (
                <div className={`form-element${required ? ' required' : ''}`}>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        { label && <label htmlFor={id}>{label}</label> }
                        <select
                            {...attributes}
                            id={id}
                            value={feValue}
                            onChange={e => updateElement(e.target.value, uid)}
                        >
                            <option value=''>select an option</option>
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
                    { feError && <div className='form-element__error-message'>{feError}</div> }
                </div>
            )
        } else if (type === 'checkbox') {
            formElementHtml = (
                <div className={`form-element${required ? ' required' : ''}`}>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        <span>{heading}</span>
                        {
                            Array.from({ length: optionsCount }).map((_, i) => (
                                <div key={i}>
                                    <input
                                        type={type}
                                        id={options.id[i]}
                                        name={options.name[i]}
                                        value={options.value[i]}
                                        checked={options.checked[i]}
                                        disabled={options.disabled[i]}
                                        onChange={e => updateElement(e.target.value, uid, type, i)}
                                    />
                                    { options.label[i] && <label htmlFor={options.id[i]}>{options.label[i]}</label> }
                                </div>
                            ))
                        }
                    </StyledFormElementWrapper>
                    { feError && <div className='form-element__error-message'>{feError}</div> }
                </div>
            )
        } else if (type === 'radio') {
            formElementHtml = (
                <div className={`form-element${required ? ' required' : ''}`}>
                    <StyledFormElementWrapper $customstyles={customStyles}>
                        <span>{heading}</span>
                        {
                            Array.from({ length: optionsCount }).map((_, i) => (
                                <div key={i}>
                                    <input
                                        type={type}
                                        id={options.id[i]}
                                        name={attributes.name}
                                        value={options.value[i]}
                                        checked={options.checked[i]}
                                        disabled={options.disabled[i]}
                                        onChange={e => updateElement(e.target.value, uid, type, i)}
                                    />
                                    { options.label[i] && <label htmlFor={options.id[i]}>{options.label[i]}</label> }
                                </div>
                            ))
                        }
                    </StyledFormElementWrapper>
                    { feError && <div className='form-element__error-message'>{feError}</div> }
                </div>
            )
        }
        return (
            <div key={i}>{formElementHtml}</div>
        )
    }

    useEffect(() => {
        if (loading && formDataInitialised.current === null) {
            formDataInitialised.current = true
            setFormData(prev => {
                const modifiedForm = form.map(formElement =>
                    formElement.type === 'container' ?
                    {
                        ...formElement,
                        children: formElement.children.map(
                            nestedFormElement => nestedFormElement.type === 'checkbox' ?
                            ({ ...nestedFormElement, feValue: [], feError: '' }) :
                            ({ ...nestedFormElement, feValue: '', feError: '' })
                        )
                    } :
                    formElement.type === 'checkbox' ?
                    ({ ...formElement, feValue: [], feError: '' }) :
                    ({ ...formElement, feValue: '', feError: '' })
                )
                return [...prev, ...modifiedForm]
            })
            setLoading(false)
        }
    }, [form, loading])

    return (
        <>
        <GlobalStyle />
            <StyledRender>
                {
                    !loading && formData.map(generateFormHtml)
                }
            </StyledRender>
        </>
    )
}

export default Render