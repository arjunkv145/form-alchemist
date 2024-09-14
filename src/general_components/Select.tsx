import React from 'react';
import styled from 'styled-components';
import { Select as AntSelect, SelectProps } from 'antd';

export const StyledSelect = styled(AntSelect)``;

const Select: React.FC<SelectProps> = ({ ...props }) => {
    return <StyledSelect {...props} />;
};

export default Select;
