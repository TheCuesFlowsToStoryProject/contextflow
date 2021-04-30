import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ContextValueList from "./ContextValueList";

const ContextValueModal = ({
  showContextValueModal,
  setShowContextValueModal,
  contextAllvalue,
  context,
  atn,
  contxts,
}) => {
  const handleClose = () => setShowContextValueModal(false);
  const [show, setShow] = useState(false);
  // const [heading, setHeading] = useState("");

  useEffect(async () => {
    setShow(showContextValueModal);
  }, [showContextValueModal]);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title></Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <ContextValueList
            contextAllvalue={contextAllvalue}
            context={context}
            atn={atn}
            contxts={contxts}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ContextValueModal;
