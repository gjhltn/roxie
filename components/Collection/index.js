import React from 'react'
import styled from 'styled-components'
//import Item from '../Item'
import Link from 'next/link'

const Wrapper = styled.div`

`

const Collection = ({ name, items }) => (
	<Wrapper>
		<h2>{name}</h2>
		<ul>
			{items &&
				items.map(item => (
					<li key={item}>
						<Link href='/item/[id]/edit' as={`/item/${item.id}/edit`}>
							<a>{item.name}</a>
						</Link>
					</li>
				))}
		</ul>
	</Wrapper>
	)


	export default Collection