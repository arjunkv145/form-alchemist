import React from 'react';
import { FormItemProps } from 'antd';
import { StyledFormItem } from './style';

const FormItem: React.FC<FormItemProps & { labelStyles?: string; elementStyles?: string }> = ({
    children,
    labelStyles,
    elementStyles,
    ...props
}) => {
    return (
        <StyledFormItem $labelstyles={labelStyles} $elementstyles={elementStyles} {...props}>
            {children}
        </StyledFormItem>
    );
};

export default FormItem;
