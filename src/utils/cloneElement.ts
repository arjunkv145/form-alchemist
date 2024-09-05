import { FormElement } from '../types/FormElements';

function cloneElement(element: FormElement): FormElement {
    const clone = {
        ...element,
        attributes: { ...element.attributes },
        ...('options' in element ? { options: element.options.map((option) => ({ ...option })) } : {})
    };
    return clone as FormElement;
}

export default cloneElement;
