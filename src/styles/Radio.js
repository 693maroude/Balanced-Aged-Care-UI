import styled from "styled-components";

export const RadioContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 15px;
  margin-block-start: 30px;
`;

export const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: auto;
  font-size: 1.2rem;
  cursor: ${({ Disabled }) => (Disabled ? "not-allowed" : "pointer")};
`;

export const RadioInput = styled.input.attrs({
  type: "radio",
})`
  display: none;
`;

export const RadioSpan = styled.div`
  width: 1.25em;
  height: 1.25em;
  aspect-ratio: 1;
  border: 3px solid #d8e4e2;
  border-radius: 50%;
  margin-right: 10px;
  box-sizing: border-box;
  padding: 2px;

  ::after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    background: var(--kalysys-blue);
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.15s;
  }

  ${RadioInput}:checked + &::after {
    transform: scale(1);
  }
`;
