/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react"
import styled from 'styled-components';
import Modal from 'react-modal';

import {ICON_TYPE, IconButton} from '../Icon/Icon'
import Button from '../Button/Button'
import Copier from '../Copier/Copier'
import Editor, {BookForm, ChapterForm, JournalForm} from '../Editor/Editor'
import GlobalStyle from '../GlobalStyle/GlobalStyle'
import Loading from '../Loading/Loading'

import {names, groupBy} from '../../lib/chicago'

Modal.setAppElement('#root')

const Wrapper = styled.div`
	display: flex;
	overflow: hidden;
	height: 100vh;
	height: -webkit-fill-available;
	flex-direction: column;
`

const Toolbar = styled.header`
	flex: 0 0 4rem;
	background: rgba(0,0,0,0.5);
	padding: 2rem 2rem 0;
`

const Main = styled.main`
	flex:1;
	overflow-y: scroll;
	padding: 2rem 2rem 10rem;
`

const Section = styled.section`
	margin-bottom: 4rem;
`

const ItemWrapper = styled.div`
	display: flex;
	margin-top: 1rem;
	padding-bottom: 1rem;
	&:not(:last-child) {
		border-bottom: 1px solid rgba(255,255,255,0.4);
	}

	.Title {
		flex: 1;
		font-style: italic;
		display: block;
		color: white !important;
		text-decoration: none;
	}

	.Delete {
		margin-top: -6px;
		flex: 0 0 48px;
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
				["book","chapter","journal"].map(kind =>
					<Kind key={kind} name={kind} allData={data} {...props}/>)
			}
		</>
	)
}

const Item = ({data,handleUpdate,handleDelete}) =>
	<ItemWrapper>
	<Copier
		text={"i wish this worked " + data.title}
		icon={ICON_TYPE.NOTE}/>
	<Copier
		text="i wish this worked"
		icon={ICON_TYPE.BIBLIOG}/>
		<a onClick={e=>handleUpdate(data.id)} href="#" className="Title">{data.title}</a>
		<div className="Delete">
			<IconButton
				handler={e=>handleDelete(data.id)}
				icon={ICON_TYPE.CROSS}
				weight="2"
				size="32"
				colour="pink"
			/>
		</div>
	</ItemWrapper>

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
		datum => (datum.authors && datum.authors.length>0) ? names(datum.authors) : "[anonymous]"
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
				<Toolbar>
					<Button onClick={(e)=>alert('Yes, if only this button worked')}>Generate Bibliography</Button>
				</Toolbar>
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
