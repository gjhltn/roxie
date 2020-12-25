import styled, {ThemeProvider} from 'styled-components';

import GlobalStyle, {theme} from './components/GlobalStyle/GlobalStyle'
import Book from './components/Book/Book'

function App() {
  return (
    <>
		<GlobalStyle />
	      <ThemeProvider theme={theme}>
		  <Book />
		</ThemeProvider>
    </>
  );
}

export default App;
