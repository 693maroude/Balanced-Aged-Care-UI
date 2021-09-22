import React from "react";
import Container from "../styles/Container";
import {
  ErrorContainer,
  ErrorStatus,
  ErrorMessage,
  Message,
} from "../styles/Error";

const ErrorComponent = ({ Status, StatusMessage }) => {
  return (
    <Container>
      <ErrorContainer>
        <ErrorStatus>{Status ? Status : "404"}</ErrorStatus>
        <ErrorMessage>
          {StatusMessage ? StatusMessage : "Invalid Request"}
        </ErrorMessage>
      </ErrorContainer>

      <Message>Please contact your system administrator</Message>
    </Container>
  );
};

export default ErrorComponent;
