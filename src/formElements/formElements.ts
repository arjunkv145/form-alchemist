import {
    buttonStyle,
    checkboxStyle,
    dateStyle,
    numberStyle,
    radioStyle,
    selectStyle,
    textareaStyle,
    textStyle,
    timeStyle
} from '../styles/ElementStyles';

type TextAttributes = {
    type: string;
    id: string;
    name: string;
    placeholder: string;
    required: boolean;
    readOnly: boolean;
    disabled: boolean;
    minLength: number;
    maxLength: number;
};

type NumberAttributes = {
    type: string;
    id: string;
    name: string;
    placeholder: string;
    required: boolean;
    readOnly: boolean;
    disabled: boolean;
    min: number;
    max: number;
};

type TextareaAttributes = {
    id: string;
    name: string;
    placeholder: string;
    required: boolean;
    readOnly: boolean;
    disabled: boolean;
    minLength: number;
    maxLength: number;
    rows: number;
    cols: number;
};

type SelectAttributes = {
    id: string;
    name: string;
    disabled: boolean;
    multiple: boolean;
};

type CheckboxAttributes = {
    type: string;
};

type RadioAttributes = {
    type: string;
    name: string;
};

type DateAttributes = {
    type: string;
    id: string;
    name: string;
    required: boolean;
    readOnly: boolean;
    disabled: boolean;
};

type TimeAttributes = {
    type: string;
    id: string;
    name: string;
    required: boolean;
    readOnly: boolean;
    disabled: boolean;
};

type ButtonAttributes = {
    type: 'button' | 'reset' | 'submit';
    id: string;
    name: string;
    disabled: boolean;
    text: string;
};

type HiddenAttributes = {
    type: string;
    id: string;
    name: string;
};

type FormElementCommonOptions = {
    uid: string;
    pid: string;
    customStyles: string;
};

type NameElement = {
    elementType: 'name';
    label: string;
    attributes: TextAttributes;
} & FormElementCommonOptions;

type EmailElement = {
    elementType: 'email';
    label: string;
    attributes: TextAttributes;
} & FormElementCommonOptions;

type PhoneNumberElement = {
    elementType: 'phone number';
    requireCountryCode: boolean;
    label: string;
    attributes: NumberAttributes;
} & FormElementCommonOptions;

type TextElement = {
    elementType: 'text';
    label: string;
    attributes: TextAttributes;
} & FormElementCommonOptions;

type NumberElement = {
    elementType: 'number';
    label: string;
    attributes: NumberAttributes;
} & FormElementCommonOptions;

type TextareaElement = {
    elementType: 'textarea';
    label: string;
    attributes: TextareaAttributes;
} & FormElementCommonOptions;

type SelectElement = {
    elementType: 'select';
    label: string;
    required: boolean;
    attributes: SelectAttributes;
    optionsCount: number;
    options: {
        text: string[];
        value: string[];
        selected: boolean[];
        disabled: never[];
    };
} & FormElementCommonOptions;

type CheckboxElement = {
    elementType: 'checkbox';
    label: string;
    required: boolean;
    attributes: CheckboxAttributes;
    optionsCount: number;
    options: {
        label: string[];
        id: string[];
        name: string[];
        value: string[];
        checked: boolean[];
        disabled: boolean[];
    };
} & FormElementCommonOptions;

type RadioElement = {
    elementType: 'radio';
    label: string;
    required: boolean;
    attributes: RadioAttributes;
    optionsCount: number;
    options: {
        label: string[];
        id: string[];
        value: string[];
        checked: boolean[];
        disabled: boolean[];
    };
} & FormElementCommonOptions;

type DateElement = {
    elementType: 'date';
    label: string;
    attributes: DateAttributes;
} & FormElementCommonOptions;

type TimeElement = {
    elementType: 'time';
    label: string;
    attributes: TimeAttributes;
} & FormElementCommonOptions;

type ButtonElement = {
    elementType: 'button';
    attributes: ButtonAttributes;
} & FormElementCommonOptions;

type HiddenElement = {
    elementType: 'hidden';
    attributes: HiddenAttributes;
} & FormElementCommonOptions;

