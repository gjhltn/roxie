import 'normalize.css'
import { Colour } from '../components'
import { createGlobalStyle } from 'styled-components'

const Styles = createGlobalStyle`
	body {
		font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
		font-size: 28px;
		margin: 0 4rem;]
	}
`

const App = ({ Component, pageProps }) =>
<>
	<Styles />
	<Colour allowDarkmode={true} />
	<Component {...pageProps} />
</>

export default App