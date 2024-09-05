import { FormElement } from './FormElements';

export type DragElement =
    | {
          isWidget: true;
          elementType: FormElement['elementType'];
      }
    | {
          isWidget: false;
          uid: string;
      }
    | null;

export type ElementEditor = {
    show: boolean;
    element: FormElement | null;
};

export type BuilerProps = {
    formData?: FormElement[];
    onSave: (formData: FormElement[]) => void;
};
