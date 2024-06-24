import { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import '../styles/render.css'

const StyledFormItemWrapper = styled.div`
    ${
        (props) =>
            props.$customstyles &&
            css`${props.$customstyles}`
    }
`

const findIndexByUid = (items, uid) => {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.uid === uid) {
            return { index: i, item }
        }
        if (item.children) {
            const nestedItem = findIndexByUid(item.children, uid)
            if (nestedItem) {
                return { index: i, nestedItem }
            }
        }
    }
    return null
}

function Render({ data }) {
    const [formData, setFormData] = useState([])
    const [loading, setLoading] = useState(true)
    const formDataInitialised = useRef(null)

    const updateField = (fiValue, uid, type, optionIndex) => {
        const { index, item, nestedItem } = findIndexByUid(formData, uid)
        const fiError = ''
        if (type === 'checkbox') {
            if (item) {
                setFormData(p => p.map(fi => fi.uid === uid ? ({ ...fi, fiError, options: { ...fi.options, checked: fi.options.checked.map((checkedVal, i) => i === optionIndex ? !checkedVal : checkedVal)} }) : fi))
            } else {
                setFormData(p => p.map((fi, i1) => i1 === index ?
                ({ ...fi, children: fi.children.map((nfi, i2) => i2 === nestedItem.index ? ({ ...nfi, fiError, options: { ...nfi.options, checked: nfi.options.checked.map((checkedVal, i) => i === optionIndex ? !checkedVal : checkedVal)} }) : nfi) }) :
                fi))
            }
        } else if (type === 'radio') {
            if (item) {
                setFormData(p => p.map(fi => fi.uid === uid ? ({ ...fi, fiValue, fiError, options: { ...fi.options, checked: fi.options.checked.map((_, i) => i === optionIndex ? true : false)} }) : fi))
            } else {
                setFormData(p => p.map((fi, i1) => i1 === index ?
                ({ ...fi, children: fi.children.map((nfi, i2) => i2 === nestedItem.index ? ({ ...nfi, fiValue, fiError, options: { ...nfi.options, checked: nfi.options.checked.map((_, i) => i === optionIndex ? true : false)} }) : nfi) }) :
                fi))
            }
        } else {
            if (item) {
                setFormData(p => p.map(fi => fi.uid === uid ? ({ ...fi, fiValue, fiError }) : fi))
            } else {
                setFormData(p => p.map((fi, i1) => i1 === index ? ({ ...fi, children: fi.children.map((nfi, i2) => i2 === nestedItem.index ? ({ ...nfi, fiValue, fiError }) : nfi) }) : fi))
            }
        }
    }

    const getformValues = () => {
        let formValues = []
        for (let i = 0; i < formData.length; i++) {
            const fi = formData[i]
            if (fi.type === 'button') {
                continue
            }
            if (fi.type === 'container') {
                for (let j = 0; j < fi.children.length; j++) {
                    const nfi = fi.children[j]
                    if (nfi.type !== 'button') {
                        if (nfi.type === 'checkbox') {
                            const checkboxValues = Array.from({ length: nfi.optionsCount }).map((_, i) => ({ [nfi.options.name[i]]: nfi.options.checked[i] }))
                            formValues = [...formValues, ...checkboxValues]
                        } else {
                            formValues = [...formValues, { [nfi.name]: nfi.fiValue }]
                        }
                    }
                }
            } else if (fi.type === 'checkbox') {
                const checkboxValues = Array.from({ length: fi.optionsCount }).map((_, i) => ({ [fi.options.name[i]]: fi.options.checked[i] }))
                formValues = [...formValues, ...checkboxValues]
            } else {
                formValues = [...formValues, { [fi.name]: fi.fiValue }]
            }
        }
        return formValues
    }

    const setErrorMessage = (uid) => {
        const { index, item, nestedItem } = findIndexByUid(formData, uid)
        const fiError = 'This field is required'
        if (item) {
            setFormData(p => p.map(fi => fi.uid === uid ? ({ ...fi, fiError }) : fi))
        } else {
            setFormData(p => p.map((fi, i1) => i1 === index ? ({ ...fi, children: fi.children.map((nfi, i2) => i2 === nestedItem.index ? ({ ...nfi, fiError }) : nfi) }) : fi))
        }
    }

    const handleSubmit = () => {
        let hasError = false

        for (let i = 0; i < formData.length; i++) {
            const fi = formData[i]
            if (fi.type === 'button' || fi.type === 'hidden') {
                continue
            }
            if (fi.type === 'container') {
                for (let j = 0; j < fi.children.length; j++) {
                    const nfi = fi.children[j]
                    if (nfi.type !== 'button' && nfi.type !== 'hidden') {
                        if (nfi.type === 'checkbox') {
                            if (nfi.required === true) {
                                if (!nfi.options.checked.slice(0, nfi.optionsCount).includes(true)) {
                                    hasError = true
                                    setErrorMessage(nfi.uid)
                                }
                            }
                        } else {
                            if (nfi.required === true && nfi.fiValue.trim() === '') {
                                hasError = true
                                setErrorMessage(nfi.uid)
                            }
                        }
                    }
                }
            } else if (fi.type === 'checkbox') {
                if (fi.required === true) {
                    if (!fi.options.checked.slice(0, fi.optionsCount).includes(true)) {
                        hasError = true
                        setErrorMessage(fi.uid)
                    }
                }
            } else {
                if (fi.required === true && fi.fiValue.trim() === '') {
                    hasError = true
                    setErrorMessage(fi.uid)
                }
            }
        }

        if (!hasError) {
            console.log('valid')
        } else {
            console.log('not valid')
        }
    }

    const generateFormHtml = (formItem, i) => {
        let formItemHtml = ''
        const { uid, parentContainerUid, type, label, id, optionsCount, question, buttonType, text, required, options, customStyles, fiValue, fiError, ...attr } = formItem

        if (type === 'text' || type === 'number' || type === 'date' || type === 'time' || type === 'hidden') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        {type === 'hidden' ? ' Hidden input element' : ''}
                        { label && <label htmlFor={id}>{label}</label> }
                        <input
                            {...attr}
                            type={type}
                            id={id}
                            value={fiValue}
                            onChange={e => updateField(e.target.value, uid)}
                        />
                    </StyledFormItemWrapper>
                    { fiError && <div className='form-field-error'>{fiError}</div> }
                </div>
            )
        } else if (type === 'container') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        {
                            formItem.children.map(generateFormHtml)
                        }
                    </StyledFormItemWrapper>
                </div>
            )
        } else if (type === 'button') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        <button
                            type={buttonType}
                            {...attr}
                            onClick={() => {
                                if (buttonType === 'submit') {
                                    handleSubmit()
                                }
                            }}
                        >
                            {text}
                        </button>
                    </StyledFormItemWrapper>
                </div>
            )
        } else if (type === 'textarea') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        { label && <label htmlFor={id}>{label}</label> }
                        <textarea
                            {...attr}
                            id={id}
                            value={fiValue}
                            onChange={e => updateField(e.target.value, uid)}
                        >
                        </textarea>
                    </StyledFormItemWrapper>
                    { fiError && <div className='form-field-error'>{fiError}</div> }
                </div>
            )
        } else if (type === 'select') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        { label && <label htmlFor={id}>{label}</label> }
                        <select
                            {...attr}
                            id={id}
                            value={fiValue}
                            onChange={e => updateField(e.target.value, uid)}
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
                    </StyledFormItemWrapper>
                    { fiError && <div className='form-field-error'>{fiError}</div> }
                </div>
            )
        } else if (type === 'checkbox') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        <span>{question}</span>
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
                                        onChange={e => updateField(e.target.value, uid, type, i)}
                                    />
                                    { options.label[i] && <label htmlFor={options.id[i]}>{options.label[i]}</label> }
                                </div>
                            ))
                        }
                    </StyledFormItemWrapper>
                    { fiError && <div className='form-field-error'>{fiError}</div> }
                </div>
            )
        } else if (type === 'radio') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        <span>{question}</span>
                        {
                            Array.from({ length: optionsCount }).map((_, i) => (
                                <div key={i}>
                                    <input
                                        type={type}
                                        id={options.id[i]}
                                        name={attr.name}
                                        value={options.value[i]}
                                        checked={options.checked[i]}
                                        disabled={options.disabled[i]}
                                        onChange={e => updateField(e.target.value, uid, type, i)}
                                    />
                                    { options.label[i] && <label htmlFor={options.id[i]}>{options.label[i]}</label> }
                                </div>
                            ))
                        }
                    </StyledFormItemWrapper>
                    { fiError && <div className='form-field-error'>{fiError}</div> }
                </div>
            )
        }
        return (
            <div key={i}>{formItemHtml}</div>
        )
    }

    useEffect(() => {
        if (loading && formDataInitialised.current === null) {
            formDataInitialised.current = true
            setFormData(p => {
                const modifiedData = data.map(fi =>
                    fi.type === 'container' ?
                    {
                        ...fi,
                        children: fi.children.map(
                            nfi => nfi.type === 'checkbox' ?
                            ({ ...nfi, fiValue: [], fiError: '' }) :
                            ({ ...nfi, fiValue: '', fiError: '' })
                        )
                    } :
                    fi.type === 'checkbox' ?
                    ({ ...fi, fiValue: [], fiError: '' }) :
                    ({ ...fi, fiValue: '', fiError: '' })
                )
                return [...p, ...modifiedData]
            })
            setLoading(false)
        }
    }, [])

    return (
        <div className='render'>
            {
                !loading && formData.map(generateFormHtml)
            }
        </div>
    )
}

export default Render