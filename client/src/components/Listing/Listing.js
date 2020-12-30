/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react"
import styled from 'styled-components';
import Modal from 'react-modal';

import Icon, {ICON_TYPE, IconButton} from '../Icon/Icon'
import Copier from '../Copier/Copier'
import BookForm from '../../sources/book/Form'
import ChapterForm from '../../sources/chapter/Form'
import JournalForm from '../../sources/journal/Form'
import Editor  from '../Editor/Editor'
import GlobalStyle from '../GlobalStyle/GlobalStyle'
import Loading from '../Loading/Loading'

import {bibliography, note} from '../../sources/source'

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
	padding: 1rem 2rem;
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
		<div className="right">
			trash
		</div>
	</ToolbarContents>



const Main = styled.main`
	flex:1;
	overflow-y: scroll;
	padding: 1rem 2rem 10rem;
`

const Section = styled.section`
	margin-bottom: 4rem;
`

const ItemWrapper = styled.div`
	background: rgba(0,0,0,0.1);
	display: flex;
	margin-top: 2px;
	padding: 1rem;
	
	.actions {
		flex: 0 0 2rem;
		margin-right: 1rem;
	}
	
	.text {
		flex: 1;
	}
`

const Citation = styled.div`
	  padding-left: 4rem;
	  text-indent: -4rem;
	  color: #bbdaef;
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

const Items = ({data,...props}) => {
	return (
		<>
			{
				data.map((item) => <Item key={data.id} data={item}/>)
			}
		</>
	)
}

const Item = ({data,handleUpdate,handleDelete}) =>
	<ItemWrapper>
		<div className="actions">
			<Copier
				text={note(data)}
				icon={ICON_TYPE.NOTE}/>
		</div>
		<div className="text">
			<Citation>
				{bibliography(data)}
			</Citation>
		</div>
	</ItemWrapper>

	/*
const Author = ({name,data,handleUpdate,handleDelete}) =>
	<AuthorWrapper>
		<div className="Author">{name}</div>
		{
			data.map(d=><Item key={d.id} handleUpdate={handleUpdate} handleDelete={handleDelete} data={d}/>)
		}
	</AuthorWrapper>

const Kind = ({name, allData, handleNew, handleUpdate, handleDelete}) => {
	const data = allData.filter(datum=>datum.type===name)
	const grouped = groupBy(data,
		datum => (datum.authors && datum.authors.length>0) ? names(datum.authors,{flipFirst:true}) : "[anonymous]"
	);
	const allNames = Array.from(grouped.keys()).sort()
	return (
		<Section>
			<SectionHeader>
				<Heading>{name}</Heading>
				<div className="New">
					<IconButton
						handler={e=>handleNew(name)}
						icon={ICON_TYPE.ADD}
						weight="2"
						size="52"
						colour="white"
					/>
				</div>
			</SectionHeader>
						{
				allNames.map(n => <Author key={n}
			handleUpdate={handleUpdate}	handleDelete={handleDelete} name={n} data={grouped.get(n)}/>)
			}
		</Section>
	)
}
*/

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
								handleDelete={deleteFn}
								handleNew={handleNew}
								data={items}/>
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
					closeModalCallback={closeModal}
					formComponent={modalComponent}
					item={modalItem}
					action={modalAction}/>
			</Modal>
		</GlobalStyle>
	)
}

export default Listing;
