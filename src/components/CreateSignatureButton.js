import { useState } from "react";
import Modal from "./Modal";
import { Button } from "./styles/Button";

const CreateSignatureButton = ({ signature, setSignature }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Button onClick={openModal}>Create</Button>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        signature={signature}
        setSignature={setSignature}
      />
    </>
  );
};

export default CreateSignatureButton;
