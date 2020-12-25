import React from "react"
import styled from 'styled-components';

const Wrapper = styled.li`
	padding:0;
	margin:0;
	text-indent:0;
`

const Button = styled.button`
	appearance: none;
	border: 0;
	cursor: pointer;
	font-size: inherit;
	padding: 1rem;
	margin: 0;
	outline: 0;
	color:#fff;
	border-bottom: 2px solid rgba(0,0,0,0.3);
	border-right:  ${props => props.selected ? 0 : "2px solid rgba(0,0,0,0.3)"};
	background: ${props => props.selected ? (props => props.theme.bg) : "transprent"};
	width: 100%;
	text-align: left;
`

const Item = ({
	data,
	clickHandler,
	isSelected
})	=>
	<Wrapper>
		<Button selected={isSelected} onClick={e=>clickHandler(data)}>{data.title}</Button>
	</Wrapper>
	
export default Item