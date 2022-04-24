import styled from 'styled-components'

const AnchorButton = styled.a`
	appearance: none;
	position: relative;
	top: 0.4rem;
	background: ${props => (props.red ? 'red' : 'transparent')};
	border-radius: 2rem;
	border: 0;
	box-shadow: 0 0 0 2px #ffff inset;
	color: white !important;
	text-decoration: none;
	cursor: pointer;
	font-size: 1.5rem;
	font-weight: bold;
	height: 3rem;
	letter-spacing: inherit;
	line-height: 2rem;
	margin-bottom: 0;
	margin-top: 0;
	outline: 0;
	overflow: hidden;
	padding: 0.5rem 1rem;
	vertical-align: top;
`

export default AnchorButton
