# Form Alchemist

A customizable React form builder with a drag-and-drop interface. The library provides a `Builder` component for building forms and a `Render` component for rendering and validating them dynamically. You can create, edit, and save forms with ease using JSON data.

## Features

-   Drag-and-drop interface for building forms
-   Support for various form elements like inputs, checkboxes, radio buttons, etc.
-   Dynamic form rendering with validation
-   Ability to save and load form data in JSON format
-   Easy integration with your existing React project

## Installation

```bash
npm install form-alchemist
```

## Usage

#### Builder component

```javascript
import { Builder } from 'form-alchemist';

function App() {
    // Initial form data (optional), used to edit an existing form
	const formData = [];

    // Callback function to handle form saving
    const onSave = formJsonData => {
        console.log('Form saved:', formJsonData);
        // Handle or store form JSON data
    };

    return (
        <Builder
            formData={formData}
            onSave={onSave}
        />
    );
}
```

#### Render component

```javascript
import { Render } from 'form-alchemist';

function App() {
	// Form data generated from the Builder component, passed as a prop to Render.
	const formData = [];

	// Callback function to handle form submission; formValues contains the user's input data.
	const onSubmit = formValues => {
		console.log(formValues);
	};

	return (
		// The Rendered form takes up full width, so it’s wrapped in a container to control layout and styling.
		<div
			style={{
				margin: '40px auto',
				padding: '.5em 1em',
				width: '400px',
				border: '1px solid lightgrey',
				borderRadius: '5px',
			}}
		>
			<Render
				formData={formData}
				onSubmit={onSubmit}
			/>
		</div>
	);
}
```
