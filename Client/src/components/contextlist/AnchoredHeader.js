import React from "react";
import "./context_flow.css";
import { Button } from "react-bootstrap";

const AnchoredHeader = ({ add, addModule, setAdd }) => {
  var flow_anchor = JSON.parse(sessionStorage.getItem("FlowAnchor"));
  var domain_anchor = JSON.parse(sessionStorage.getItem("DomainAnchor"));
  var user_anchor = JSON.parse(sessionStorage.getItem("UserAnchor"));

  return (
    <div>
      <div className="head-wrapper">
        <p>{domain_anchor ? <b> {domain_anchor.anchor} </b> : "Domain"}</p>
        <p>{flow_anchor ? <b>{flow_anchor.anchor} </b> : "Flow"}</p>
        <div className="sub-head">
          <p>
            {" "}
            <b>Model Entity</b>
          </p>
          <div className="button-container">
            {!add && !addModule ? (
              <Button onClick={() => setAdd(true)}>+</Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnchoredHeader;
