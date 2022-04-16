import * as React from 'react'
import { createGlobalStyle } from 'styled-components'

const COLOURS = {
	ink: { light: '#292d33', dark: '#fff' },
	knockback: { light: '#999', dark: '#999' },
	paper: { light: '#fff', dark: '#2E2655' },
	altpaper: { light: '#fafafa', dark: '#6431F8' },
	interaction: { light: '#0060bf', dark: '#FDC5F5' },
	highlight: { light: '#8dfb88' },
	highlightink: { light: '#292d33' },

	error: { light: '#ffbdbd' },
	errorText: { light: '#b80022', dark: '#ffbdbd' },
	errorInk: { light: '#000' },
	info: { light: '#fffe54' },
	infoInk: { light: '#000' },
	success: { light: '#8dfb88' },
	successInk: { light: '#000' }
}

const darkMode = styles => `
	@media (prefers-color-scheme: dark) {
		${styles}
	}
`

const def = (name, colour) => `
	:root {
		--colour-${name}: ${colour};
	}
`

const colour = (name, colourObj, allowDarkmode) => `
	${def(name, colourObj.light)}
	${allowDarkmode && colourObj.dark ? darkMode(def(name, colourObj.dark)) : ''}
`

const colourStyleString = (colours, allowDarkmode) =>
	Object.keys(colours)
		.map(key => colour(key, colours[key], allowDarkmode))
		.join('')

const Stylesheet = createGlobalStyle`
	${props =>
		colourStyleString(COLOURS, props.allowDarkmode)}
	}

	body {
		background: var(--colour-paper);
		color: var(--colour-ink);
		
		a {
			color: var(--colour-interaction);
			&:hover,
			&:visited,
			&:active {
				color: var(--colour-interaction);
			}
		}
	}
`

export default Stylesheet