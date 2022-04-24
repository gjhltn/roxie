import * as c from './citation.js'
import * as book from './book/examples.js'
import _ from 'lodash'

describe('humaniseArray', () => {
	it('humanises 1 item', () => {
		expect(c.humaniseArray(['a'])).toEqual('a')
	})
	it('humanises 2 items', () => {
		expect(c.humaniseArray(['a', 'b'])).toEqual('a and b')
	})
	it('humanises 3 items', () => {
		expect(c.humaniseArray(['a', 'b', 'c'])).toEqual('a, b, and c')
	})
	it('humanises 4 items', () => {
		expect(c.humaniseArray(['a', 'b', 'c', 'd'])).toEqual('a, b, c, and d')
	})
})

describe('name', () => {
	it('last, first', () => {
		expect(c.nameLastFirst({ last: 'Wittgenstein', first: 'Ludwig' })).toEqual(
			'Wittgenstein, Ludwig'
		)
	})
	it('first, last', () => {
		expect(c.nameFirstLast({ last: 'Wittgenstein', first: 'Ludwig' })).toEqual(
			'Ludwig Wittgenstein'
		)
	})
	it('mononym (last, first) blank first', () => {
		expect(c.nameLastFirst({ last: 'Epicetus', first: '' })).toEqual('Epicetus')
	})
	it('mononym (last, first) no first', () => {
		expect(c.nameLastFirst({ last: 'Epicetus' })).toEqual('Epicetus')
	})
	it('mononym (first, last) blank first', () => {
		expect(c.nameFirstLast({ last: 'Epicetus', first: '' })).toEqual('Epicetus')
	})
	it('mononym (first, last) no first', () => {
		expect(c.nameFirstLast({ last: 'Epicetus' })).toEqual('Epicetus')
	})
})

const exampleNames = [
	{ last: 'Wittgenstein', first: 'Ludwig' },
	{ last: 'Dodd', first: 'Ken' },
	{ last: 'Harvey', first: 'Polly Jean' },
	{ last: 'Asheton', first: 'Scott' },
	{ last: 'Asheton', first: 'Ron' },
	{ last: 'Williamson', first: 'James' },
	{ last: 'Pop', first: 'Iggy' }
]

describe('names', () => {
	it('1', () => {
		expect(c.names(_.take(exampleNames, 1))).toEqual('Ludwig Wittgenstein')
	})
	it('2', () => {
		expect(c.names(_.take(exampleNames, 2))).toEqual('Ludwig Wittgenstein and Ken Dodd')
	})
	it('3', () => {
		expect(c.names(_.take(exampleNames, 3))).toEqual(
			'Ludwig Wittgenstein, Ken Dodd, and Polly Jean Harvey'
		)
	})
	it('4', () => {
		expect(c.names(_.slice(exampleNames, 3))).toEqual(
			'Scott Asheton, Ron Asheton, James Williamson, and Iggy Pop'
		)
	})
})

describe('names abbreviate', () => {
	it('1', () => {
		expect(c.names(_.take(exampleNames, 1), { abbreviate: 4 })).toEqual('Ludwig Wittgenstein')
	})
	it('2', () => {
		expect(c.names(_.take(exampleNames, 2), { abbreviate: 4 })).toEqual(
			'Ludwig Wittgenstein and Ken Dodd'
		)
	})
	it('3', () => {
		expect(c.names(_.take(exampleNames, 3), { abbreviate: 4 })).toEqual(
			'Ludwig Wittgenstein, Ken Dodd, and Polly Jean Harvey'
		)
	})
	it('4', () => {
		expect(c.names(_.slice(exampleNames, 3), { abbreviate: 4 })).toEqual('Scott Asheton et al.')
	})
})

describe('names flip', () => {
	it('1', () => {
		expect(c.names(_.take(exampleNames, 1), { flipFirst: true })).toEqual('Wittgenstein, Ludwig')
	})
	it('2', () => {
		expect(c.names(_.take(exampleNames, 2), { flipFirst: true })).toEqual(
			'Wittgenstein, Ludwig and Ken Dodd'
		)
	})
	it('3', () => {
		expect(c.names(_.take(exampleNames, 3), { flipFirst: true })).toEqual(
			'Wittgenstein, Ludwig, Ken Dodd, and Polly Jean Harvey'
		)
	})
	it('4', () => {
		expect(c.names(_.slice(exampleNames, 3), { flipFirst: true })).toEqual(
			'Asheton, Scott, Ron Asheton, James Williamson, and Iggy Pop'
		)
	})
})

