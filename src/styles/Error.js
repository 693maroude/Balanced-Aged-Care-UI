import styled from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

export const ErrorStatus = styled.span`
  flex: 3 1 0;
  font-size: 5.875rem;
  line-height: 1;
  text-align: center;
`;
export const ErrorMessage = styled.span`
  flex: 5 0 0;
  padding: 1rem;
  color: var(--kalysys-blue);
  font-size: 1.75rem;
  font-weight: 600;
  white-space: nowrap;
  text-align: center;
`;
export const Message = styled.p`
  text-align: center;
  margin-block-start: 14px;
  color: #949494;
`;
