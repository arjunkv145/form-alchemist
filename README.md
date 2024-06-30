# Form Alchemist

Form alchemist provides a form builder component for React that allows users to create forms via a drag-and-drop interface and a form render component to render the created form with dynamic validation.

## Installation

```bash
npm install form-alchemist
```
## Usage
#### Builder component
```javascript
import { Builder } from 'form-builder'
function App() {
    // the form data is passed as a parameter to the build function
    const build = formData => {
        localStorage.setItem('formData', JSON.stringify(formData))
    }
    return <Builder build={build} />
}
```

#### Render component
```javascript
import { Render } from 'form-builder'
function App() {
    // the form data created from the builder component
    form = JSON.stringify(localStorage.getItem('formData'))
    // the form values are passed as a parameter to the submit function
    const submit = formValues => {
        console.log(formValues)
    }
    return (
        // the rendered form takes 100% width, so you can insert it inside a div to adjust the layout
        <div style={{
            margin: '40px auto',
            padding: '.5em 1em',
            width: '400px',
            border: '1px solid lightgrey',
            borderRadius: '5px'
        }}>
            <Render form={form} submit={submit} />
        </div>
    )
}
```