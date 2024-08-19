import styled from 'styled-components';

const StyledBuilder = styled.div`
	width: 100%;
	height: 100%;
	padding: 1em;
	font-family: var(--primary-font);
	display: flex;
	align-items: flex-start;

	& .sidebar {
		padding: 0.4em;
		border: 1px solid var(--neutral-color-300);
		border-radius: 3px;
	}

	& .sidebar-item {
		margin: 0.4em 0;
		padding: 0.6em 3.8em 0.6em 1em;
		font-size: 0.9rem;
		background-color: var(--neutral-color-100);
		color: var(--neutral-color-700);
		border: 1px solid var(--neutral-color-300);
		border-radius: 3px;
		cursor: pointer;
		transition: background-color 130ms ease-in, color 130ms ease-in, border-color 130ms ease-in;
	}

	& .sidebar-item:first-child {
		margin-top: 0;
	}

	& .sidebar-item:last-child {
		margin-bottom: 0;
	}

	& .sidebar-item:hover {
		background-color: var(--primary-color-light);
		color: var(--neutral-color-100);
		border-color: var(--primary-color-dark);
	}

	& .form-editor {
		width: 100%;
		margin-left: 1em;
	}

	& .form-editor__droppoint {
		padding: 1em;
		width: 100%;
		min-height: 545px;
		background-color: var(--neutral-color-100);
		border: 2px dashed var(--neutral-color-300);
		border-radius: 3px;
		transition: border-color 130ms ease-in;

		position: relative;
	}

	& .form-editor__droppoint::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		font-size: 1.2rem;
		color: var(--neutral-color-400);
	}

	& .form-editor__droppoint.show-inst::before {
		content: 'Drag and drop your input fields here';
	}

	& .form-editor__droppoint.border-color {
		border-color: var(--primary-color);
	}

	& .form-editor__droppoint .form-element.hidden-input {
		padding-left: 1em;
		width: 100%;
		height: 40px;
		font-size: 0.9rem;
		color: var(--neutral-color-500);
		border: 1px solid var(--neutral-color-400);
		border-radius: 3px;
		display: flex;
		align-items: center;
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
		padding: 0.6em;
		width: 6.25em;
		font-size: 0.9rem;
		text-align: center;
		border: 2px solid var(--primary-color-light);
		border-radius: 3px;
		cursor: pointer;
		transition: background-color 130ms ease-in, border-color 130ms ease-in, color 130ms ease-in;
	}

	& .form-editor__btn-save,
	& .element-editor__btn-submit,
	& .style-editor__btn-save {
		background-color: var(--primary-color-light);
		color: var(--neutral-color-100);
	}

	& .form-editor__btn-save:hover,
	& .element-editor__btn-submit:hover,
	& .style-editor__btn-save:hover {
		background-color: var(--primary-color-dark);
		border-color: var(--primary-color-dark);
	}

	& .element-editor__btn-cancel,
	& .style-editor__btn-cancel {
		background-color: var(--neutral-color-100);
		color: var(--primary-color-light);
	}

	& .element-editor__btn-cancel:hover,
	& .style-editor__btn-cancel:hover {
		background-color: var(--primary-color-light);
		color: var(--neutral-color-100);
	}

	& .form-editor__droppoint .form-element {
		position: relative;

		&.is-dragging {
			opacity: 0.3;
		}
	}

	& .form-editor__droppoint .form-element--container {
		margin: 1.2em 0;
		min-height: 70px;
		padding: 3em 0;
		border: 2px dashed var(--neutral-color-300);
		border-radius: 3px;
		position: relative;
	}

	& .form-editordroppoint .form-element--container::before {
		content: 'Container';
		position: absolute;
		top: 0;
		left: 0;
		transform: translateY(-18px);
		font-size: 0.8em;
		color: var(--neutral-color-600);
	}

	& .form-editor__droppoint .form-element:hover > .form-element__modify-options {
		display: flex;
	}

	& .form-editor__droppoint .form-element > .form-element__modify-options {
		padding: 0.1em;
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

	& .form-editor__droppoint .form-element--container > .form-element__modify-options {
		z-index: 150;
		top: -20px;
	}

	& .form-editor__droppoint .form-element__modify-options button {
		margin: 0.2em 0.3em;
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	& .form-editor__droppoint .form-element__modify-options img {
		width: 17px;
		transition: transform 50ms ease-in;
	}

	& .form-editor__droppoint .form-element__modify-options button:hover img {
		transform: scale(1.15);
	}

	& .style-editor {
		margin-left: 1em;
		padding: 1em;
		min-width: 400px;
		background-color: var(--neutral-color-100);
		border-radius: 3px;
	}

	& .style-editor__title {
		margin-bottom: 1em;
	}

	& .style-editor__editor {
		resize: none;
		width: 100%;
		height: 400px;
		font-size: 0.9rem;
		color: var(--neutral-color-500);
		border: 1px solid var(--neutral-color-400);
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

	& .element-editor--popup-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		opacity: 0;
		visibility: hidden;
		transition: opacity 150ms ease-in, visibility 150ms ease-in;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	& .element-editor--popup {
		padding: 2em;
		width: 80%;
		max-width: 550px;
		max-height: calc(100vh - 140px);
		background-color: var(--neutral-color-100);
		border-radius: 3px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
			0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
		transform: scale(0.9);
		transition: transform 150ms ease-in;
		overflow-y: scroll;
		scrollbar-width: thin;
		scrollbar-color: var(--neutral-color-300) var(--neutral-color-100);
		/* firefox code overriding webkit */
	}

	& .element-editor::-webkit-scrollbar,
	& .style-editor__editor::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	& .element-editor::-webkit-scrollbar-track,
	& .style-editor__editor::-webkit-scrollbar-track {
		background-color: var(--neutral-color-100);
	}

	& .element-editor::-webkit-scrollbar-thumb,
	& .style-editor__editor::-webkit-scrollbar-thumb {
		background-color: var(--neutral-color-300);
		border-radius: 10px;
	}

	& .element-editor::-webkit-scrollbar-thumb:hover,
	& .style-editor__editor::-webkit-scrollbar-thumb:hover {
		background-color: var(--neutral-color-400);
	}

	& .element-editor--popup-bg.show {
		opacity: 1;
		visibility: visible;
	}

	& .element-editor--popup-bg.show > .element-editor--popup {
		transform: scale(1);
	}

	& .element-editor__title {
		margin-bottom: 1em;
		text-align: center;
	}

	& .element-editor form > div {
		margin: 0.6em 0;
	}

	& .element-editor input[type='text'],
	& .element-editor input[type='number'] {
		padding: 0.65em 0.8em;
		width: 100%;
		font-size: 0.9rem;
		letter-spacing: 0.5px;
		background-color: var(--neutral-color-100);
		color: var(--neutral-color-800);
		border: 1px solid var(--neutral-color-400);
		border-radius: 3px;
		outline: none;
	}

	& .element-editor input[type='text']::placeholder,
	& .element-editor input[type='number']::placeholder {
		color: var(--neutral-color-500);
	}

	& .element-editor form span {
		font-size: 0.9rem;
		color: var(--neutral-color-500);
		display: block;
	}

	& .element-editor input[type='radio'] {
		display: none;
	}

	& .element-editor input[type='radio'] + label {
		display: inline-block;
		padding: 0.5em 0.5em 0.5em 1em;
		margin-top: 0.4em;
		width: 48%;
		font-size: 0.9rem;
		background-color: transparent;
		color: var(--neutral-color-800);
		border: 1px solid var(--neutral-color-400);
		border-radius: 3px;
		cursor: pointer;
		position: relative;
	}

	& .element-editor span + input[type='radio'] + label {
		margin-right: 4%;
	}

	& .element-editor input[type='radio'] + label::before {
		content: '';
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		width: 12px;
		height: 12px;
		background-color: var(--neutral-color-100);
		border: 1px solid var(--neutral-color-400);
		border-radius: 25px;
	}

	& .element-editor input[type='radio']:checked + label::after {
		content: '';
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		width: 8px;
		height: 8px;
		background-color: var(--neutral-color-400);
		border-radius: 25px;
	}

	& .element-editor select {
		padding: 0.4em 1.2em 0.4em 0.8em;
		width: 100%;
		background-color: transparent;
		color: var(--neutral-color-800);
		border: 1px solid var(--neutral-color-400);
		border-radius: 3px;
		cursor: pointer;
	}

	& .element-editor .element-editor__input-options-wrapper {
		margin-top: 1.6em;
		padding: 0 0.4em;
		border: 1px solid var(--neutral-color-300);
		border-radius: 3px;
	}

	& .element-editor .element-editor__input-options-wrapper > div {
		margin: 0.5em 0;
	}

	& .element-editor__btn-wrapper {
		display: flex;
		justify-content: center;
	}

	& .element-editor__btn-wrapper button {
		margin: 1em 0.2em 0;
	}
`;

export default StyledBuilder;
