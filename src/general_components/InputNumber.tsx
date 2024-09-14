import React from 'react';
import { InputNumber as AntInputNumber, InputNumberProps } from 'antd';
import styled from 'styled-components';

export const StyledInputNumber = styled(AntInputNumber)``;

const InputNumber: React.FC<InputNumberProps> = ({ ...props }) => {
    return <StyledInputNumber {...props} />;
};

export default InputNumber;
