import styled from "styled-components";
import close from "../../assets/close.png";

export const Button = styled.button`
  padding: 12px 14px;
  border: none;
  background-color: var(--primary-color);
  border-radius: 4px;
  outline: none;
  font-size: 0.9rem;
  color: var(--secondary-color);
  box-shadow: 2px 2px 10px -5px var(--secondary-color);
  opacity: 76%;
  transition: opacity 0.2s;
  cursor: pointer;

  :hover,
  :focus-visible {
    opacity: 100%;
  }

  :active {
    box-shadow: 3px 3px 14px -6px var(--secondary-color) inset;
    transform: translate(1px, 2px);
  }

  :focus-visible {
    outline: var(--focus-visible);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 18px;
  border-radius: 50%;
  border: none;
  background: url(${close});
  background-size: cover;
  background-position: center;
  height: 30px;
  width: 30px;
  opacity: 46%;
  cursor: pointer;
  transition: opacity 0.2s;

  :hover,
  :focus-visible {
    opacity: 100%;
    transform: scale(1.01);
  }

  :focus-visible {
    outline: var(--focus-visible);
  }
`;

export const ListButton = styled.button`
  padding: 12px 14px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 0.9rem;
  color: var(--secondary-color);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transform: translateY(2px);

  :active {
    border-bottom: 2px solid blue;
  }
`;
