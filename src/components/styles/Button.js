import styled from "styled-components";

const Button = styled.button`
  padding: 18px 20px;
  border: none;
  background-color: var(--primary-color);
  border-radius: 32px;
  outline: none;
  font-size: 1.2rem;
  color: var(--secondary-color);
  box-shadow: -3px -3px 4px -3px hsl(0,0%,100%), 3px 3px 10px -3px var(--secondary-color);
  opacity: 76%;
  transition: opacity .2s;
  cursor: pointer;

  :hover {
    opacity: 100%;
    transform: scale(1.01);
  }

  :active{
    box-shadow: 3px 3px 14px -6px var(--secondary-color) inset;
    transform: translate(1px, 2px);
  }

  :focus-visible{
    outline: 3px solid blanchedalmond;
  }
`;

export default Button;
