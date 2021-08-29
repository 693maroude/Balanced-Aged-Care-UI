import React, { useState, useEffect } from "react";
import axios from "axios";
import EmailContainer from "./styles/EmailContainer";
import Spinner from "./styles/Spinner";

export default function Email() {
  const [body, setBody] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBody = async () => {
    try {
      axios
        .get(
          `https://1tz4y5lnl9.execute-api.ap-southeast-2.amazonaws.com/dev/getEmail/168909`
        )
        .then((res) => {
          setBody(res.data.body);
        });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error("API Error", err);
    }
  };

  useEffect(() => {
    getBody();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <EmailContainer dangerouslySetInnerHTML={{ __html: body }}></EmailContainer>
  );
}
