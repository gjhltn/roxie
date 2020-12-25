import React from "react"
import styled from 'styled-components';

import Item from '../Item/Item'

const Wrapper = styled.ol`
	  list-style-type: none;
	  margin: 0;
	  padding: 0;
`

const ItemList = ({
	items,
	selectHandler,
	selected
}) =>
	<Wrapper>
		{
			items.map(item=>
				<Item
					key={item.id}
					data={item}
					clickHandler={selectHandler}
					isSelected={item.id===selected}
				/>)
		}
	</Wrapper>
	
export default ItemList