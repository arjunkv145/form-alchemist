import React from 'react';
import { InputProps } from 'antd';
import { StyledInput } from './style';

const Text: React.FC<InputProps> = ({ ...props }) => {
    return <StyledInput {...props} />;
};

export default Text;
