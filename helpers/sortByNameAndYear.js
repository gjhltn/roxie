import { authorship } from './citation'

const sortByNameAndYear = items =>
	items.sort(function (a, b) {
		const nameA = authorship(a)
		const nameB = authorship(b)
		if (nameA < nameB) {
			return -1
		}
		if (nameA > nameB) {
			return 1
		}

		// names are equal, use year
		const yearA = authorship(a)
		const yearB = authorship(b)

		if (yearA < yearB) {
			return -1
		}
		if (yearA > yearB) {
			return 1
		}
		return 0
	})

export default sortByNameAndYear
