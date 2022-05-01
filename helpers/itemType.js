import Book from '/helpers/book'
import Chapter from '/helpers/chapter'
import Journal from '/helpers/journal'

const ITEM_TYPE = {
	BOOK: {
		name: 'book',
		typeName: Book
	},
	CHAPTER: {
		name: 'chapter',
		typeName: Chapter
	},
	JOURNAL: {
		name: 'journal',
		typeName: Journal
	}
}

export default ITEM_TYPE

export const getItemType = name => {
	let result
	const o = Object.keys(ITEM_TYPE).find(key => ITEM_TYPE[key].name === name)
	if (o) {
		console.log(o)
		result = ITEM_TYPE[o].typeName
	} else {
		const defaultKey = Object.keys(ITEM_TYPE)[0]
		result = ITEM_TYPE[defaultKey].typeNam
	}
	console.log('result')
	console.log(result)
	return result
}
