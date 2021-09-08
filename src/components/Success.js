import Container from "./styles/Container";
import qs from "query-string";
import { putAPI } from "../api/axios";

const Success = ({ location }) => {
  const updateEntryData = qs.parse(location.search);

  putAPI({
    url: "updateWithToken",
    id: updateEntryData.entryId,
    body: updateEntryData,
  });
  return (
    <Container>
      <h2>Payment Success</h2>
      <br />
      <div>Your Payment was successful</div>
    </Container>
  );
};

export default Success;
