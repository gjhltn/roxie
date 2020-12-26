export const check = item => {
	let f = (x) => false
	if (item && item.type) {
		switch(item.type) {
			case "book": f = book; break
			case "chapter": f = chapter; break
			case "article": f = article; break
		}
	}
	return f(item)
}

export const namesIfPresentValid = arr => {
	if (arr===undefined) return true
	const s = arr.map(
		n
	)
	return true
}

export const valid = s =>
	!!(
		s &&
		(typeof s === 'string' || s instanceof String) &&
		s.trim().length>0
	)
	
export const title = item => 
	!!(
		valid(item.title)
	)

export const publication = item =>
	!!(
		item.publication &&
		valid(item.publication.place) &&
		valid(item.publication.publisher) &&
		valid(item.publication.year)
	)
	
export const book = item => 
	!!(
		title(item) && 
		publication(item)
	)

export const article = item => {
	return false
}

export const chapter = item => {
	return false
}