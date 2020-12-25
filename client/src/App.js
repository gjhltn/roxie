import styled from '@emotion/styled'
import { ThemeProvider, withTheme } from '@emotion/react'
import "./global.css"

import Book from './components/Book/Book'

const theme = {
  colors: {
	  primary: "#F00"
	}
}

function App() {
  return (
    <div className="App">
	      <ThemeProvider theme={theme}>
		  <Book />
		</ThemeProvider>
    </div>
  );
}

export default App;
