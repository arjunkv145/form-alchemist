import { FormElement } from './types/FormElements';

import Builder from './components/Builder';
import GlobalStyle from './styles/GlobalStyle';
// import Render from './components/Render';

function App() {
	return (
		<>
			<GlobalStyle />
			<Builder
				formData={JSON.parse(localStorage.getItem('formData') || '[]') as FormElement[]}
				onSave={formData => localStorage.setItem('formData', JSON.stringify(formData))}
			/>
		</>
	);
	// return (
	//     <div
	//         style={{
	//             margin: '40px auto',
	//             padding: '.5em 1em',
	//             width: '400px',
	//             border: '1px solid lightgrey',
	//             borderRadius: '5px'
	//         }}
	//     >
	//         <Render
	//             formData={JSON.parse(localStorage.getItem('formData') || '[]') as FormElement[]}
	//             onSubmit={(
	//                 data: {
	//                     [key: string]: string | string[];
	//                 }[]
	//             ) => console.log(data)}
	//         />
	//     </div>
	// );
}

export default App;
