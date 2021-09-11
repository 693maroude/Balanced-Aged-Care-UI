import styled, { keyframes } from "styled-components";

const Frame_in = keyframes`
  0% {
      top: 100px;
      opacity: 0;
    }
  100% {
    top: 0;
    opacity: 1;
  }
`;

const FrameContainer = styled.div`
  position: relative;
  height: auto;
  width: min(440px, 96vw);
  margin-inline: auto;
  margin-block: 2vh;
  padding-block: 2vh;
  text-align: center;
  background-color: #fff;
  box-shadow: 3px 3px 10px -3px hsl(0, 0%, 100%),
    3px 3px 10px -3px var(--secondary-color);

  animation: ${Frame_in} 0.6s ease-out;
`;

export default FrameContainer;
