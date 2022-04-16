import React, {useState} from "react"
import styled from 'styled-components'
import Link from 'next/link'
import Select from 'react-select'

const ALL = {id: -1, name:"All items"}
const ALL_COLLECTIONS = {id: 0, name:"All collections"}

const optionify = collection => ({value:collection.id, label:collection.name})

const SelectListingWrapper = styled.div`
	.react-select-container {

		* {
			cursor: pointer;
			color: var(--colour-ink);
			
		}
	}

	.react-select__menu * {
		background: var(--colour-altpaper);
	}

	.react-select__control {
		background: var(--colour-altpaper);
		color: var(--colour-ink) !important;
		border: 0;
		border-radius: 0;
		.react-select__value-container {
			color: var(--colour-ink) !important;
		}
	}
	.react-select__option {
		color: var(--colour-ink) !important;
	}
	`

const Collection = ({name, items}) =>
<>
<h2>{name}</h2>
 <ul>
      {items && items.map((item) => (
        <li key={item}>
          <Link href="/item/[id]/edit" as={`/item/${item.id}/edit`}>
            <a>{item.name}</a>
          </Link>
        </li>
      ))}
	  </ul>
	  </>

const ListingPage = ({data}) => {
	const [ listing, setListing ] = useState(optionify(ALL))
	
	const itemsInCollection = (collectionId, data) => 
   		data.items.filter(
			item => item.collectionId.includes(collectionId)
		)
   
		const options = [ALL,ALL_COLLECTIONS].concat(data.collections).map(collection=>optionify(collection))
		
		var selectedCollections
  switch (listing.value){
	  case ALL.id:
	  	selectedCollections = [{
			id: ALL.id,
			name: ALL.name,
			items: data.items
		}]
		break;
		case ALL_COLLECTIONS.id:
	  	selectedCollections = data.collections.map(
			collection => (
				{
					id: collection.id,
					name: collection.name,
					items: itemsInCollection(collection.id,data)
				}
				))
			break;
		default:
		selectedCollections = [{
			id: listing.value,
			name: listing.label,
			items: itemsInCollection(listing.value, data)
		}]
	}
	
	return (
 	<>
	 <SelectListingWrapper><Select className='react-select-container'
	 classNamePrefix='react-select' value={listing} options={options} onChange={e=>setListing(options.find(option=>option.value===e.value))}/></SelectListingWrapper>
	
	 {
		selectedCollections && selectedCollections.map(c=>
		 <Collection
		 key={c}
		 name={c.name}
		 items={c.items}/>)
	}
	</>
	)
	
}

export default ListingPage

