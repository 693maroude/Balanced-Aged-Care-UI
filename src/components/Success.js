import Container from "./styles/Container";
import qs from "query-string";
import { putAPI } from "../api/axios";
import SuccessSVG from "./styles/SuccessSVG";

const Success = ({ location }) => {
  const updateEntryData = qs.parse(location.search);

  putAPI({
    url: "updateWithToken",
    id: updateEntryData.entryId,
    body: updateEntryData,
  });
  return (
    <Container style={{ textAlign: "center" }}>
      <SuccessSVG />
      <h2 style={{ textAlign: "center" }}>
        Payment was processed successfully
      </h2>
      <br />
      <div style={{ textAlign: "center" }}>Thank you for your billing.</div>
    </Container>
  );
};

export default Success;
