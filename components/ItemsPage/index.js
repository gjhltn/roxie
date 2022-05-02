import React, { useState } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { AnchorButton, Collection } from '/components'
import ITEM_TYPE from '/helpers/itemType'

const ALL = { id: -1, name: 'All items' }
const ALL_COLLECTIONS = { id: 0, name: 'All collections' }

const optionify = collection => ({ value: collection.id, label: collection.name })

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
	const [listing, setListing] = useState(optionify(ALL_COLLECTIONS))

	const itemsInCollection = (collectionID, data) =>
		data.items.filter(item => item.collectionID && item.collectionID.includes(collectionID))

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

	var selectedCollections
	const rejectedItems = data.items.filter(item => isNotInAnyCollecfion(item))

	switch (listing.value) {
		case ALL.id:
			selectedCollections = [
				{
					id: ALL.id,
					name: ALL.name,
					items: data.items
				}
			]
			break
		case ALL_COLLECTIONS.id:
			selectedCollections = data.collections.map(collection => ({
				id: collection.id,
				name: collection.name,
				items: itemsInCollection(collection.id, data)
			}))
			if (rejectedItems.length > 0) {
				selectedCollections.push({
					id: null,
					name: '(none)',
					items: rejectedItems
				})
			}
			break
		default:
			selectedCollections = [
				{
					id: listing.value,
					name: listing.label,
					items: itemsInCollection(listing.value, data)
				}
			]
	}

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
				</div>
			</div>
			<main>
				{selectedCollections &&
					selectedCollections.map(c => <Collection key={c} name={c.name} items={c.items} />)}
			</main>{' '}
		</Wrapper>
	)
}

export default Page
