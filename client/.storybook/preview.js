import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from 'styled-components';
import GlobalStyle, { theme } from '../src/components/GlobalStyle/GlobalStyle';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
  	<>
		<GlobalStyle/>
    	<ThemeProvider theme={theme}>
     	 	<Story />
    	</ThemeProvider>
	</>
  ),
];