describe('names flip and abbreviate', () => {
	it('1', () => {
		expect(c.names(_.take(exampleNames, 1), { abbreviate: 4, flipFirst: true })).toEqual(
			'Wittgenstein, Ludwig'
		)
	})
	it('2', () => {
		expect(c.names(_.take(exampleNames, 2), { abbreviate: 4, flipFirst: true })).toEqual(
			'Wittgenstein, Ludwig and Ken Dodd'
		)
	})
	it('3', () => {
		expect(c.names(_.take(exampleNames, 3), { abbreviate: 4, flipFirst: true })).toEqual(
			'Wittgenstein, Ludwig, Ken Dodd, and Polly Jean Harvey'
		)
	})
	it('4', () => {
		expect(c.names(_.slice(exampleNames, 3), { abbreviate: 4, flipFirst: true })).toEqual(
			'Asheton, Scott et al.'
		)
	})
})

describe('editorNames', () => {
	it('single editor', () => {
		expect(c.editorNames({ editors: _.take(exampleNames, 1) })).toEqual('Ludwig Wittgenstein, ed.')
	})
	it('two editors', () => {
		expect(c.editorNames({ editors: _.take(exampleNames, 2) })).toEqual(
			'Ludwig Wittgenstein and Ken Dodd, eds.'
		)
	})
	it('single editor, reversed', () => {
		expect(c.editorNames({ editors: _.take(exampleNames, 1) }, { flipFirst: true })).toEqual(
			'Wittgenstein, Ludwig, ed.'
		)
	})
	it('two editors, reversed', () => {
		expect(c.editorNames({ editors: _.take(exampleNames, 2) }, { flipFirst: true })).toEqual(
			'Wittgenstein, Ludwig and Ken Dodd, eds.'
		)
	})
})

describe('authorship: bibliography', () => {
	it('anonymous', () => {
		expect(c.authorship(book.D, 'bibliography')).toEqual('')
	})
	it('one author', () => {
		expect(c.authorship(book.E, 'bibliography')).toEqual('Acker, Kathy. ')
	})
	it('two authors', () => {
		expect(c.authorship(book.G, 'bibliography')).toEqual('Deleuze, Giles and Félix Guattari. ')
	})
	it('single editor only', () => {
		expect(c.authorship(book.L, 'bibliography')).toEqual('Tatar, Maria, ed. ')
	})
	it('two editors only', () => {
		expect(c.authorship(book.M, 'bibliography')).toEqual('Heaney, Seamus and Ted Hughes, eds. ')
	})
	it('edited', () => {
		expect(c.authorship(book.J, 'bibliography')).toEqual('Lovecraft, H.P.. ')
	})
})

describe('authorship: notes', () => {
	it('anonymous', () => {
		expect(c.authorship(book.D, 'notes')).toEqual('')
	})
	it('one author', () => {
		expect(c.authorship(book.E, 'notes')).toEqual('Kathy Acker, ')
	})
	it('two authors', () => {
		expect(c.authorship(book.G, 'notes')).toEqual('Giles Deleuze and Félix Guattari, ')
	})
	it('three authors', () => {
		expect(c.authorship(book.H, 'notes')).toEqual('Giles Deleuze, Félix Guattari, and Harpo Marx, ')
	})
	it('four authors', () => {
		expect(c.authorship(book.I, 'notes')).toEqual('Giles Deleuze et al., ')
	})
	it('single editor only', () => {
		expect(c.authorship(book.L, 'notes')).toEqual('Maria Tatar, ed., ')
	})
	it('two editors only', () => {
		expect(c.authorship(book.M, 'notes')).toEqual('Seamus Heaney and Ted Hughes, eds., ')
	})
	it('edited', () => {
		expect(c.authorship(book.J, 'notes')).toEqual('H.P. Lovecraft, ')
	})
})

const pub = {
	place: 'Venice',
	publisher: 'Aldine Press',
	year: '1580'
}

describe('imprint', () => {
	it('bibliography', () => {
		expect(c.imprint(pub, 'bibliography')).toEqual(' Venice: Aldine Press, 1580')
	})
	it('notes', () => {
		expect(c.imprint(pub, 'notes')).toEqual('(Venice: Aldine Press, 1580), ')
	})
})
