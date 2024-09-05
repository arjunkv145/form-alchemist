import { FormElement } from '../types/FormElements';

import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

const FormElementWrapper: React.FC<{
    children: React.ReactNode;
    uid: string;
    formData: FormElement[];
    onEditElement: (element: FormElement) => void;
    onRemove: (uid: string) => void;
}> = ({ children, uid, formData, onEditElement, onRemove }) => {
    return (
        <>
            <div className='form-element__options'>
                <button
                    onClick={() => {
                        const element = formData.find((fe) => fe.uid === uid);
                        if (!element) return;
                        onEditElement(element);
                    }}
                >
                    <img src={editIcon} alt='edit icon' />
                </button>
                <button onClick={() => onRemove(uid)}>
                    <img src={deleteIcon} alt='delete icon' />
                </button>
            </div>
            {children}
        </>
    );
};

export default FormElementWrapper;
