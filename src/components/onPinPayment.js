import { putAPI } from "../api/axios";

const onPinPayment = async (
  updateEntryData,
  toggleLoaderFalse,
  toggleErrorFlag
) => {
  try {
    //Update the appointment entry to store the date and token
    await putAPI({
      url: "updateWithToken",
      id: updateEntryData.entryId,
      body: updateEntryData,
    });
  } catch (err) {
    toggleErrorFlag();
  }

  toggleLoaderFalse();
};

export default onPinPayment;
