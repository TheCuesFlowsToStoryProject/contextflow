import React, { useState } from "react";
import ContextBunch from "./ContextBunch";
import "../context_flow.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import ChangeContext from "../ChangeContext";
const ContextFirstRow = ({ context, setRefresh }) => {
  const [change, setChange] = useState(false);
  const [changeData, setChangeData] = useState();
  var contxts = [context];
  const [addModule, setAddModule] = useState(false);
  const [contxtType, setContxtType] = useState(false);
  const [atn, setAtn] = useState();
  const [contexts, setContexts] = useState();
  const add_module = async (context) => {
    var count = 0;
    for (var key in context) {
      if (key.includes("atn")) {
        count = count + 1;
      }
    }
    setAtn(count);
    setAddModule(true);
    setContexts(context);
  };
  return (
    <Container fluid>
      {contxts.map((contxt, i) => (
        <Row key={i} style={{ background: "#ccf2ff" }}>
          <Col xs={3}>
            <li className="d-f-container">{contxt.domain}</li>
          </Col>
          <Col xs={3}>
            <li className="d-f-container">{contxt.flow}</li>
          </Col>
          <Col xs={6}>
            <div className="type-holder">
              <>
                <div className="type">
                  {<p className="typedata"> {contxt.contexttype}</p>}
                </div>
                <div className="button-container">
                  <Button
                    variant="warning"
                    onClick={() => {
                      add_module(contxt);
                    }}
                    className="change-button"
                  >
                    +
                  </Button>
                </div>
              </>
            </div>
          </Col>
        </Row>
      ))}
      <div>
        <ContextBunch
          setContxtType={setContxtType}
          context={context}
          addModule={addModule}
          atn={atn}
          setAddModule={setAddModule}
          contexts={contexts}
          setRefresh={setRefresh}
          setChange={setChange}
          change={change}
          setChangeData={setChangeData}
        />
      </div>
      <div>
        {change ? (
          <ChangeContext
            setContxtType={setContxtType}
            setRefresh={setRefresh}
            context={context}
            changeData={changeData}
            setChange={setChange}
          />
        ) : null}
      </div>
    </Container>
  );
};
export default ContextFirstRow;
