import { Document, Packer, Paragraph, TextRun } from 'docx'
import contentDisposition from 'content-disposition'
import { read } from '/db/items'
import sortByNameAndYear from '/helpers/sortByNameAndYear'
import { names, authorship, editors, translators, imprint } from '/helpers/citation'
import _ from 'lodash'

// http://localhost:3000/api/downloads

const ELISION = '⸻'

const docxBibliographyBook = (item, elideAuthor) =>
	new Paragraph({
		style: 'hung',
		children: [
			new TextRun(elideAuthor ? ELISION : authorship(item, 'bibliography')),
			new TextRun({
				italics: true,
				text: item.title
			}),
			new TextRun('. '),
			new TextRun(editors(item, 'bibliography')),
			new TextRun(translators(item, 'bibliography')),
			new TextRun(imprint(item.imprint, 'bibliography')),
			new TextRun('.')
		]
	})

const docxBibliographyJournal = (item, elideAuthor) => {
	let children = [
		new TextRun(elideAuthor ? ELISION : names(item.authors, { flipFirst: true })),
		new TextRun('. '),
		new TextRun('"'),
		new TextRun(item.title),
		new TextRun('." '),
		new TextRun({
			italics: true,
			text: item.journal
		}),
		new TextRun(' ')
	]
	if (item.volume) {
		children.push(new TextRun(item.volume))
		if (item.issue) {
			children.push(new TextRun(', '))
		} else {
			children.push(new TextRun(' '))
		}
	}
	if (item.issue) {
		children.push(new TextRun('No. '))
		children.push(new TextRun(item.issue))
		children.push(new TextRun(' '))
	}
	children.push(new TextRun('('))
	if (item.date) {
		children.push(new TextRun(item.date))
	}
	if (item.date && item.year) {
		children.push(new TextRun(' '))
	}
	if (item.year) {
		children.push(new TextRun(item.year))
	}
	children.push(new TextRun(')'))
	if (item.location) {
		children.push(new TextRun(': '))
		children.push(new TextRun(item.location))
	}
	children.push(new TextRun('.'))
	if (item.url) {
		children.push(new TextRun(' '))
		children.push(new TextRun(item.url))
		children.push(new TextRun('.'))
	}
	return new Paragraph({
		style: 'hung',
		children: children
	})
}

const docxBibliographyChapter = (item, elideAuthor) => {
	let children = [
		new TextRun(elideAuthor ? ELISION : authorship(item, 'bibliography')),
		new TextRun(' "'),
		new TextRun(item.title),
		new TextRun('." In '),
		new TextRun({
			italics: true,
			text: item.in.title
		}),
		new TextRun(', ')
	]
	if (names(item.in.editors).length > 0) {
		children.push(new TextRun('edited by '))
		children.push(new TextRun(names(item.in.editors)))
		children.push(new TextRun(', '))
	}
	if (item.location) {
		children.push(new TextRun(', '))
		children.push(new TextRun(item.location))
		children.push(new TextRun('. '))
	}
	children.push(new TextRun(imprint(item.in.imprint, 'bibliography')))
	children.push(new TextRun('.'))

	return new Paragraph({
		style: 'hung',
		children: children
	})
}

const render = (item, previousItem) => {
	let paragraph
	
	const elideAuthor = previousItem && _.isEqual(item.authors, previousItem.authors)
	
	// console.log(`${item.authors} ${elideAuthor} ${previousItem.authors}`)
	
	switch (item.type) {
		case 'book':
			paragraph = docxBibliographyBook(item, elideAuthor)
			break
		case 'journal':
			paragraph = docxBibliographyJournal(item, elideAuthor)
			break
		case 'chapter':
			paragraph = docxBibliographyChapter(item, elideAuthor)
			break
	}

	return paragraph
}

const buildDoc = data => {
	let result = []
	const items = sortByNameAndYear(data.items)

	items.forEach((item, index) => {
		const previousItem = index > 0 ? items[index - 1] : null
		const paragraph = render(item, previousItem)
		if (paragraph) {
			result.push(paragraph)
		}
	})

	return new Document({
		styles: {
			paragraphStyles: [
				{
					id: 'hung',
					name: 'hung',
					basedOn: 'Normal',
					next: 'Normal',
					quickFormat: true,
					run: {
						font: 'Helvetica',
						size: 24
					},
					paragraph: {
						indent: {
							left: 0,
							hanging: 720
						}
					}
				}
			]
		},

		sections: [
			{
				properties: {},
				children: result
			}
		]
	})
}

export default async function (req, res) {
	const id = req.query.id
	try {
		const data = await read()
		const buffer = await Packer.toBuffer(buildDoc(data))
		res.setHeader('Content-Type', 'application/octet-stream')
		res.setHeader('Content-Disposition', contentDisposition('bibliography.docx'))
		res.send(buffer)
	} catch (e) {
		res.status(400).json({ error: true, message: 'Couldnt build download ' + id })
	}
}
