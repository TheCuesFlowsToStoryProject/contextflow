import React from "react";
import "./context_flow.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const AnchoredHeader = ({ add, addModule, setAdd }) => {
  var flow_anchor = JSON.parse(sessionStorage.getItem("FlowAnchor"));
  var domain_anchor = JSON.parse(sessionStorage.getItem("DomainAnchor"));
  // var user_anchor = JSON.parse(sessionStorage.getItem("UserAnchor"));

  return (
    <Container fluid>
      <Row style={{ display: "flex", flexDirection: "row" }}>
        <Col xs={3}>
          <p>{domain_anchor ? <b> {domain_anchor.anchor} </b> : "Domain"}</p>
        </Col>
        <Col xs={3}>
          <p>{flow_anchor ? <b>{flow_anchor.anchor} </b> : "Flow"}</p>
        </Col>
        <Col xs={2}>
          <div className="sub-head">
            <p>
              {" "}
              <b>Model Entity</b>
            </p>
          </div>
        </Col>
        <Col xs={4}>
          <div className="sub-head">
            <p>
              <b>Type</b>
            </p>
            <div className="button-container">
              {!add && !addModule ? (
                <Button onClick={() => setAdd(true)}>+</Button>
              ) : null}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default AnchoredHeader;
