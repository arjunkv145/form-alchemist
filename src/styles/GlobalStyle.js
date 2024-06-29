import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    :root {
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
    }

    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
    }
`

export default GlobalStyle