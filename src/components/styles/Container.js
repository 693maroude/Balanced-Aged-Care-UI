import styled, { keyframes } from "styled-components";

const Container_in = keyframes`
  0% {
    transform: translateY(-50%);
    opacity: 0;
    }
  100% {
    transform: translateY(calc(-50% - 200px));
    opacity: 1;
  }
`;

const SuccessContainer_in = keyframes`
  0% {
    top: 100px;
    opacity: 0;
    }
  100% {
    top: 0;
    opacity: 1;
  }
`;

const Container = styled.div`
  position: relative;
  height: auto;
  width: 780px;
  padding: 60px;
  margin-inline: auto;
  margin-block: 150px 0px;
  background-color: #fff;
  box-shadow: 3px 3px 10px -3px hsl(0, 0%, 100%),
    3px 3px 10px -3px var(--secondary-color);

  top: ${({ svg }) => (svg ? "auto" : "50%")};
  transform: ${({ svg }) => (svg ? "none" : "translateY(calc(-50% - 200px))")};
  animation: ${({ svg }) => (svg ? SuccessContainer_in : Container_in)} 0.6s
    ease-out;
`;

export const HR = styled.div`
  align-self: stretch;
  width: 3px;
  border-radius: 3px;
  background-color: #d4d4d4;
`;

export default Container;
