import React from 'react';
import styled from 'styled-components';
import { Button as AntButton, ButtonProps } from 'antd';

export const StyledButton = styled(AntButton)``;

const Button: React.FC<ButtonProps> = (props) => {
    return <StyledButton {...props}>{props.children ? props.children : 'send'}</StyledButton>;
};

export default Button;
