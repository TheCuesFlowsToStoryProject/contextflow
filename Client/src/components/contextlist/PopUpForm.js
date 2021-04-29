import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { saveContextValue } from "../../client-api/contextflow";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PopUpForm = ({
  showForm,
  setShowForm,
  contextValue,
  valueData,
  contextId,
}) => {
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState("");
  useEffect(async () => {
    var d = await valueData.value;
    if (setMessage) {
      console.log(d);
      setMessage(valueData ? d : "");
    }
    setShow(showForm);
  }, [showForm, valueData]);
  const handleClose = () => {
    setShowForm(false);
  };
  const formSubmit = (e) => {
    e.preventDefault();

    if (message) {
      const obj = {
        contextvalue: message,
        value: contextValue,
        id: contextId,
      };
      saveContextValue(obj);
    }
    handleClose();
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{contextValue}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formSubmit}>
            <Form.Group>
              <CKEditor
                editor={ClassicEditor}
                data={message ? message : ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setMessage(data);
                }}
                // onBlur={(event, editor) => {}}
                // onFocus={(event, editor) => {}}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default PopUpForm;
