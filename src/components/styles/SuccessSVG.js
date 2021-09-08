import styled, { keyframes } from "styled-components";
import { ReactComponent as orderConfirmed } from "../../assets/order_confirmed.svg";

const tick = keyframes`
0% {
  stroke-dashoffset: 220;
}
30%{
  stroke-dashoffset: 110;
}
60%{
  stroke-dashoffset: 0;
  fill: transparent;
}
80%{
  stroke-dashoffset: 0;
  fill: var(--primary-color);
}
100% {
  stroke-dashoffset: 0;
  fill: var(--primary-color);
}
`;

const pulse = keyframes`
0% {
  transform: scale(1);
}
100% {
  transform: scale(0.9);
}
`;

const head = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(-10deg);
}
`;

const leftHand = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(5deg);
}
`;

const rightHand = keyframes`
0% {
  transform: scale(1);
}
100% {
  transform: scale(.9);
}
`;

const vector = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(-10deg);
}
`;

const SuccessSVG = styled(orderConfirmed)`
  height: 400px;
  width: 400px;

  #tick {
    stroke: var(--primary-color);
    stroke-width: 3;
    stroke-dasharray: 220;
    stroke-dashoffset: 220;
    fill: transparent;
    animation: ${tick} 4s linear forwards;
  }

  #tick-background {
    animation: ${pulse} 1s ease-in-out 4s infinite alternate;
    transform-origin: center;
    transform-box: fill-box;
  }

  #head {
    animation: ${head} 2s linear 4s infinite alternate;
    transform-origin: center;
    transform-box: fill-box;
  }

  #left-hand {
    animation: ${leftHand} 2s ease-in-out 4s infinite alternate;
    transform-origin: left;
    transform-box: fill-box;
  }

  #right-hand {
    animation: ${rightHand} 2s ease-in-out 4s infinite alternate;
    transform-origin: right;
    transform-box: fill-box;
  }

  #Vector_4,
  #Vector_5 {
    animation: ${vector} 4s linear 4s infinite alternate;
    transform-origin: 50% 100%;
    transform-box: fill-box;
  }
`;

export default SuccessSVG;
