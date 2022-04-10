import styled, {keyframes} from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  border-top: 2px solid rgba(255,255,255,0.3);
  border-right: 2px solid rgba(255,255,255,0.3);
  border-bottom: 2px solid rgba(255,255,255,0.3);
  border-left: 4px solid transparent;
  background: transparent;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin: 0 auto;
`;

export default Spinner
