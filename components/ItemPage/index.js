import styled from 'styled-components'

const Wrapper = styled.div``

const Page = ({ data }) => {
	const { id, name, collectionId } = data

	return (
		<Wrapper>
			{name} [{id}]{JSON.stringify(data)}
		</Wrapper>
	)
}

export default Page
