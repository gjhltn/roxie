const prune = (cull, o) => {
	cull.forEach(arrName => {
		var keep = []
		if (o[arrName]) {
			keep = o[arrName].filter(
				name =>
					(name.first && name.first.trim().length > 0) || (name.last && name.last.trim().length > 0)
			)
		}
		if (keep.length > 0) {
			o[arrName] = keep
		} else {
			delete o[arrName]
		}
	})
	return o
}

export default prune
