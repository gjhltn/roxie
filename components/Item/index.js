import React from 'react'
import styled from 'styled-components'
import Copier from '../Copier'

//import {authorship} from '/helpers/citation'
//import {bibliography, note, wrapInHtmlSpan} from '/helpers/source'


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
background: transparent;
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
			{/*<Citation onClick={e=>handleUpdate(data.id)} dangerouslySetInnerHTML={createMarkup(data)} />*/}
			{JSON.stringify(data)}
		</div>
		</ItemWrapper>



	export default Item