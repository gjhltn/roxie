import styled from 'styled-components'

const Wrapper = styled.div`

`

const Page = ({ data }) => {
	let id, name
	if (data.current) {
		id = data.current.id
		name = data.current.name
	}
	
	return (
		<Wrapper>
			{name} [{id}]
		</Wrapper>
	)
}

export default Page
