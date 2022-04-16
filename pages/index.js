import React, {useState} from "react"
import styled from 'styled-components'
import useSwr from 'swr'
import Link from 'next/link'
import Select from 'react-select'

const fetcher = (url) => fetch(url).then((res) => res.json())

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

export default function Index() {
  const { data, error } = useSwr('/api/items', fetcher)
  const [ listing, setListing ] = useState(optionify(ALL))
  
   if (error ) return <div>Failed to load items</div>
   if (!data ) return <div>Loading...</div>
  
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

const Collection = ({name, items}) =>
<>
<h2>{name}</h2>
 <ul>
      {items && items.map((item) => (
        <li key={item}>
          <Link href="/item/[id]" as={`/item/${item.id}`}>
            <a>{item.name}</a>
          </Link>
        </li>
      ))}
	  </ul>
</>