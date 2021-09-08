import styled from "styled-components";

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  gap: 10px;
  padding-top: 10px;
  font-size: 1rem;
`;

export const Em = styled.span`
  color: #0e9799;
  font-weight: bold;
  font-family: Helvetica;
`;

export default List;
