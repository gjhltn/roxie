export const ALL = { id: -1, name: 'All items' }
export const ALL_COLLECTIONS = { id: 0, name: 'All collections' }

export const optionify = collection => ({ value: collection.id, label: collection.name })

export const itemsInCollection = (collectionID, data) =>
data.items.filter(item => item.collectionID && item.collectionID.includes(collectionID))

export const groupItemsByCollection = (collectionId, data, rejectedItems) => {
	let selectedCollections
	
	switch (collectionId) {
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
			if (rejectedItems && rejectedItems.length > 0) {
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
					id: collectionId,
					name: collectionName(collectionId),
					items: itemsInCollection(collectionId, data)
				}
			]
		}
		
		return selectedCollections
}

export const collectionName = (id,data) => "collectionName TODO" 
