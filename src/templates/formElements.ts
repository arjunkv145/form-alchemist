import { FormElement } from '../types/FormElements';

const formElements: FormElement[] = [
    {
        elementType: 'name',
        uid: '',
        label: 'Name',
        labelPosition: 'top',
        labelStyles: '',
        elementStyles: '',
        required: true,
        attributes: {
            type: 'text',
            id: '',
            name: 'name',
            placeholder: '',
            readOnly: false,
            disabled: false,
            minLength: 0,
            maxLength: 100
        }
    },
    {
        elementType: 'email',
        uid: '',
        label: 'Email',
        labelPosition: 'top',
        labelStyles: '',
        elementStyles: '',
        required: true,
        attributes: {
            type: 'text',
            id: '',
            name: 'email',
            placeholder: '',
            readOnly: false,
            disabled: false,
            minLength: 0,
            maxLength: 100
        }
    },
    {
        elementType: 'phone number',
        uid: '',
        requireCountryCode: false,
        label: 'Phone number',
        labelPosition: 'top',
        labelStyles: '',
        elementStyles: '',
        required: true,
        attributes: {
            type: 'number',
            id: '',
            name: 'phoneNumber',
            placeholder: '',
            readOnly: false,
            disabled: false,
            min: 0,
            max: 100
        }
    },
    {
        elementType: 'text',
        uid: '',
        label: '',
        labelPosition: 'top',
        labelStyles: '',
        elementStyles: '',
        required: true,
        attributes: {
            type: 'text',
            id: '',
            name: '',
            placeholder: '',
            readOnly: false,
            disabled: false,
            minLength: 0,
            maxLength: 100
        }
    },
    {
        elementType: 'number',
        uid: '',
        label: '',
        labelPosition: 'top',
        labelStyles: '',
        elementStyles: '',
        required: true,
        attributes: {
            type: 'number',
            id: '',
            name: '',
            placeholder: '',
            readOnly: false,
            disabled: false,
            min: 0,
            max: 100
        }
    },
    {
        elementType: 'textarea',
        uid: '',
        label: '',
        labelPosition: 'top',
        labelStyles: '',
        elementStyles: '',
        required: true,
        attributes: {
            id: '',
            name: '',
            placeholder: '',
            readOnly: false,
            disabled: false,
            minLength: 0,
            maxLength: 100,
            rows: 5,
            cols: 40
        }
    },
    {
        elementType: 'select',
        uid: '',
        label: '',
        labelPosition: 'top',
        labelStyles: '',
        elementStyles: '',
        required: true,
        attributes: {
            id: '',
            name: '',
            disabled: false,
            multiple: false
        },
        options: [
            {
                label: '',
                value: '',
                selected: false,
                disabled: false
            }
        ]
    },
    {
        elementType: 'checkbox',
        uid: '',
        label: '',
        labelPosition: 'top',
        labelStyles: '',
        elementStyles: '',
        required: true,
        attributes: {
            type: 'checkbox',
            name: ''
        },
        options: [
            {
                label: '',
                value: '',
                checked: false,
                disabled: false
            }
        ]
    },
    {
        elementType: 'radio',
        uid: '',
        label: '',
        labelPosition: 'top',
        labelStyles: '',
        elementStyles: '',
        required: true,
        attributes: {
            type: 'radio',
            name: '',
            disabled: false
        },
        options: [
            {
                label: '',
                value: '',
                checked: false,
                disabled: false
            }
        ]
    },
    {
        elementType: 'date',
        uid: '',
        label: '',
        labelPosition: 'top',
        labelStyles: '',
        elementStyles: '',
        required: true,
        attributes: {
            type: 'date',
            id: '',
            name: '',
            readOnly: false,
            disabled: false
        }
    },
    {
        elementType: 'time',
        uid: '',
        label: '',
        labelPosition: 'top',
        labelStyles: '',
        elementStyles: '',
        required: true,
        attributes: {
            type: 'time',
            id: '',
            name: '',
            readOnly: false,
            disabled: false
        }
    },
    {
        elementType: 'button',
        uid: '',
        elementStyles: '',
        attributes: {
            type: 'submit',
            id: '',
            disabled: false,
            placeholder: 'submit'
        }
    }
];

export default formElements;
