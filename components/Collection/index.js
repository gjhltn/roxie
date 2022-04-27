import React from 'react'
import styled from 'styled-components'
import Item from '../Item'

const Wrapper = styled.div`
	h2 {
		font-weight: normal;
		opacity: 0.3;
		font-size: 1.5rem;
	}
	ul,
	li {
		margin: 0;
		list-style-type: none;
		list-style: none;
		text-indent: 0;
		padding: 0;
	}
`

const Collection = ({ name, items }) => (
	<Wrapper>
		<h2>
			{name} [{items.length}]
		</h2>
		<ul>{items && items.map(item => <Item data={item} key={item.id} />)}</ul>
	</Wrapper>
)

export default Collection
