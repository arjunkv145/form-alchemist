import { FormElement } from './FormElements';

export type DragElement = {
    isWidget: boolean;
    elementType: FormElement['elementType'];
    uid: string;
} | null;

export type ElementEditor = {
    show: boolean;
    element: FormElement | null;
};

export type BuilerProps = {
    formData?: FormElement[];
    onSave: (formData: FormElement[]) => void;
};
