import styled from 'styled-components';

const StyledRender = styled.div`
	& .form-element {
		position: relative;
	}

	& .form-element.required::before {
		content: '*';
		position: absolute;
		top: -5px;
		left: -10px;
		color: var(--red-color);
	}

	& .form-element__error-message {
		margin: 0.2em 0;
		font-family: var(--primary-font);
		font-size: 0.85rem;
		color: var(--red-color);
	}
`;

export default StyledRender;
