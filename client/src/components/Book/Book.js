import React from "react"
import styled from 'styled-components';

const Wrapper = styled.div`
	color: rgba(255,255,255,0.2);
	font-size:4rem;
`
const Field = styled.a`
	appearance: none;
	background: none;
	border: 0;
	cursor: pointer;
	font-size: inherit;
	letter-spacing: inherit;
	padding: 0;
	margin: 0;
	height: auto;
	overflow: visible;
	outline: 0;
	display: inline;
	word-break: break-word;
	  overflow-wrap: break-word;

`
/*
const NameList = ({
	names,
	component
} => {
	const C = component
	return(
		<C>names[0].last</C>
	)
}
*/
const Author = styled(Field)`
  color: tomato;
 `

const Title = styled(Field)`
	color:${props => props.theme.title};
	font-style: italic;
  `

/*
const Field = ({
	
}) => {
	return ()
}*/

const Book = ({
	data,
	mode
}) =>
<>
	<Wrapper>
		<Author onClick={e=>alert("edit author")}>Stoker, Bram</Author>, <Title>{data.title}</Title>
	</Wrapper>
</>
	
export default Book