export type FormElement =
    | NameElement
    | EmailElement
    | PhoneNumberElement
    | TextElement
    | NumberElement
    | TextareaElement
    | SelectElement
    | CheckboxElement
    | RadioElement
    | DateElement
    | TimeElement
    | ButtonElement
    | HiddenElement;

const formElements: FormElement[] = [
    {
        elementType: 'name',
        uid: '',
        pid: '',
        customStyles: textStyle,
        label: 'Enter name',
        attributes: {
            type: 'text',
            id: '',
            name: 'name',
            placeholder: '',
            required: true,
            readOnly: false,
            disabled: false,
            minLength: 0,
            maxLength: 100
        }
    },
    {
        elementType: 'email',
        uid: '',
        pid: '',
        customStyles: textStyle,
        label: 'Enter email',
        attributes: {
            type: 'text',
            id: '',
            name: 'email',
            placeholder: '',
            required: true,
            readOnly: false,
            disabled: false,
            minLength: 0,
            maxLength: 100
        }
    },
    {
        elementType: 'phone number',
        uid: '',
        pid: '',
        customStyles: numberStyle,
        requireCountryCode: false,
        label: 'Enter phone number',
        attributes: {
            type: 'number',
            id: '',
            name: 'phone_number',
            placeholder: '',
            required: true,
            readOnly: false,
            disabled: false,
            min: 0,
            max: 100
        }
    },
    {
        elementType: 'text',
        uid: '',
        pid: '',
        customStyles: textStyle,
        label: '',
        attributes: {
            type: 'text',
            id: '',
            name: '',
            placeholder: '',
            required: true,
            readOnly: false,
            disabled: false,
            minLength: 0,
            maxLength: 100
        }
    },
    {
        elementType: 'number',
        uid: '',
        pid: '',
        customStyles: numberStyle,
        label: '',
        attributes: {
            type: 'number',
            id: '',
            name: '',
            placeholder: '',
            required: true,
            readOnly: false,
            disabled: false,
            min: 0,
            max: 100
        }
    },
    {
        elementType: 'textarea',
        uid: '',
        pid: '',
        customStyles: textareaStyle,
        label: '',
        attributes: {
            id: '',
            name: '',
            placeholder: '',
            required: true,
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
        pid: '',
        customStyles: selectStyle,
        label: '',
        required: true,
        attributes: {
            id: '',
            name: '',
            disabled: false,
            multiple: false
        },
        optionsCount: 0,
        options: {
            text: [],
            value: [],
            selected: [],
            disabled: []
        }
    },
    {
        elementType: 'checkbox',
        uid: '',
        pid: '',
        customStyles: checkboxStyle,
        label: '',
        required: true,
        attributes: {
            type: 'checkbox'
        },
        optionsCount: 0,
        options: {
            label: [],
            id: [],
            name: [],
            value: [],
            checked: [],
            disabled: []
        }
    },
    {
        elementType: 'radio',
        uid: '',
        pid: '',
        customStyles: radioStyle,
        label: '',
        required: true,
        attributes: {
            type: 'radio',
            name: ''
        },
        optionsCount: 0,
        options: {
            label: [],
            id: [],
            value: [],
            checked: [],
            disabled: []
        }
    },
    {
        elementType: 'date',
        uid: '',
        pid: '',
        customStyles: dateStyle,
        label: '',
        attributes: {
            type: 'date',
            id: '',
            name: '',
            required: true,
            readOnly: false,
            disabled: false
        }
    },
    {
        elementType: 'time',
        uid: '',
        pid: '',
        customStyles: timeStyle,
        label: '',
        attributes: {
            type: 'time',
            id: '',
            name: '',
            required: true,
            readOnly: false,
            disabled: false
        }
    },
    {
        elementType: 'button',
        uid: '',
        pid: '',
        customStyles: buttonStyle,
        attributes: {
            type: 'submit',
            id: '',
            name: '',
            disabled: false,
            text: ''
        }
    },
    {
        elementType: 'hidden',
        uid: '',
        pid: '',
        customStyles: '',
        attributes: {
            type: 'hidden',
            id: '',
            name: ''
        }
    }
];

export default formElements;
