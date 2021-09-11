import styled, { keyframes } from "styled-components";

export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
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
  width: min(600px, 94vw);
  padding-block-start: min(14vw, 50px);
  padding-block-end: min(6vw, 50px);
  padding-inline: min(6vw, 55px);
  border: none;
  background-color: var(--primary-color);
  border-radius: 6px;
  font-size: 1.2rem;
  color: var(--secondary-color);
  box-shadow: 2px 2px 10px -3px var(--secondary-color);

  animation: ${modal_in} 0.4s ease-in-out;
`;

export const InputButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-block: 20px;
  flex-flow: row wrap;
`;

export const Input = styled.input`
  outline: none;
  background: transparent;
  border: none;
  border-bottom: 1px solid #292929;
  font-size: 14px;
  flex: 1 0 300px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 10px;
  justify-content: center;
  // structure
`;
