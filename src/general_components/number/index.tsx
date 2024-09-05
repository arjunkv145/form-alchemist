import React from 'react';
import { InputNumberProps } from 'antd';
import { StyledInputNumber } from './style';

const Number: React.FC<InputNumberProps> = ({ ...props }) => {
    return <StyledInputNumber {...props} />;
};

export default Number;
