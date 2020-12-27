import React from "react"
import styled from 'styled-components';
import Modal from 'react-modal';

import GlobalStyle from '../GlobalStyle/GlobalStyle'
import ItemList from '../ItemList/ItemList'
import Editor from '../Editor/Editor'
import Splash from '../Splash/Splash'

import {names} from '../../lib/chicago'

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
	})
    return map;
}

const Button = styled.button`
	appearance: none;
	background: ${props => props.red ? "red" : "transparent"};
	border-radius: 2rem;
	border: 0;
	box-shadow:0 0 0 2px #ffff inset;
	color: white;
	cursor: pointer;
	font-size: 1.5rem;
	font-weight: bold;
	height: ${props => props.red ? "1.5rem" : "3rem"};
	letter-spacing: inherit;
	line-height: ${props => props.red ? "1.5rem" : "2rem"};
	margin-bottom: ${props => props.red ? "0" : "2rem"};
	margin-top: ${props => props.red ? "1.7rem" : "0"};
	outline: 0;
	overflow: hidden;
	padding: 0 ${props => props.red ? "1.2rem" : "1rem"};
	vertical-align: top;
`

const Wrapper = styled.div`
	display: flex;
	overflow: hidden;
	height: 100vh;
	height: -webkit-fill-available;
	flex-direction: column;
`

const Header = styled.header`
	flex: 0 0 4rem;
	background: rgba(0,0,0,0.5);
`

const Main = styled.main`
	flex:1;
	overflow-y: scroll;
	padding: 2rem 2rem 10rem;
`

const Section = styled.section`

`

const ItemWrapper = styled.div`
	display: flex;
	margin-top: 1rem;
	padding-bottom: 1rem;
	&:not(:last-child) {
		border-bottom: 1px solid rgba(255,255,255,0.4);
	}
	.Title {
		font-style: italic;
	}
`

const Heading = styled.h2`
	text-transform: capitalize;
`

const AuthorWrapper = styled.div`
	margin-bottom: 2rem;
	.Author {
			border-bottom: 4px solid white;
	padding:0 0 1rem;
	font-weight:800;
	}
`

const SectionHeader = styled.header`
	display: flex;
	h2 {
		flex:1;
		margin: 0 0 1rem;
	}
	.New {
		flex: 0 0 2rem;
	}
`

const Items = ({data,...props}) => {
	return (
		<Kind name="book" allData={data} {...props}/>
	)
}

const Item = ({data}) =>
	<ItemWrapper>
		<div className="Title">{data.title}</div>
	</ItemWrapper>

const Author = ({name,data}) =>
	<AuthorWrapper>
		<div className="Author">{name}</div>
		{
			data.map(d=><Item key={d.id} data={d}/>)
		}
	</AuthorWrapper>

const Kind = ({name, allData, handleNew}) => {
	const data = allData.filter(datum=>datum.type===name)
	const grouped = groupBy(data, 
		datum => (datum.authors && datum.authors.length>0) ? names(datum.authors) : "[anonymous]"
	);
	const allNames = Array.from(grouped.keys()).sort()
	return (
		<Section>
			<SectionHeader>
				<Heading>{name}</Heading>
				<div className="New">
					<Button onClick={e=>handleNew()}>+</Button>
				</div>
			</SectionHeader>
						{
				allNames.map(n => <Author key={n} name={n} data={grouped.get(n)}/>)
			}
		</Section>
	)
}

const Listing = ({
	items,
	loaded,
	createFn
}) => {
	const [selectedId, setSelectedId] = React.useState();
	const [modalIsOpen,setIsOpen] = React.useState(false);
	
	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)
	
	const customStyles = {
  content : {
	  background: '#00366e',
	  border:0,
	  paddingBottom: "60vh",
    top                   : '0',
    left                  : '0',
    right                 : '0',
    bottom                : '0'
  }
};
	
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
						<Wrapper>
							<Main>
							<Items
								handleNew={openModal}
								data={items}/>
							</Main>
														<Header>
								toolbar
								</Header>
						</Wrapper>
					</>
				}
			</Wrapper>
			        <Modal
          isOpen={modalIsOpen}
          
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          
          <button onClick={closeModal}>close</button>
          <Editor item={false} createFn={createFn}/>
		  </Modal>
	</GlobalStyle>
	)
}

export default Listing;
