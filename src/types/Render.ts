import { FormElement } from './FormElements';

export type RenderProps = {
    formData: FormElement[];
    onSubmit: (
        data: {
            [key: string]: string | string[];
        }[]
    ) => void;
};
