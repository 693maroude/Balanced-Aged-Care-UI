import { useState } from "react";
import Modal from "./Modal";
import { Button } from "./styles/Button";

const CreateSignatureButton = ({ setSignature }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Button onClick={openModal}>Create New Signature</Button>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        setSignature={setSignature}
      />
    </>
  );
};

export default CreateSignatureButton;
