import axios from "axios";

const BASE_URL =
  "https://e0hsgupb44.execute-api.ap-southeast-2.amazonaws.com/prod/";

export const getAPI = async ({ url, id }) => {
  try {
    const res = await axios.get(BASE_URL + `${url}/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const postAPI = async ({ url, id, template }) => {
  try {
    console.log(1);
    const res = await axios.post(
      `https://e0hsgupb44.execute-api.ap-southeast-2.amazonaws.com/prod/` +
        `puppeteer/pdf`,
      {
        template,
      }
    );

    console.log(res);
    return res.data;
  } catch (err) {
    return err;
  }
};
