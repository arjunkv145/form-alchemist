import React from 'react';
import styled from 'styled-components';
import { Checkbox as AntCheckbox, CheckboxProps } from 'antd';

export const StyledCheckbox = styled(AntCheckbox)``;

const Checkbox: React.FC<CheckboxProps> = ({ children, ...props }) => {
    return <StyledCheckbox {...props}>{children ? children : ''}</StyledCheckbox>;
};

export default Checkbox;
