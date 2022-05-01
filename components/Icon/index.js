import React from 'react'
import styled from 'styled-components'

export const ICON_TYPE = {
	LETTERS:
		'M2 18l2.083-5M12 18l-2.083-5m-5.834 0L7 6l2.917 7m-5.834 0h5.834M18 10a4 4 0 100 8 4 4 0 100-8zm4 0v8',
	PLUS: 'M20 12L4 12M12 4L12 20',
	BIN: 'M19 6H5m9-1h-4m-4 5v10c0 .667.333 1 1 1h10c.667 0 1-.333 1-1V10',
	TRASH:
		'M19 6L5 6M14 5L10 5M6 10L6 20C6 20.6666667 6.33333333 21 7 21 7.66666667 21 11 21 17 21 17.6666667 21 18 20.6666667 18 20 18 19.3333333 18 16 18 10',
	NOTE: 'M13,17 L7,21 L7,17 L3,17 L3,4 L21,4 L21,17 L13,17 Z',
	BIBLIOG:
		'M12 6s-2-2-4-2-5 2-5 2v14s3-2 5-2 4 2 4 2c1.333-1.333 2.667-2 4-2 1.333 0 3 .667 5 2V6c-2-1.333-3.667-2-5-2-1.333 0-2.667.667-4 2z',
	CLOSE: 'M6.34314575 6.34314575L17.6568542 17.6568542M6.34314575 17.6568542L17.6568542 6.34314575',
	BUSY: 'M5 12h12v5a5 5 0 01-5 5h-2a5 5 0 01-5-5v-5zm12 1h2a2 2 0 012 2v0a2 2 0 01-2 2h-2M9 9s-1-.5-1-2 1-2 1-2m3-2s1 .5 1 2-1 2-1 2',
	ADD: 'M17 12H7m5 5V7m0-5a10 10 0 1 0 0 20 10 10 0 1 0 0-20z',
	CROSS: 'M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20zM8.5 8.9l7 6.9m-7 0l7-6.9',
	DOWNLOAD: 'M12 3v13m-5-4l5 5 5-5m3 9H4',
	DRILLDOWN: 'M13.5 9l3 3-3 3m-6-3H15 M16.5 12H15 M12 2a10 10 0 100 20 10 10 0 100-20z',
	CONTROLS:
		'M9 4a2 2 0 1 0 0 4 2 2 0 1 0 0-4zM4 6h3m4 0h9M9 16a2 2 0 1 0 0 4 2 2 0 1 0 0-4zm-5 2h3m4 0h9m-5-8a2 2 0 1 0 0 4 2 2 0 1 0 0-4zM4 12h9m4 0h3',
	INFO: 'M12 11v5m0-7V8m0-6a10 10 0 1 0 0 20 10 10 0 1 0 0-20z',
	MAGNIFY: 'M14.412 14.412L20 20M10 4a6 6 0 1 0 0 12 6 6 0 1 0 0-12z',
	NEXT: 'M9 1.6l10 9.9-10 10',
	PIN: 'M12 8a1 1 0 1 0 0 2 1 1 0 1 0 0-2z M12,21 C16,16.8 18,12.8 18,9 C18,5.6862915 15.3137085,3 12,3 C8.6862915,3 6,5.6862915 6,9 C6,12.8 8,16.8 12,21 Z',
	STAR: 'M12 17.844l-5.817 3.058 1.111-6.477-4.706-4.587 6.504-.945L12 3l2.908 5.893 6.504.945-4.706 4.587 1.111 6.477z',
	WARN: 'M12 10v3m0 3v-1m.9-10.5l8.3 14c.3.5.1 1.1-.4 1.4-.2.1-.4.1-.5.1H3.7c-.6 0-1-.4-1-1 0-.2 0-.4.1-.5l8.3-14c.3-.5.9-.7 1.4-.4.2.1.3.2.4.4z',
	OK: 'M4 13l5 5L20 7',
	GEAR: 'M5.035 12.705a7.083 7.083 0 0 1 0-1.41l-1.83-2.063 2-3.464 2.702.553a6.99 6.99 0 0 1 1.222-.707L10 3h4l.871 2.614c.433.195.842.432 1.222.707l2.701-.553 2 3.464-1.83 2.063a7.083 7.083 0 0 1 0 1.41l1.83 2.063-2 3.464-2.701-.553a6.99 6.99 0 0 1-1.222.707L14 21h-4l-.871-2.614a6.993 6.993 0 0 1-1.222-.707l-2.701.553-2-3.464 1.83-2.063z M12 11a1 1 0 1 0 0 2 1 1 0 1 0 0-2z',
	CLIPBOARD: 'M15 3h4v18H5V3h4 M14 4h-4a1 1 0 1 1 0-2h4a1 1 0 0 1 0 2z'
}

const Button = styled.button`
	appearance: none;
	background: none;
	border: 0;
	cursor: pointer;
	outline: 0;
	padding: 0;
	margin: 0;
	& + & {
		margin-left: 2rem;
	}
`

export const IconButton = ({ handler, label, icon, weight = 2, size = 36, colour }) => (
	<Button type='button' onClick={handler}>
		{label && <span className='visually-hidden'>{label}</span>}
		<Icon weight={weight} icon={icon} size={size} colour={colour} />
	</Button>
)

const SVG = styled.svg`
	display: inline-block;
	fill: none !important;
	stroke-linecap: round;
	stroke-miterlimit: 10;
	vertical-align: middle;
	shape-rendering: geometricPrecision;
`

const Icon = props => (
	<SVG width={`${props.size}px`} height={`${props.size}px`} viewBox='0 0 24 24'>
		<path
			vectorEffect='non-scaling-stroke'
			style={{
				stroke: props.colour || 'white',
				strokeWidth: props.weight
			}}
			d={props.icon}
		/>
	</SVG>
)

export default Icon
