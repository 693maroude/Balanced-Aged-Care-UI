import styled from "styled-components";
import Modal from "react-modal";

Modal.setAppElement('#root');

const StyledModal = styled(Modal)`
  padding: 18px 20px;
  margin: auto;
  max-width: 400px;
  border: none;
  background-color: var(--primary-color);
  border-radius: 32px;
  outline: none;
  font-size: 1.2rem;
  color: var(--secondary-color);
  box-shadow: -3px -3px 4px -3px hsl(0,0%,100%), 3px 3px 10px -3px var(--secondary-color);
`
export default StyledModal;