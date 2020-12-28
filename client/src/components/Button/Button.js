import styled from 'styled-components';

const Button = styled.button`
	appearance: none;
	background: ${props => props.red ? "red" : "transparent"};
	border-radius: 2rem;
	border: 0;
	box-shadow:0 0 0 2px #ffff inset;
	color: white;
	cursor: pointer;
	font-size: 1.5rem;
	font-weight: bold;
	height: "3rem";
	letter-spacing: inherit;
	line-height: 2rem;
	margin-bottom: 2rem;
	margin-top: 0;
	outline: 0;
	overflow: hidden;
	padding: 0 1rem;
	vertical-align: top;
`

export default Button
