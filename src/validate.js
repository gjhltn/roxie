export const check = (item) => {
	const fail = [false,"Invalid type"]
	if (!item || !item.type) return fail
	switch(item.type) {
		case "book": return book(item)
		case "chapter": return chapter(item)
		case "article": return article(item)
		default: return fail
	}
}

export const book = (item) => {
	return [false,"Invalid book"]
}

export const chapter = (item) => {
	return [false,"Invalid chapter"]
}

export const article = (item) => {
	return [false,"Invalid article"]
}