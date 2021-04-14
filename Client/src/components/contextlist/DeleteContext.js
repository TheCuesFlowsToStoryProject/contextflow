import React from "react";
import { Form, Button } from "react-bootstrap";

const DeleteContext = ({ setDelete, attention, removeEntity }) => {
  return (
    <div style={{ width: "50%", marginLeft: "37.7%" }}>
      <Form id="edit-form">
        <Form.Group>
          <Form.Control
            type="text"
            name="component"
            value={attention}
            placeholder="Edit Anchor"
            disabled
          />
        </Form.Group>

        <Button
          variant="success"
          style={{ margin: "5px" }}
          onClick={() => removeEntity()}
        >
          Donfirm Delete
        </Button>

        <Button
          variant="danger"
          onClick={() => {
            setDelete(false);
          }}
        >
          cancel
        </Button>
      </Form>
    </div>
  );
};
export default DeleteContext;
