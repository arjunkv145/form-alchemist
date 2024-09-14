import FormItem from '../../general_components/FormItem';
import TextArea from '../../general_components/Textarea';
import { FormElement } from '../../types/FormElements';
import cloneElement from '../../utils/cloneElement';

type StylingProps = {
    element: FormElement;
    setElement: (value: React.SetStateAction<FormElement>) => void;
};

function Styling({ element, setElement }: StylingProps) {
    return (
        <>
            {'labelStyles' in element && (
                <FormItem label='Custom css for Label' name='labelStyles' initialValue={element.labelStyles}>
                    <TextArea
                        value={element.labelStyles}
                        onChange={(value: string) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('labelStyles' in temp) temp.labelStyles = value;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}

            {'elementStyles' in element && (
                <FormItem
                    label={`Custom css for ${element.elementType === 'button' ? 'button' : 'input'}`}
                    name='elementStyles'
                    initialValue={element.elementStyles}
                >
                    <TextArea
                        value={element.elementStyles}
                        onChange={(value: string) =>
                            setElement((prev) => {
                                const temp = cloneElement(prev);
                                if ('elementStyles' in temp) temp.elementStyles = value;
                                return temp;
                            })
                        }
                    />
                </FormItem>
            )}
        </>
    );
}

export default Styling;
