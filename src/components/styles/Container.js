import styled, { keyframes } from "styled-components";

const Container_in = keyframes`
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
  padding-block: 60px;
  margin-inline: auto;
  margin-block: 50px 100px;
  background-color: #fff;
  box-shadow: 3px 3px 10px -3px hsl(0, 0%, 100%),
    3px 3px 10px -3px var(--secondary-color);

  animation: ${Container_in} 0.6s ease-out;
`;

export default Container;
