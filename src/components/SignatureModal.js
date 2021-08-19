import { useState } from "react";
import Modal from "./styles/Modal";
import { Button } from "./styles/Button";
import List from "./styles/List";

const Signature = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Button onClick={openModal}>Create New Signature</Button>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <h4>Create New Signature</h4>
        <List>
          <li style={{ marginLeft: "auto" }}>Type it in</li>
          <li style={{ marginRight: "auto" }}>Draw it in</li>
        </List>
        <hr />
      </Modal>
    </>
  );
};

export default Signature;
