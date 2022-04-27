import styled from 'styled-components'

const Columns = styled.div`
	display: flex;
`
export const Column = styled.div`
	flex: ${props => (props.size ? `0 0 ${props.size}` : 1)};
	&:not(:first-child) {
		margin-left: 1rem;
	}
`

export default Columns
