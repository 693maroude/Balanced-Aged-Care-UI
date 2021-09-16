const createHTML = ({ resolvedHTML }) => {
  //virtual DOM to remove "#signature-link" div
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = resolvedHTML;

  tempDiv.querySelector("img").remove();

  if (tempDiv.querySelector("#signature-link"))
    tempDiv.querySelector("#signature-link").remove();

  //get signature_form from DOM
  const signature_form = document.getElementById("form-template").innerHTML;

  //retrieve form container from templateContainer
  const formContainer = tempDiv.querySelector("#form-template");

  //set form container with signatureFormString
  formContainer.innerHTML = signature_form;

  //remove signature button before sending
  formContainer.querySelector("#remove-signature").remove();

  return tempDiv;
};

export default createHTML;
