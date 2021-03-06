import styled, { keyframes } from "styled-components";

const Email_in = keyframes`
  0% {
    top: 100px;
    opacity: 0;
    }
  100% {
    top: 0;
    opacity: 1;
  }
`;

const EmailContainer = styled.div`
  position: relative;
  height: auto;
  width: min(780px, 98vw);
  min-width: 345px;
  padding-block: 60px;
  margin-inline: auto;
  margin-block-start: min(50px, 5vw);
  margin-block-end: 100px;
  background-color: #fff;
  box-shadow: 3px 3px 10px -3px hsl(0, 0%, 100%),
    3px 3px 10px -3px var(--secondary-color);

  animation: ${Email_in} 0.6s ease-out;
`;

export default EmailContainer;
