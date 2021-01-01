/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react"
import styled from 'styled-components';
import Modal from 'react-modal';

import Icon, {ICON_TYPE} from '../Icon/Icon'
import Copier from '../Copier/Copier'
import BookForm from '../../sources/book/Form'
import ChapterForm from '../../sources/chapter/Form'
import JournalForm from '../../sources/journal/Form'
import Editor  from '../Editor/Editor'
import GlobalStyle from '../GlobalStyle/GlobalStyle'
import Loading from '../Loading/Loading'

import {bibliography, note, wrapInHtmlSpan} from '../../sources/source'

Modal.setAppElement('#root')

const AddButton = ({label, onClick}) =>
	<Button
		type="button"
		onClick={onClick}
	>
		<Icon
			icon={ICON_TYPE.PLUS}
			weight="2"
			size="21"
			colour="bbdaef"
		/>
		<span className="label">{label}</span>
	</Button>

const Button = styled.button`
	appearance: none;
	background: rgba(0,0,0,0.3);
	border-radius: 2rem;
	border: 0;
	color: #bbdaef;
	cursor: pointer;
	font-size: 1rem;
	font-weight: bold;
	letter-spacing: inherit;
	margin: 0 1rem 0 0;
	outline: 0;
	overflow: hidden;
	padding: 0.5rem 1rem;
	
	.label {
		margin: 0 1rem;
		display:inline-block;
	}
`
const Count = styled.h1`
	font-size: 2rem;
	margin:0 0 0.5rem;
	font-weight normal;
`


const Wrapper = styled.div`
	display: flex;
	overflow: hidden;
	height: 100vh;
	height: -webkit-fill-available;
	flex-direction: column;
`

const ToolbarContents = styled.header`
	display: flex;
	flex: 0 0 4rem;
	padding: 1rem;
	box-shadow: 0 -5px 1rem rgba(0,0,0,0.6);
	border-top: 1px solid black;
	
	.buttons {
		flex:1;
	}
	
	.right {
		flex: 0 0 2rem;
	}
`

const Toolbar = ({handleNew}) =>
	<ToolbarContents>
		<div className="buttons">
			<AddButton onClick={e=>handleNew("book")} label={"Book"} />
			<AddButton onClick={e=>handleNew("chapter")} label={"Chapter"} />
			<AddButton onClick={e=>handleNew("journal")} label={"Journal"} />
		</div>
	</ToolbarContents>



const Main = styled.main`
	flex:1;
	overflow-y: scroll;
	padding: 1rem 1rem 10rem;
`

const ItemWrapper = styled.div`
	background: rgba(0,0,0,0.1);
	display: flex;
	margin-top: 2px;
	padding:0;
	
	.actions {
		flex: 0 0 2rem;
		padding: 0.75rem 1rem 0.5rem;
	}
	
	.text {
		flex: 1;
	}
`

const Citation = styled.button`
	appearance: none;
	border-radius: 0;
	border: 0;
	color: #bbdaef;
	cursor: pointer;
	letter-spacing: inherit;
	margin: 0;
	outline: 0;
	display: block;
	width: 100%;
	font-size: 23px;
	text-align: left;
	padding: 1rem 1rem 1rem 4rem;
	text-indent: -4rem;
	color: #bbdaef;
	  
	  .author {
		  color: ${props => props.theme.author};
		  font-weight: bold;
	  }
	  
	  .maintitle {
		  color: ${props => props.theme.maintitle};
		  font-style: italic;
		}
		
	.editor {
		color: ${props => props.theme.editor};
	}
	
	.translator {
		color: ${props => props.theme.translator};
	}
	
	.imprint {
		color: ${props => props.theme.imprint};
	}
	
	.title {
		color: ${props => props.theme.title};
	}
	
	.url {
		color: ${props => props.theme.url};
	}
	
	.location {
		color: ${props => props.theme.location};
	}
	
	.number {
		color: ${props => props.theme.number};
	}
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
	margin-bottom: 2rem;
	h2 {
		flex:1;
		margin: 0 0 1rem;
		font-weight: bold;
	}
	.New {
		flex: 0 0 2rem;
	}
`

const Items = ({data,handleUpdate,...props}) => {
	return (
		<>
			<Count><strong>{data.length}</strong> items</Count>
			{
				data.map((item) => <Item handleUpdate={handleUpdate}key={data.id} data={item}/>)
			}
		</>
	)
}

function createMarkup(data) {
  return {__html: bibliography(data,wrapInHtmlSpan).replace(/_/g, '')};
}

const Item = ({data,handleUpdate,handleDelete}) =>
	<ItemWrapper>
		<div className="actions">
			<Copier
				text={note(data)}
				icon={ICON_TYPE.NOTE}/>
		</div>
		<div className="text">
			<Citation onClick={e=>handleUpdate(data.id)} dangerouslySetInnerHTML={createMarkup(data)} />
		</div>
	</ItemWrapper>

const Listing = ({
	items,
	loaded,
	createFn,
	deleteFn,
	updateFn
}) => {
	const [modalIsOpen,setIsOpen] = React.useState(false);
	const [modalAction, setModalAction] = React.useState()
	const [modalItem, setModalItem] = React.useState()
	const [modalComponent, setModalComponent] = React.useState()
	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	const sortItems = (items) => {
		let anon = items
			.filter(item=>item.type==="book")
			.filter(item=>!(!item.authors || item.authors.length>0))
			.sort((a, b) => (a.title > b.title) ? 1 : -1)
		let authored = items.filter(item=>item.authors && item.authors.length>0).sort((a, b) => ((a.authors[0].last + a.authors[0].first).toLowerCase() > (b.authors[0].last + b.authors[0].first).toLowerCase()) ? 1 : -1)
		
		return anon.concat(authored)
	}
	
	
	const componentForType = type => {
		switch (type) {
			case 'book': return(BookForm)
			case 'chapter': return(ChapterForm)
			case 'journal': return(JournalForm)
			default: return
		}
	}

	const handleNew = (kind) => {
		setModalComponent(()=>componentForType(kind))
		setModalAction(()=>createFn)
		setModalItem(null)
		openModal()
	}

	const handleUpdate = (id) => {
		const item = items.find(item=>item.id===id)
		setModalComponent(()=>componentForType(item.type))
		setModalAction(()=>updateFn)
		setModalItem(item)
		openModal();
	}

	const customStyles = {
		content : {
			background: '#002451',
			border:0,
			paddingBottom: "60vh",
			top: '0',
			left: '0',
			right: '0',
			bottom: '0',
			padding: '0'
	}
};

	return(
		<GlobalStyle>
			<Wrapper>
				<Main>
					{
						!loaded ?
							<Loading/>
						:
							<Items
								handleUpdate={handleUpdate}
								handleNew={handleNew}
								data={sortItems(items)}/>
					}
				</Main>
				<Toolbar handleNew={handleNew} />
			</Wrapper>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<Editor
					handleDelete={deleteFn}
					closeModalCallback={closeModal}
					formComponent={modalComponent}
					item={modalItem}
					action={modalAction}/>
			</Modal>
		</GlobalStyle>
	)
}

export default Listing;
