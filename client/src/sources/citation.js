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

export const humaniseArray = (arr) => oxford(arr, "and", "")

export const nameLastFirst = name =>{
	if (!name.first || name.first==="") return name.last
	return `${name.last}, ${name.first}`
}

export const nameFirstLast = name =>{
	if (!name.first || name.first==="") return name.last
	return `${name.first} ${name.last}`
}

export const names = (arr,flipFirst=false) => {
    const l = arr.length
    if (!l) return ""
	let flat = []
	
	if (flipFirst) {
		flat = [nameLastFirst(arr[0])]
		if (l>1) flat = flat.concat(arr.slice(1).map(name=>nameFirstLast(name)))
	} else {
		flat = arr.map(name=>nameFirstLast(name))
	}
	return humaniseArray(flat)
}

/*
export const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
	})
    return map;
}







export const editorOnly = (item) =>
	`${names(item.editors)}, ${item.editors.length>1 ? "eds. " : "ed. "}`

export const authorship = (item,style) => {
	if (style==="bibliography") {
		if (item.authors && item.authors.length === 0) return ""
		if (item.authors) return `${names(item.authors)}. `
		if (item.editors) return editorOnly(item)
	}
	if (style==="notes") {
		if (item.authors){
			if (item.authors.length === 0) return ""
			if (item.authors.length>=4) return `${nameFirstLast(item.authors[0])} et al. , `
			return `${humaniseArray(item.authors.map(author=>nameFirstLast(author)))}, `
		}
		if (item.editors) return `${humaniseArray(item.editors.map(ed=>nameFirstLast(ed)))}, ${item.editors.length>1 ? "eds., " : "ed., "}`
	}
}

export const imprint = (imprint,style) => {
	const result = `${imprint.place}: ${imprint.publisher}, ${imprint.year}`
	if (style==='notes'){
		//“(Place of imprint: Publisher’s Name, Date of imprint), ”
		return `(${result}), `
	}
	if (style==='bibliography'){
		// “Place of imprint: Publisher’s Name, Date of imprint.”
		return ` ${result}`
	}
}

export const flattenNames = nameArray =>
	humaniseArray(nameArray.map(n=>nameFirstLast(n)))

export const editors = (item,style) => {
	if (!item.authors || !item.editors || item.editors.length < 1) return ""
	if (style==="bibliography"){
		return ` Edited by ${flattenNames(item.editors)}.`
	}
	if (style==="notes"){
		return `, ed. ${flattenNames(item.editors)}`
	}
}

export const translators = (item,style) => {
	if (!item.translators || item.translators.length < 1) return ""
	if (style==="bibliography"){
		return ` Translated by ${flattenNames(item.translators)}.`
	}
	if (style==="notes"){
		return `, tr. ${flattenNames(item.translators)}`
	}
}

export const bibliographyBook = (item) =>
	`${authorship(item,"bibliography")}_${item.title}_.${editors(item,"bibliography")}${translators(item,"bibliography")}${imprint(item.imprint,"bibliography")}.`

export const notesBook = (item) =>
	`${authorship(item,"notes")}_${item.title}_${editors(item,"notes")}${translators(item,"notes")} ${imprint(item.imprint,"notes")}XX.`

// ----- CHAPTERS -------------------------------

export const bibliographyChapter = (item) =>
`${authorship(item,"bibliography")}“${item.title}.” In _${item.in.title}_, edited by ${flattenNames(item.in.editors)}, ${item.location}.${imprint(item.in.imprint,"bibliography")}.`

export const notesChapter = (item) =>
`${authorship(item,"notes")}“${item.title},” in _${item.in.title}_, ed. ${flattenNames(item.in.editors)} ${imprint(item.in.imprint,"notes")}XX.`

*/