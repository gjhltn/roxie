import React from "react"
import styled from 'styled-components';

const Wrapper = styled.div`
	flex:1;
	display: flex;
	  align-items: center;
	  justify-content: center;
`

const Payload = styled.div`
	flex:1;
	background: rgba(0,0,0,0.5);
	 max-width: 50%;
	 text-align: center;
	 box-shadow: 12px 12px 2px 1px rgba(0, 0, 0, .2);
	 padding:1rem;
`

const Title = styled.h1`
	color: white;
	margin: 0;
	font-size: 4rem;
	font-weight: normal;
	text-transform: lowercase;
	font-variant: small-caps;
	letter-spacing: 2rem;
`

const Status= styled.div`
	color: ${props => props.theme.author};
`

const Splash = ({
	status
})	=>
	<Wrapper>
		<Payload>
			<Title>roxie</Title>
			<Status>{status}</Status>
		</Payload>
	</Wrapper>
	
export default Splash