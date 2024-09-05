import React from 'react';
import { CheckboxProps } from 'antd';
import { StyledCheckbox } from './style';

const Checkbox: React.FC<CheckboxProps> = ({ children, ...props }) => {
    return <StyledCheckbox {...props}>{children ? children : ''}</StyledCheckbox>;
};

export default Checkbox;
