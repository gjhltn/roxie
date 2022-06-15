import React, { useState } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { AnchorButton, Collection } from '/components'
import ITEM_TYPE from '/helpers/itemType'
import {ALL, ALL_COLLECTIONS, optionify, itemsInCollection, groupItemsByCollection, collectionName} from '/helpers/collection'



const Wrapper = styled.div`
	main {
		margin: 2rem 4rem;
	}

	.Actionbar{
		position: sticky;
		padding: 1rem 4rem;
		top: 0;
		background: var(--colour-lesspaper);
		display: grid;
		grid-auto-flow: column;
		gap: 1em;
		grid-template-columns: repeat(auto-fit, minmax(10em, 25em));
	
		a+a {
			margin-left:1rem;
		}
  
	}
}
`

const SelectListingWrapper = styled.div`
	position: relative;

	.react-select-container {
		* {
			cursor: pointer;
			color: var(--colour-ink);
		}
	}

	.react-select__menu * {
		background: var(--colour-lesspaper);
	}

	.react-select__control {
		background: var(--colour-lesspaper);
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


const Page = ({ data }) => {
	const [listing, setListing] = useState(optionify(ALL))

	const isNotInAnyCollecfion = item => {
		const c = item.collectionID
		if (!c) {
			return true
		}
		if (c.length <= 0) {
			return true
		}
		return false
	}

	const options = [ALL, ALL_COLLECTIONS]
		.concat(data.collections)
		.map(collection => optionify(collection))

	const rejectedItems = data.items.filter(item => isNotInAnyCollecfion(item))
		
	const selectedCollections = groupItemsByCollection(listing.value, data, rejectedItems)

	return (
		<Wrapper>
			<div className='Actionbar'>
				<SelectListingWrapper>
					<Select
						className='react-select-container'
						classNamePrefix='react-select'
						value={listing}
						options={options}
						onChange={e => setListing(options.find(option => option.value === e.value))}
					/>
				</SelectListingWrapper>
				<div className='buttons'>
					{Object.keys(ITEM_TYPE).map(key => {
						const t = ITEM_TYPE[key]
						return (
							<AnchorButton key={key} href={`/items/create?itemType=${t.name}`}>
								{t.name}
							</AnchorButton>
						)
					})}
					<AnchorButton href={`/api/downloads`}>compile</AnchorButton>
				</div>
			</div>
			<main>
				{selectedCollections &&
					selectedCollections.map(c => <Collection key={c} name={c.name} items={c.items} />)}
					</main>
		</Wrapper>
	)
}

export default Page
