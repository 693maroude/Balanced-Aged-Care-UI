import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); } 
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 120px;
  height: 120px;
  margin: -76px 0 0 -76px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;

  animation: ${spin} 1s cubic-bezier(0.5, 0.7, 0.9, 0.9) infinite;
`;

export default Spinner;
