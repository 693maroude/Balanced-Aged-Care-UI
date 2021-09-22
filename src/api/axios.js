import axios from "axios";

const BASE_URL =
  "https://e0hsgupb44.execute-api.ap-southeast-2.amazonaws.com/prod/";

export const getAPI = async ({
  url,
  id,
  appointmentEntryId = null,
  entryId = null,
}) => {
  try {
    if (url === "calculateAppointmentDiff") {
      const res = await axios.get(BASE_URL + `${url}/${entryId}`);
      return res.data;
    }
    const res = await axios.get(
      BASE_URL + `${url}/${id}?appointmentEntryId=${appointmentEntryId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const postAPI = async ({ url, id, template }) => {
  try {
    const res = await axios.post(BASE_URL + `${url}/${id}`, { template });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const putAPI = async ({ url, id, body }) => {
  try {
    const res = await axios.put(BASE_URL + `${url}/${id}`, { body });
    return res.data;
  } catch (err) {
    throw err;
  }
};
