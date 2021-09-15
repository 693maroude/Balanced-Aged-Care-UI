import styled, { keyframes } from "styled-components";

const modal_in = keyframes`
  0% {
    right: -350px;
  }
  10%{
    right: 20px;
  }
  90%{
    right: 20px;
  }
  100% {
    right: -350px;
  }
`;

const ErrorPopUp = styled.div`
  position: fixed;
  top: 20%;
  background-color: hsla(0, 100%, 85%, 0.95);
  padding: 16px;
  font-size: 14px;
  color: hsla(0, 100%, 30%, 1);
  box-shadow: 2px 2px 6px -2px var(--secondary-color);
  border-radius: 4px;
  border-bottom: 2px solid hsla(0, 100%, 30%, 1);
  cursor: pointer;
  opacity: 1;

  animation: ${modal_in} 2s ease-out;
`;

export default ErrorPopUp;
