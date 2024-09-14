import { FormElement } from './types/FormElements';

import Builder from './components/Builder';
// import Render from './components/Render';

function App() {
    return (
        <>
            <Builder
                formData={JSON.parse(localStorage.getItem('formData') || '[]') as FormElement[]}
                onSave={(formData) => localStorage.setItem('formData', JSON.stringify(formData))}
            />
            {/* <div
                style={{
                    margin: '40px auto',
                    padding: '1em 1em .5em',
                    width: '400px',
                    border: '1px solid lightgrey',
                    borderRadius: '5px'
                }}
            >
                <Render
                    formData={JSON.parse(localStorage.getItem('formData') || '[]') as FormElement[]}
                    onSubmit={(values) => console.log(values)}
                />
            </div> */}
        </>
    );
}

export default App;
