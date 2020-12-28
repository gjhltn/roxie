import React from "react"
import styled from 'styled-components';
import useClipboard from "react-use-clipboard";

import Icon, {ICON_TYPE, IconButton} from '../Icon/Icon'

const Wrapper = styled.div`
  flex: 0 0 3rem;
  padding-right: 1rem;
  position: relative;
`

const Copier = ({
	icon,
	text
})	=> {
	const [isCopied, setCopied] = useClipboard(text, {
    successDuration: 2000,
});
	return(
	<Wrapper>
			{ !isCopied ?
				<IconButton
				handler={e=>setCopied()}
				icon={icon}
				weight="2"
				size="32"
				colour="white"
				/>
			:
				<Icon

				icon={ICON_TYPE.OK}
				weight="2"
				size="32"
				colour="hsla(110, 100%, 87%, 1)"
				/>
			}
		</Wrapper>
	)
}

export default Copier
