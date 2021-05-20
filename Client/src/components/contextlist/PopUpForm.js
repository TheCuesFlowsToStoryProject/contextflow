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
      setMessage(valueData ? d : "");
    }
    setShow(showForm);
  }, [showForm, valueData]);
  const handleClose = () => {
    setShowForm(false);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    var plainString = message.replace(/<[^>]+>/g, "");
    const res = IsJsonString(plainString);
    if (res) {
      if (message) {
        const obj = {
          contextvalue: message,
          value: contextValue,
          id: contextId,
        };
        saveContextValue(obj);
      }
      handleClose();
    } else {
      alert("only valid json is alowed");
    }
  };

  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

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
