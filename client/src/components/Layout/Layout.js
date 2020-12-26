import React from "react"
import styled from 'styled-components';

import GlobalStyle from '../GlobalStyle/GlobalStyle'
import ItemList from '../ItemList/ItemList'
import Editor from '../Editor/Editor'
import Splash from '../Splash/Splash'

const Wrapper = styled.div`
	display: flex;
	overflow: hidden;
	height: 100vh;
`
 
const Sidebar = styled.div`
	flex: 0 0 25vw;
	overflow-y scroll;
	background: rgba(0,0,0,0.2);
	box-shadow:   inset 0 0 20px #000;
`
	
const Document = styled.div`
	flex: 1;
	overflow-y scroll;
	padding-bottom: 4rem;
`

const Layout = ({
	items,
	loaded,
	saveItem
}) => {
	const [selectedId, setSelectedId] = React.useState();
	return(
		<GlobalStyle>
			<Wrapper>
				{
					(!loaded) ?
						<Splash 
							status="loading"
						/>
					:
						<>
							<Sidebar>
								<ItemList
									selected={selectedId}
								selectHandler={(item)=>setSelectedId(item.id)}
									items={items} />
							</Sidebar>
							<Document>
								<Editor
									saveHandler={saveItem}
									item={selectedId===undefined ? false : items.filter(i=>i.id===selectedId)[0]}
								/>
							</Document>	
						</>
				}
			</Wrapper>
	</GlobalStyle>
	)
}

export default Layout;
