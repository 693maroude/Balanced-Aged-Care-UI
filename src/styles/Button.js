import styled from "styled-components";
import close from "../assets/close.png";

export const Button = styled.button.attrs({
  type: "button",
})`
  padding: 0.5rem 0.8rem;
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
  text-align: center;

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

export const CloseButton = styled.button.attrs({
  type: "button",
})`
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

export const RemoveButton = styled.button.attrs({
  type: "button",
})`
  margin-left: auto;
  position: relative;
  border-radius: 50%;
  border: none;
  background: url(${close});
  background-size: cover;
  background-position: center;
  height: 20px;
  width: 20px;
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

export const ListButton = styled.button.attrs({
  type: "button",
})`
  padding: 12px 14px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 0.9rem;
  color: ${(props) => {
    return props.underlineColor === "transparent"
      ? "var(--secondary-color)"
      : props.underlineColor;
  }};
  cursor: pointer;
  border-bottom: 2px solid ${(props) => props.underlineColor};
  transform: translateY(2px);

  :active {
    border-bottom: 2px solid var(--kalysys-blue);
  }

  :focus-visible {
    outline: var(--focus-visible);
  }
`;

export const StyledProceedButton = styled(Button)`
  position: absolute;
  bottom: -75px;
  right: -10px;
  text-align: center;
  padding: 14px 20px;
  font-size: 18px;
  background-color: var(--kalysys-blue);
  box-shadow: 2px 2px 6px -2px var(--secondary-color);
  border-radius: 4px;
  opacity: 0.9;
  cursor: pointer;
`;

export const ButtonSpan = styled.span`
  cursor: pointer;
  display: inline-block;
  position: relative;
  color: var(--primary-color);
  transition: 0.5s;

  ${StyledProceedButton}:hover & {
    padding-right: 10px;
  }

  &::after {
    content: "»";
    position: absolute;
    font-size: 26px;
    opacity: 0;
    top: -6px;
    right: -10px;
    transition: 0.5s;
  }

  ${StyledProceedButton}:hover &::after {
    opacity: 0.95;
    right: -6px;
  }
`;

export const PayButton = styled(Button)`
  position: relative;
  align-self: center;
  margin-inline: auto;
  margin-block: 20px;
  text-align: center;
  padding: 14px 20px;
  font-size: 18px;
  background-color: var(--kalysys-blue);
  box-shadow: 2px 2px 6px -2px var(--secondary-color);
  border-radius: 4px;
  opacity: 0.9;
  cursor: pointer;
`;

export const ButtonSpan1 = styled.span`
  cursor: pointer;
  position: relative;
  color: var(--primary-color);
`;
