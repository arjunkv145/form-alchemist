import React from 'react';
import { ButtonProps } from 'antd';
import { StyledButton } from './style';

const Button: React.FC<ButtonProps> = (props) => {
    return <StyledButton {...props}>{props.children ? props.children : 'send'}</StyledButton>;
};

export default Button;
