import React from 'react'
import styled from 'styled-components'
import Spinner from '../Spinner/'

const LoadingWrapper = styled.div`
	flex: 1;
`

const Loading = () => (
	<LoadingWrapper>
		<Spinner />
	</LoadingWrapper>
)

export default Loading
