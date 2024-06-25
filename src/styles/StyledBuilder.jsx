import styled from 'styled-components'

export const StyledBuilder = styled.div`
    --primary-color: #874CCC;
    --primary-color-dark: #763bb9;
    --primary-color-light: #9658dc;

    --red-color: #d42b2b;

    --neutral-color-100: hsl(0, 0%, 95%);
    --neutral-color-200: hsl(0, 0%, 90%);
    --neutral-color-300: hsl(0, 0%, 77%);
    --neutral-color-400: hsl(0, 0%, 62%);
    --neutral-color-500: hsl(0, 0%, 46%);
    --neutral-color-600: hsl(0, 0%, 31%);
    --neutral-color-700: hsl(0, 0%, 23%);
    --neutral-color-800: hsl(0, 0%, 19%);
    --neutral-color-900: hsl(0, 0%, 13%);
    --neutral-color-1000: hsl(0, 0%, 10%);

    --primary-font: Verdana, sans-serif;

    &,
    & * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    & input,
    & button,
    & textarea,
    & select {
        font: var(--primary-font);
    }


    & {
        width: 100%;
        height: 100%;
        padding: 1em;
        font-family: var(--primary-font);
        display: flex;
        align-items: flex-start;
    }

    & .builder__sidebar {
        padding: .4em;
        border: 1px solid var(--neutral-color-300);
        border-radius: 3px;
    }

    & .builder__sidebar-item {
        margin: .4em 0;
        padding: .6em 3.8em .6em 1em;
        font-size: .9rem;
        background-color: var(--neutral-color-100);
        color: var(--neutral-color-700);
        border: 1px solid var(--neutral-color-300);
        border-radius: 3px;
        cursor: pointer;
        transition: background-color 130ms ease-in,
                    color 130ms ease-in,
                    border-color 130ms ease-in;
    }

    & .builder__sidebar-item:first-child {
        margin-top: 0;
    }

    & .builder__sidebar-item:last-child {
        margin-bottom: 0;
    }

    & .builder__sidebar-item:hover {
        background-color: var(--primary-color-light);
        color: var(--neutral-color-100);
        border-color: var(--primary-color-dark);
    }

    & .builder__droppoint-wrapper {
        width: 100%;
        margin-left: 1em;
    }

    & .builder__droppoint {
        padding: 1em;
        width: 100%;
        min-height: 545px;
        background-color: var(--neutral-color-100);
        border: 2px dashed var(--neutral-color-300);
        border-radius: 3px;
        transition: border-color 130ms ease-in;

        position: relative;
    }

    & .builder__droppoint::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 1.2rem;
        color: var(--neutral-color-400);
    }

    & .builder__droppoint.show-inst::before {
        content: 'Drag and drop your input fields here';
    }

    & .builder__droppoint.border-color {
        border-color: var(--primary-color)
    }

    & .builder__droppoint .form-item.hidden-input {
        padding-left: 1em;
        width: 100%;
        height: 40px;
        font-size: .9rem;
        color: var(--neutral-color-500);
        border: 1px solid var(--neutral-color-400);
        border-radius: 3px;
        display: flex;
        align-items: center;
    }

    & .builder__btn-wrapper {
        margin-top: 1em;
        display: flex;
        justify-content: flex-end;
    }

    & .builder__btn-save,
    & .builder__popup-btn-submit,
    & .builder__popup-btn-cancel,
    & .builder__style-editor-btn-submit, 
    & .builder__style-editor-btn-cancel {
        padding: .6em;
        width: 6.25em;
        font-size: .9rem;
        text-align: center;
        background-color: var(--primary-color-light);
        color: var(--neutral-color-100);
        border: 2px solid var(--primary-color-light);
        border-radius: 3px;
        cursor: pointer;
        transition: background-color 130ms ease-in,
                    border-color 130ms ease-in,
                    color 130ms ease-in;
    }

    & .builder__popup-btn-cancel,
    & .builder__style-editor-btn-cancel {
        background-color: var(--neutral-color-100);
        color: var(--primary-color-light);
    }

    & .builder__style-editor-btn-submit {
        color: #FFFFFF;
    }

    & .builder__style-editor-btn-cancel {
        background-color: #FFFFFF;
    }

    & .builder__btn-save:hover,
    & .builder__popup-btn-submit:hover,
    & .builder__style-editor-btn-submit:hover {
        background-color: var(--primary-color-dark);
        border-color: var(--primary-color-dark);
    }

    & .builder__popup-btn-cancel:hover,
    & .builder__style-editor-btn-cancel:hover {
        background-color: var(--primary-color-light);
        color: var(--neutral-color-100);
    }

    & .builder__style-editor-btn-cancel:hover {
        background-color: var(--primary-color-light);
        color: #FFFFFF;
    }

    & .builder__droppoint .form-item.container {
        margin: 1.2em 0;
        min-height: 70px;
        border: 2px dashed var(--neutral-color-300);
        border-radius: 3px;
        position: relative;
    }

    & .builder__droppoint .form-item.container::before {
        content: 'Container';
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(-18px);
        font-size: .8em;
        color: var(--neutral-color-600);
    }

    & .builder__droppoint .form-item {
        position: relative;
    }

    & .builder__droppoint .form-item:hover > .form-field-modify-options {
        display: flex;
    }

    & .builder__droppoint .form-item > .form-field-modify-options {
        padding: .1em;
        position: absolute;
        z-index: 10;
        top: -2px;
        right: 10px;
        background-color: var(--neutral-color-100);
        border-radius: 25px;
        display: flex;
        align-items: center;
        display: none;
    }

    & .builder__droppoint .form-item.container > .form-field-modify-options {
        z-index: 150;
        top: -20px;
    }

    & .builder__droppoint .form-field-modify-options button {
        margin: .2em .3em;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & .builder__droppoint .form-field-modify-options img {
        width: 17px;
        transition: transform 50ms ease-in;
    }

    & .builder__droppoint .form-field-modify-options button:hover img {
        transform: scale(1.15);
    }

    & .builder__style-editor {
        margin-left: 1em;
        padding: 1em;
        min-width: 400px;
        background-color: var(--neutral-color-100);
        border-radius: 3px;
    }

    & .builder__style-editor-title {
        margin-bottom: 1em;
    }

    & .builder__style-editor textarea {
        resize: none;
        width: 100%;
        height: 400px;
        font-size: .9rem;
        color: var(--neutral-color-500);
        border: 1px solid var(--neutral-color-400);
        border-radius: 3px;
        scrollbar-width: thin;
        scrollbar-color: var(--neutral-color-300) var(--neutral-color-100);
    }

    & .builder__style-editor-btn-wrapper {
        margin-top: 1em;
    }

    & .builder__style-editor-btn-wrapper button {
        margin-right: .4em;
    }

    & .builder__popup-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        opacity: 0;
        visibility: hidden;
        transition: opacity 150ms ease-in,
                    visibility 150ms ease-in;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & .builder__popup {
        padding: 2em;
        width: 80%;
        max-width: 550px;
        max-height: calc(100vh - 140px);
        background-color: var(--neutral-color-100);
        border-radius: 3px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.07),
        0 2px 4px rgba(0,0,0,0.07),
        0 4px 8px rgba(0,0,0,0.07),
        0 8px 16px rgba(0,0,0,0.07),
        0 16px 32px rgba(0,0,0,0.07),
        0 32px 64px rgba(0,0,0,0.07);
        transform: scale(0.9);
        transition: transform 150ms ease-in;
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: var(--neutral-color-300) var(--neutral-color-100);
        /* firefox code overriding webkit */
    }

    & .builder__popup::-webkit-scrollbar,
    & .builder__style-editor textarea::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    & .builder__popup::-webkit-scrollbar-track,
    & .builder__style-editor textarea::-webkit-scrollbar-track {
        background-color: var(--neutral-color-100);
    }

    & .builder__popup::-webkit-scrollbar-thumb,
    & .builder__style-editor textarea::-webkit-scrollbar-thumb {
        background-color: var(--neutral-color-300);
        border-radius: 10px;
    }

    & .builder__popup::-webkit-scrollbar-thumb:hover,
    & .builder__style-editor textarea::-webkit-scrollbar-thumb:hover {
        background-color: var(--neutral-color-400);
    }

    & .builder__popup-bg.show {
        opacity: 1;
        visibility: visible;
    }

    & .builder__popup-bg.show >  .builder__popup {
        transform: scale(1);
    }

    & .builder__popup-title {
        margin-bottom: 1em;
        text-align: center;
    }

    & .builder__popup form > div {
        margin: .6em 0;
    }

    & .builder__popup input[type=text],
    & .builder__popup input[type=number] {
        padding: .65em .8em;
        width: 100%;
        font-size: .9rem;
        letter-spacing: .5px;
        background-color: var(--neutral-color-100);
        color: var(--neutral-color-800);
        border: 1px solid var(--neutral-color-400);
        border-radius: 3px;
        outline: none;
    }
    
    & .builder__popup input[type=text]::placeholder,
    & .builder__popup input[type=number]::placeholder {
        color: var(--neutral-color-500);
    }

    & .builder__popup form span {
        font-size: .9rem;
        color: var(--neutral-color-500);
        display: block;
    }

    & .builder__popup input[type=radio] {
        display: none;
    }

    & .builder__popup input[type=radio] + label {
        display: inline-block;
        padding: .5em .5em .5em 1em;
        margin-top: .4em;
        width: 48%;
        font-size: .9rem;
        background-color: transparent;
        color: var(--neutral-color-800);
        border: 1px solid var(--neutral-color-400);
        border-radius: 3px;
        cursor: pointer;
        position: relative;
    }

    & .builder__popup span + input[type=radio] + label {
        margin-right: 4%;
    }

    & .builder__popup input[type=radio] + label::before {
        content: '';
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        background-color: var(--neutral-color-100);
        border: 2px solid var(--neutral-color-400);
        border-radius: 25px;
    }

    & .builder__popup input[type=radio]:checked + label::after {
        content: '';
        position: absolute;
        right: 13px;
        top: 50%;
        transform: translateY(-50%);
        width: 9px;
        height: 9px;
        background-color: var(--neutral-color-400);
        border-radius: 25px;
    }

    & .builder__popup select {
        padding: .4em 1.2em .4em .8em;
        width: 100%;
        background-color: transparent;
        color: var(--neutral-color-800);
        border: 1px solid var(--neutral-color-400);
        border-radius: 3px;
        cursor: pointer;
    }

    & .builder__popup-options-wrapper > div {
        padding: 0 .4em;
        margin: 2em 0;
        border: 1px solid var(--neutral-color-300);
        border-radius: 3px;
    }

    & .builder__popup-options-wrapper > div > div {
        margin: .6em 0;
    }

    & .builder__popup-btn-wrapper {
        display: flex;
        justify-content: center;
    }

    & .builder__popup-btn-wrapper button{
        margin: 1em .2em 0;
    }

`