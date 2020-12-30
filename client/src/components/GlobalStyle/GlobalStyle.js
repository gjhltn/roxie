import React from "react"

import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const theme = {
	bg: "#00366e",
	author: "white",
	title: "hsla(0, 100%, 84%, 1)",
	maintitle: "hsla(33, 100%, 82%, 1)",
	editor: "hsla(62, 100%, 86%, 1)",
	translator: "hsla(110, 100%, 87%, 1)",
	number:	"hsla(185, 100%, 80%, 1)",
	imprint: "hsla(217, 100%, 81%, 1)",
	location: "hsla(249, 100%, 85%, 1)",
	url: "hsla(300, 100%, 89%, 1)",
	unused: "hsla(60, 100%, 99%, 1)"
};

const Globals = createGlobalStyle`
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
	body {
		margin: 0;
		padding: 0;
		background: ${theme.bg};
		font-family: Helvetica, Sans-Serif;
		font-size: 24px;
		color: #fff;
		overflow: hidden;
	}
	* {
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