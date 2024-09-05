type TextAttributes = {
    type: string;
    id: string;
    name: string;
    placeholder: string;
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
    readOnly: boolean;
    disabled: boolean;
    min: number;
    max: number;
};

type TextareaAttributes = {
    id: string;
    name: string;
    placeholder: string;
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
    name: string;
};

type RadioAttributes = {
    type: string;
    name: string;
    disabled: boolean;
};

export type DateAttributes = {
    type: string;
    id: string;
    name: string;
    readOnly: boolean;
    disabled: boolean;
};

export type TimeAttributes = {
    type: string;
    id: string;
    name: string;
    readOnly: boolean;
    disabled: boolean;
};

export type ButtonAttributes = {
    type: 'button' | 'reset' | 'submit';
    id: string;
    disabled: boolean;
    placeholder: string;
};

export type NameElement = {
    elementType: 'name';
    label: string;
    attributes: TextAttributes;
    uid: string;
    labelPosition: 'top' | 'left';
    labelStyles: string;
    elementStyles: string;
    required: boolean;
};

export type EmailElement = {
    elementType: 'email';
    label: string;
    attributes: TextAttributes;
    uid: string;
    labelPosition: 'top' | 'left';
    labelStyles: string;
    elementStyles: string;
    required: boolean;
};

export type PhoneNumberElement = {
    elementType: 'phone number';
    requireCountryCode: boolean;
    label: string;
    attributes: NumberAttributes;
    uid: string;
    labelPosition: 'top' | 'left';
    labelStyles: string;
    elementStyles: string;
    required: boolean;
};

export type TextElement = {
    elementType: 'text';
    label: string;
    attributes: TextAttributes;
    uid: string;
    labelPosition: 'top' | 'left';
    labelStyles: string;
    elementStyles: string;
    required: boolean;
};

export type NumberElement = {
    elementType: 'number';
    label: string;
    attributes: NumberAttributes;
    uid: string;
    labelPosition: 'top' | 'left';
    labelStyles: string;
    elementStyles: string;
    required: boolean;
};

export type TextareaElement = {
    elementType: 'textarea';
    label: string;
    attributes: TextareaAttributes;
    uid: string;
    labelPosition: 'top' | 'left';
    labelStyles: string;
    elementStyles: string;
    required: boolean;
};

type SelectOptions = {
    label: string;
    value: string;
    selected: boolean;
    disabled: boolean;
};

export type SelectElement = {
    elementType: 'select';
    label: string;
    attributes: SelectAttributes;
    uid: string;
    labelPosition: 'top' | 'left';
    labelStyles: string;
    elementStyles: string;
    options: SelectOptions[];
    required: boolean;
};

type CheckboxOptions = {
    label: string;
    value: string;
    checked: boolean;
    disabled: boolean;
};

export type CheckboxElement = {
    elementType: 'checkbox';
    label: string;
    attributes: CheckboxAttributes;
    uid: string;
    labelPosition: 'top' | 'left';
    labelStyles: string;
    elementStyles: string;
    options: CheckboxOptions[];
    required: boolean;
};

type RadioOptions = {
    label: string;
    value: string;
    checked: boolean;
    disabled: boolean;
};

export type RadioElement = {
    elementType: 'radio';
    label: string;
    attributes: RadioAttributes;
    uid: string;
    labelPosition: 'top' | 'left';
    labelStyles: string;
    elementStyles: string;
    options: RadioOptions[];
    required: boolean;
};

export type DateElement = {
    elementType: 'date';
    label: string;
    uid: string;
    labelPosition: 'top' | 'left';
    labelStyles: string;
    elementStyles: string;
    attributes: DateAttributes;
    required: boolean;
};

export type TimeElement = {
    elementType: 'time';
    label: string;
    uid: string;
    labelPosition: 'top' | 'left';
    labelStyles: string;
    elementStyles: string;
    attributes: TimeAttributes;
    required: boolean;
};

export type ButtonElement = {
    elementType: 'button';
    attributes: ButtonAttributes;
    uid: string;
    elementStyles: string;
};

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
    | ButtonElement;
