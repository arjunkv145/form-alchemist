import styled, { css } from 'styled-components';

const StyledFormElementWrapper = styled.div<{ $customstyles: string }>`
    ${(props) =>
        props.$customstyles &&
        css`
            ${props.$customstyles}
        `}
`;

export default StyledFormElementWrapper;
