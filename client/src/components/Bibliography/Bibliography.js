import React from "react"
import styled from 'styled-components';

import {bibliography, wrapInHtmlSpan} from '../../sources/source'
import {sortItems} from '../Listing/Listing';

const BibliographyPage = styled.article`
	padding: 4rem;
`

const ItemWrapper = styled.div`
	  .maintitle {
		  font-style: italic;
	  }
`

function createMarkup(data) {
  return {__html: bibliography(data,wrapInHtmlSpan).replace(/_/g, '')};
}

const Item = ({data}) =>
	<ItemWrapper>
		<div dangerouslySetInnerHTML={createMarkup(data)} />
	</ItemWrapper>


const Bibliography = ({items}) =>
	<BibliographyPage>
		{
			items && sortItems(items).map((item) => <Item data={item}/>)
		}
	</BibliographyPage>
	
export default Bibliography
