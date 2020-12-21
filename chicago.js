export const oxford = (arr, conjunction, ifempty) => {
    const l = arr.length;
    if (!l) return ifempty;
    if (l<2) return arr[0];
    if (l<3) return arr.join(` ${conjunction} `);
    arr = arr.slice();
    arr[l-1] = `${conjunction} ${arr[l-1]}`;
    return arr.join(", ");
}

export const nameLastFirst = name =>`${name.last}, ${name.first}`
	
export const nameFirstLast = name =>`${name.first} ${name.last}`

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

export const authorship = (item) => {
	if (item.authors && item.authors.length == 0) return ""
	if (item.authors) return `${names(item.authors)}. `
	if (item.editors) return editorOnly(item)
}

export const editors = item => {
	if (!item.authors || !item.editors || item.editors.length < 1) return ""
	return ` Edited by ${humaniseArray(item.editors.map(editor=>nameFirstLast(editor)))}.`
}

export const bibliographyItem = (item) => 
	`${authorship(item)}_${item.title}_.${editors(item)}`