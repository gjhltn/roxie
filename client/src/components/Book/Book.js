import React from "react"
import styled from '@emotion/styled'

const SomeText = styled.div`
	color: ${props => props.theme.colors.primary};
	font-size: 20rem;
`

export default function Book (props) {
  return (
    <div >
	<SomeText>some text</SomeText>
	</div>
  )
}
