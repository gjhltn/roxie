export const STYLE={
	"b": "bibliography",
	"n": "note",
	"bibliography": "bibliography",
	"note": "note",
	"notes": "note",
}

export const oxford = (arr, conjunction, ifempty) => {
    const l = arr.length;
    if (!l) return ifempty;
    if (l<2) return arr[0];
    if (l<3) return arr.join(` ${conjunction} `);
    arr = arr.slice();
    arr[l-1] = `${conjunction} ${arr[l-1]}`;
    return arr.join(", ");
}

export const nameLastFirst = name =>{
	if (!name.first || name.first==="") return name.last
	return `${name.last}, ${name.first}`
}
	
export const nameFirstLast = name =>{
	if (!name.first || name.first==="") return name.last
	return `${name.first} ${name.last}`
}

export const humaniseArray = (arr) => oxford(arr, "and", "")

export const names = arr => {
    const l = arr.length
    if (!l) return ""
	let flat = [nameLastFirst(arr[0])]
	if (l>1) flat = flat.concat(arr.slice(1).map(name=>nameFirstLast(name)))
	return humaniseArray(flat)
}

export const editorOnly = (item) => 
	`${names(item.editors)}, ${item.editors.length>1 ? "eds. " : "ed. "}`

export const authorship = (item,style) => {
	if (style=="bibliography") {
		if (item.authors && item.authors.length == 0) return ""
		if (item.authors) return `${names(item.authors)}. `
		if (item.editors) return editorOnly(item)
	}
	if (style=="notes") {
		if (item.authors){
			if (item.authors.length == 0) return ""
			if (item.authors.length>=4) return `${nameFirstLast(item.authors[0])} et al. , `
			return `${humaniseArray(item.authors.map(author=>nameFirstLast(author)))}, `
		}
		if (item.editors) return `${humaniseArray(item.editors.map(ed=>nameFirstLast(ed)))}, ${item.editors.length>1 ? "eds., " : "ed., "}`
	}
}

export const publication = (publication,style) => {
	const result = `${publication.place}: ${publication.publisher}, ${publication.year}`
	if (style==='notes'){
		//“(Place of Publication: Publisher’s Name, Date of Publication), ”
		return `(${result}), `
	}
	if (style==='bibliography'){
		// “Place of Publication: Publisher’s Name, Date of Publication.”
		return ` ${result}`
	}
}	

export const editors = (item,style) => {
	if (!item.authors || !item.editors || item.editors.length < 1) return ""
	if (style==="bibliography"){
		return ` Edited by ${humaniseArray(item.editors.map(editor=>nameFirstLast(editor)))}.`
	}
	if (style==="notes"){
		return `, ed. ${humaniseArray(item.editors.map(editor=>nameFirstLast(editor)))}`
	}
}

export const translators = (item,style) => {
	if (!item.translators || item.translators.length < 1) return ""
	if (style==="bibliography"){
		return ` Translated by ${humaniseArray(item.translators.map(translator=>nameFirstLast(translator)))}.`
	}
	if (style==="notes"){
		return `, tr. ${humaniseArray(item.translators.map(translator=>nameFirstLast(translator)))}`
	}
}
	
export const bibliographyBook = (item) => 
	`${authorship(item,"bibliography")}_${item.title}_.${editors(item,"bibliography")}${translators(item,"bibliography")}${publication(item.publication,"bibliography")}.`
	
export const noteBook = (item) =>
	`${authorship(item,"notes")}_${item.title}_${editors(item,"notes")}${translators(item,"notes")} ${publication(item.publication,"notes")}XX.`
	

	