import styled from 'styled-components';
import { Input } from 'antd';

const { TextArea: AntTextarea } = Input;

export const StyledTextArea = styled(AntTextarea)``;

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
