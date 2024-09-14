import React from 'react';
import styled from 'styled-components';
import { Input, InputProps } from 'antd';

export const StyledInput = styled(Input)``;

const InputText: React.FC<InputProps> = ({ ...props }) => {
    return <StyledInput {...props} />;
};

export default InputText;
