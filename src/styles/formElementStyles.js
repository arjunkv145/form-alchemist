// for text, number, date, time
const style1 = `
    margin-top: .6em;
    display: flex;
    align-items: center;

    & label {
        margin-right: 1em;
        font-family: Verdana, sans-serif;
        font-size: .9rem;
        color: hsl(0, 0%, 31%);
    }
        
    & input {
        padding: .65em .8em;
        width: 100%;
        font-family: Verdana, sans-serif;
        font-size: .9rem;
        background-color: hsl(0, 0%, 100%);
        color: hsl(0, 0%, 19%);
        border: 1px solid hsl(0, 0%, 62%);
        border-radius: 3px;
        outline: none;
    }

    & input::placeholder {
        color: hsl(0, 0%, 46%);
    }
`

// for checkbox and radio
const style2 = `
    margin-top: .6em;

    & span {
        font-family: Verdana, sans-serif;
        font-size: .9rem;
        color: hsl(0, 0%, 46%);
        display: block;
    }

    & input {
        display: none;
    }

    & input + label {
        display: inline-block;
        padding: .5em 3em .5em 1em;
        margin-top: .4em;
        font-family: Verdana, sans-serif;
        font-size: .9rem;
        background-color: transparent;
        color: hsl(0, 0%, 19%);
        border: 1px solid hsl(0, 0%, 62%);
        border-radius: 3px;
        cursor: pointer;
        position: relative;
    }

    & input + label::before {
        content: '';
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        background-color: transparent;
        border: 2px solid hsl(0, 0%, 62%);
        border-radius: 50%;
    }

    & input:checked + label::after {
        content: '';
        position: absolute;
        right: 13px;
        top: 50%;
        transform: translateY(-50%);
        width: 9px;
        height: 9px;
        background-color: hsl(0, 0%, 62%);
        border-radius: 50%;
    }
`

const containerStyle = ``

const textareaStyle = `
    margin-top: .6em;
    width: 100%;

    & label {
        display: block;
        font-family: Verdana, sans-serif;
        font-size: .9rem;
        color: hsl(0, 0%, 31%);
    }

    & textarea {
        margin-top: .4em;
        padding: .4em;
        width: 100%;
        font-family: Verdana, sans-serif;
        font-size: .9rem;
        background-color: hsl(0, 0%, 100%);
        color: hsl(0, 0%, 19%);
        border: 1px solid hsl(0, 0%, 62%);
        border-radius: 3px;
        outline: none;
    }

    & textarea::placeholder {
        color: hsl(0, 0%, 46%);
    }
`

const selectStyle = `
    margin-top: .6em;
    display: flex;
    align-items: center;

    & label {
        margin-right: 1em;
        font-family: Verdana, sans-serif;
        font-size: .9rem;
        color: hsl(0, 0%, 31%);
    }

    & select {
        padding: .4em 1.2em .4em .8em;
        width: 100%;
        font-family: Verdana, sans-serif;
        font-size: .9rem;
        background-color: hsl(0, 0%, 100%);
        color: hsl(0, 0%, 19%);
        border: 1px solid hsl(0, 0%, 62%);
        border-radius: 3px;
        cursor: pointer;
    }
`

const buttonStyle = `
    margin-top: .6em;

    & button {
        margin: .8em 0;
        padding: .7em 2em;
        font-family: Verdana, sans-serif;
        font-size: .9rem;
        background-color: #9658dc;
        color: #f2f2f2;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 130ms ease-in;
    }

    & button:hover {
        background-color: #763bb9;
    }

    & button:disabled {
        cursor: not-allowed;
    }
`

export {
    containerStyle,
    style1 as textStyle,
    style1 as numberStyle,
    style1 as dateStyle,
    style1 as timeStyle,
    textareaStyle,
    selectStyle,
    style2 as checkboxStyle,
    style2 as radioStyle,
    buttonStyle
}