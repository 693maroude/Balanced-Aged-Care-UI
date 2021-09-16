const CreateHTML = ({ resolvedHTML }) => {
  //get signature_form from DOM
  const signature_form = document.getElementById("form-template").innerHTML;

  //virtual DOM to remove "#signature-link" div
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = resolvedHTML;
  tempDiv.querySelector("#signature-link").remove();
  const TemplateString = tempDiv.outerHTML.replace("\n", " ");

  //required html stored as string in the object
  // const pdfHTMLString = {
  //   TemplateString: TemplateString,
  //   SignatureFormString: signature_form,
  // };

  //creating a temp div to merge two html strings
  const templateContainer = document.createElement("div");
  templateContainer.innerHTML = TemplateString;

  //retrieve form container from templateContainer
  const formContainer = templateContainer.querySelector("#form-template");

  //set form container with signatureFormString
  formContainer.innerHTML = signature_form;

  //remove signature button before sending
  formContainer.querySelector("#remove-signature").remove();

  //return templateContainer.outerHTML.replace("\n", " ");

  return templateContainer;
};

export default CreateHTML;
