import styled from 'styled-components'

export const StyledRender = styled.div`
    --red-color: #d42b2b;
    --primary-font: Verdana, sans-serif;

    & .form-item {
        position: relative;
    }

    & .form-item.required::before {
        content:'*';
        position: absolute;
        top: -5px;
        left: -10px;
        color: var(--red-color);
    }

    & .form-field-error {
        margin: .2em 0;
        font-family: var(--primary-font);
        font-size: .85rem;
        color: var(--red-color);
    }
`