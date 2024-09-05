import React from 'react';
import { SelectProps } from 'antd';
import { StyledSelect } from './style';

const Select: React.FC<SelectProps> = ({ ...props }) => {
    return <StyledSelect {...props} />;
};

export default Select;
