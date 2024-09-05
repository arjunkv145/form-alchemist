import { StyledTextArea } from './style';

type TextareaProps = {
    value?: string;
    onChange?: (value: string) => void;
};

const TextArea = (props: TextareaProps) => {
    return (
        <StyledTextArea value={props.value || ''} onChange={(e) => props.onChange && props.onChange(e.target.value)} />
    );
};

export default TextArea;
