import styled from "styled-components";

const RequiredIcon = ({ className }) => <i className={className} />;

export const StyledRequiredIcon = styled(RequiredIcon)`
  vertical-align: 5px;
  font-size: 8px;
  color: red;
`;
