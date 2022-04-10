import React from "react"
import styled from 'styled-components';

const Wrapper = styled.div`
	margin:0;
	padding:0;
`

const Thing = styled.div`
	color: ${props => props.theme.author};
	
	.strong {
		font-weight: 800;
		background: red;
	}
`

const BigThing = styled(Thing)`
	font-size: 4rem;
`

const X = ({
	
})	=>
	<Wrapper>
		<Thing>New <span className="strong">woo</span></Thing>
		<BigThing>New</BigThing>
	</Wrapper>
	
	export default X