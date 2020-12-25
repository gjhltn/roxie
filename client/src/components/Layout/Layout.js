import React from "react"
import styled from 'styled-components';

import GlobalStyle from '../GlobalStyle/GlobalStyle'
import ItemList from '../ItemList/ItemList'

const Wrapper = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
`
 
const Sidebar = styled.div`
	flex: 0 0 25vw;
	overflow-y scroll;
	background: rgba(0,0,0,0.2);
	border-right: 2px solid rgba(0,0,0,0.5);
`
	
const Document = styled.div`
	padding:1rem;
	flex: 1;
	overflow-y scroll;
`

const Layout = ({
	items,
	saveItem
}) => {
	const [selectedId, setSelectedId] = React.useState(items[0].id);
	return(
		<GlobalStyle>
			<Wrapper>
				<Sidebar>
					<ItemList
						selected={selectedId}
						selectHandler={(item)=>setSelectedId(item.id)}
						items={items} />
				</Sidebar>
				<Document>
					<button onClick={e=>saveItem()}>save</button></Document>	
			</Wrapper>
	</GlobalStyle>
	)
}

export default Layout;
