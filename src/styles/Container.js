import styled, { keyframes } from "styled-components";

const Container_in = keyframes`
  0% {
    transform: translateY(-50%);
    opacity: 0;
    }
  100% {
    transform: translateY(calc(-50% - 4vw));
    opacity: 1;
  }
`;

const Container = styled.div`
  position: relative;
  height: auto;
  width: min(580px, 94vw);
  padding: max(36px, 4.4vw);
  margin-inline: auto;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 3px 3px 10px -3px hsl(0, 0%, 100%),
    3px 3px 10px -3px var(--secondary-color);

  top: 50%;
  transform: translateY(calc(-50% - 4vw));
  animation: ${Container_in} 0.6s ease-out;
`;

export const SuccessContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 20px;
`;

export default Container;
