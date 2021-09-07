import styled from "styled-components";

const Form = styled.form`
  margin-inline-start: 150px;
  width: 320px;
  margin-block: 20px;
  font-size: 14px;
  display: flex;
  flex-flow: column nowrap;
  gap: 14px;
`;

export const Label = styled.label`
  align-self: center;
`;

export const Input = styled.input`
  outline: none;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--secondary-color);
  flex: 1 1 0;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default Form;
