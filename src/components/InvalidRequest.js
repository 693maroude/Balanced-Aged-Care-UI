import { useHistory } from "react-router-dom";
import Container from "../styles/Container";
import DocumentSVG from "../styles/DocumentSVG";
import { StyledProceedButton, ButtonSpan } from "../styles/Button";

const InvalidRequest = () => {
  const history = useHistory();

  const userPayment = false;

  const handleClick = () => {
    // open the payment url
    history.push({
      pathname: "/payment-methods",
    });
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <h3 style={{ textAlign: "center", marginBottom: "2vw" }}>
        This document has already been processed.
      </h3>
      <DocumentSVG />
      {!userPayment ? (
        <StyledProceedButton onClick={handleClick}>
          <ButtonSpan>Proceed to Payment</ButtonSpan>
        </StyledProceedButton>
      ) : null}
    </Container>
  );
};

export default InvalidRequest;
