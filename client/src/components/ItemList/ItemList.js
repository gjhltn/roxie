import React from "react"
import styled from 'styled-components';

import Item from '../Item/Item'

const Wrapper = styled.ol`
	border: 10px red solid;
`

const ItemList = ({items}) =>
	<Wrapper>
		{
			items.map(item=><Item key={item.id}data={item}/>)
		}
	</Wrapper>
	
export default ItemList