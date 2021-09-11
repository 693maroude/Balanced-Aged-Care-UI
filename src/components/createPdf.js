import { putAPI, postAPI } from "../api/axios";

const createPdf = async (updateEntryData, toggleLoaderFalse) => {
  //get stored html as string
  const { TemplateString, SignatureFormString } = JSON.parse(
    localStorage.getItem("pdfHTMLString")
  );

  //creating a temp div to merge two html strings
  const templateContainer = document.createElement("div");
  templateContainer.innerHTML = TemplateString;

  //retrieve form container from templateContainer
  const formContainer = templateContainer.querySelector("#form-template");

  //set form container with signatureFormString
  formContainer.innerHTML = SignatureFormString;

  //remove signature button before sending
  formContainer.querySelector("#remove-signature").remove();

  const finalTemplate = templateContainer.outerHTML.replace("\n", " ");

  try {
    // create the pdf
    const s3result = await postAPI({
      url: "puppeteer",
      id: "pdf",
      template: finalTemplate,
    });

    // update the appointment entry to store the pdf info
    await putAPI({
      url: "update-appointment",
      id: updateEntryData.entryId,
      body: s3result,
    });

    await putAPI({
      url: "updateWithToken",
      id: updateEntryData.entryId,
      body: updateEntryData,
    });
  } catch (err) {
    console.log(err);
  }

  toggleLoaderFalse();
};

export default createPdf;
