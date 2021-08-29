import styled from "styled-components";
import logo from "../../assets/logo.png";

const Logo = styled.img.attrs({
  src: `${logo}`,
})`
  height: auto;
  align-self: stretch;
`;

export default Logo;
