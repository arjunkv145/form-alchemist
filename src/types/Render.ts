import { FormElement } from './FormElements';

export type RenderProps = {
    formData: FormElement[];
    onSubmit: (data: { [key: string]: string | number | string[] | number[] | boolean }) => void;
};
