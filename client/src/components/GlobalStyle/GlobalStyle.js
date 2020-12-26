import React from "react"

import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const theme = {
	bg: "#00366e",
	author: "hsla(0, 100%, 84%, 1)",
	title: "hsla(33, 100%, 82%, 1)",
	editor: "hsla(62, 100%, 86%, 1)",
	translator: "hsla(110, 100%, 87%, 1)",
	publication:	"hsla(185, 100%, 80%, 1)",
	unusedA: "hsla(217, 100%, 81%, 1)",
	unusedB: "hsla(249, 100%, 85%, 1)",
	unusedC: "hsla(300, 100%, 89%, 1)",
	unusedD: "hsla(60, 100%, 99%, 1)"
};

const Globals = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		background: ${theme.bg};
		font-family: Helvetica, Sans-Serif;
		font-size: 24px;
		color: #fff;
	}
	div {
		/*border: 1px solid red;*/
	}
`;

const GlobalStyle = ({children}) =>
	<>
		<Globals />
		<ThemeProvider theme={theme}>
		  {children}
		</ThemeProvider>
	</>

export default GlobalStyle;