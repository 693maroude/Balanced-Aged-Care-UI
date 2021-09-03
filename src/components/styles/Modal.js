import styled, { keyframes } from "styled-components";

export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  //backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modal_in = keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ModalWrapper = styled.div`
  position: absolute;
  width: 600px;
  height: 420px;
  padding-block: 50px;
  padding-inline: min(6vw, 55px);
  border: none;
  background-color: var(--primary-color);
  border-radius: 6px;
  font-size: 1.2rem;
  color: var(--secondary-color);
  box-shadow: 2px 2px 10px -3px var(--secondary-color);

  animation: ${modal_in} 0.4s ease-in-out;
`;
