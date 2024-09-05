import { Form } from 'antd';
import styled, { css } from 'styled-components';

export const StyledFormItem = styled(Form.Item)<{ $labelstyles?: string; $elementstyles?: string }>`
    margin-bottom: 1em;

    & .custom-label {
        ${(props) =>
            props.$labelstyles &&
            css`
                ${props.$labelstyles}
            `}
    }

    & .custom-element {
        ${(props) =>
            props.$elementstyles &&
            css`
                ${props.$elementstyles}
            `}
    }
`;
