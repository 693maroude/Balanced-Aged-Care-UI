import React from "react";
import styled from "styled-components";
import { CloseButton } from "./Button";

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  position: relative;
  width: 600px;
  height: 800px;
  padding-block: 50px;
  padding-inline: min(6vw, 55px);
  border: none;
  background-color: var(--primary-color);
  border-radius: 32px;
  font-size: 1.2rem;
  color: var(--secondary-color);
  box-shadow: 2px 2px 10px -3px var(--secondary-color);

  animation-name: modal-in;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;

  @keyframes modal-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Modal = ({ showModal, setShowModal, children }) => {
  return (
    <>
      {showModal ? (
        <Background>
          <ModalWrapper>
            {children}
            <CloseButton
              aria-label="Close Payment"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default Modal;
