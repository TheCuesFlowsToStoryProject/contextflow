import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./ContextValue.css";

const Pagination = ({ showPerPage, onPaginationChange, total, serialNo }) => {
  const [counter, setCounter] = useState(serialNo);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    // <div className="d-flex justify-content-between">
    <Row className="button-holder">
      <Button className="prev-button" onClick={() => onButtonClick("prev")}>
        Prev
      </Button>
      <Button className="next-button" onClick={() => onButtonClick("next")}>
        Next
      </Button>
    </Row>
    // </div>
  );
};

export default Pagination;
