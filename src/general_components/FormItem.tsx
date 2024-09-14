import React from 'react';
import styled, { css } from 'styled-components';
import { Form, FormItemProps } from 'antd';

export const StyledFormItem = styled(Form.Item)<{ $labelstyles?: string; $elementstyles?: string }>`
    margin-bottom: 1em;

    & label.ant-form-item-required::before {
        display: none !important;
    }

    & label.ant-form-item-required::after {
        content: '*';
        visibility: visible !important;
        color: var(--red-color) !important;
    }

    & .custom-label label {
        ${(props) =>
            props.$labelstyles &&
            css`
                ${props.$labelstyles}
            `}

        &::after {
            content: '*';
            visibility: visible !important;
            color: var(--red-color) !important;
        }
    }

    & .custom-element {
        ${(props) =>
            props.$elementstyles &&
            css`
                ${props.$elementstyles}
            `}
    }
`;

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
