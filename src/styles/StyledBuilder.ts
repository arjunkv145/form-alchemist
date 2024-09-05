import styled from 'styled-components';

const StyledBuilder = styled.div`
    width: 100%;
    height: 100%;
    padding: 1em;
    font-family: var(--primary-font);
    display: flex;
    align-items: flex-start;

    & .sidebar {
        padding: 0.6em;
        min-width: 200px;
        background-color: var(--neutral-color-100);
        border-radius: 3px;
    }

    & .sidebar__title {
        margin: 0.4em 0 0.7em 0.7em;
        font-size: 1rem;
        font-weight: normal;
        color: var(--neutral-color-800);
    }

    & .sidebar__item {
        padding: 0.6em 0 0.6em 1em;
        font-size: 0.9rem;
        background-color: var(--neutral-color-100);
        color: var(--neutral-color-800);
        border-radius: 3px;
        transition: background-color 130ms ease-in, color 130ms ease-in;
    }

    & .sidebar__item:hover {
        background-color: var(--primary-color-light);
        color: var(--neutral-color-100);
    }

    & .form-editor {
        width: 100%;
        margin-left: 1em;
    }

    & .form-editor__dropzone {
        padding: 1em;
        width: 100%;
        min-height: 545px;
        background-color: var(--neutral-color-100);
        border: 0.5px solid var(--neutral-color-200);
        border-radius: 3px;

        position: relative;
    }

    & .form-editor__dropzone::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 1.1rem;
        color: var(--neutral-color-400);
    }

    & .form-editor__dropzone.empty::before {
        content: 'Drag and drop form elements here';
    }

    & .form-editor__btn-wrapper {
        margin-top: 1em;
        display: flex;
        justify-content: flex-end;
    }

    & .form-editor__btn-save,
    & .element-editor__btn-submit,
    & .element-editor__btn-cancel,
    & .style-editor__btn-save,
    & .style-editor__btn-cancel {
        padding: 0.4em 0.6em;
        width: 6.25em;
        font-size: 0.9rem;
        text-align: center;
        background-color: var(--primary-color-light);
        color: var(--neutral-color-100);
        border: 1px solid var(--primary-color-light);
        border-radius: 3px;
        cursor: pointer;
        transition: background-color 130ms ease-in, border-color 130ms ease-in, color 130ms ease-in, color 130ms ease-in;
    }

    & .form-editor__btn-save:hover,
    & .element-editor__btn-submit:hover,
    & .style-editor__btn-save:hover {
        background-color: var(--primary-color-dark);
        border-color: var(--primary-color-dark);
    }

    & .element-editor__btn-cancel {
        background-color: var(--neutral-color-100);
        color: var(--primary-color-light);
    }

    & .element-editor__btn-cancel:hover {
        background-color: var(--primary-color-light);
        color: var(--neutral-color-100);
    }

    & .style-editor__btn-cancel {
        background-color: inherit;
        color: var(--primary-color-light);
    }

    & .style-editor__btn-cancel:hover {
        background-color: var(--primary-color-light);
        color: var(--neutral-color-100);
    }

    & .form-element {
        margin: 1em 0;
        padding-top: 0.4em;
        position: relative;

        &.is-dragging {
            opacity: 0.4;
        }
    }

    & .form-element:hover > .form-element__options {
        display: flex;
    }

    & .form-element > .form-element__options {
        position: absolute;
        z-index: 10;
        top: -4px;
        right: 10px;
        align-items: center;
        display: none;
    }

    & .form-element__options button {
        margin: 0.2em 0.3em;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & .form-element__options img {
        width: 17px;
        transition: transform 50ms ease-in;
    }

    & .form-element__options button:hover img {
        transform: scale(1.15);
    }

    & .style-editor {
        margin-left: 1em;
        padding: 0.4em;
        min-width: 350px;
        border-radius: 3px;

        display: none;
        &.show {
            display: block;
        }
    }

    & .style-editor__title {
        margin-bottom: 0.5em;
        font-size: 1.1rem;
        font-weight: normal;
    }

    & .style-editor__editor {
        resize: none;
        width: 100%;
        height: 450px;
        font-size: 0.9rem;
        background-color: var(--neutral-color-100);
        color: var(--neutral-color-800);
        border: 1px solid var(--neutral-color-200);
        border-radius: 3px;
        scrollbar-width: thin;
        scrollbar-color: var(--neutral-color-300) var(--neutral-color-100);
    }

    & .style-editor__btn-wrapper {
        margin-top: 1em;
    }

    & .style-editor__btn-wrapper button {
        margin-right: 0.4em;
    }

    /* & .custom-modal.ant-modal-body {
        background-color: red;
        scrollbar-width: thin !important;
        scrollbar-color: #888 red;
    }

    & .custom-modal.ant-modal-body::-webkit-scrollbar {
        width: 8px;
    }

    & .custom-modal.ant-modal-body::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    & .custom-modal.ant-modal-body::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
    }

    & .custom-modal.ant-modal-body::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    } */
`;

export default StyledBuilder;
