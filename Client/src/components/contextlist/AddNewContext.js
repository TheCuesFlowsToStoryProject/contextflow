import React, { useState, useContext } from "react";
import WordPhrase from "../word-phrase/index";
import "./context_flow.css";
import { saveContextFlow } from "../../client-api/contextflow";
import { UserContext } from "../../provider/UserProvider";
import { Container, Row, Col, Button } from "react-bootstrap";
import SelectCurd from "../select/index";

const AddContext = ({ setAdd, setError }) => {
  const [domain, setDomain] = useState();
  const [flow, setFlow] = useState();
  const [contexttype, setContexttype] = useState();
  const [model_entity, setModel] = useState([]);
  var flow_anchor = JSON.parse(sessionStorage.getItem("FlowAnchor"));
  var domain_anchor = JSON.parse(sessionStorage.getItem("DomainAnchor"));
  var user_anchor = JSON.parse(sessionStorage.getItem("UserAnchor"));
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;
  const user = userData.user !== undefined ? userData.user : userData.user2;
  var ModelEntity = model_entity.map(function (item) {
    return item["wp"];
  });
  const saveContext = async () => {
    if (user) {
      if (
        domain &&
        flow &&
        contexttype &&
        flow_anchor &&
        domain_anchor &&
        user &&
        user_anchor &&
        model_entity.length > 0
      ) {
        let d = [
          domain,
          flow,
          { FlowAnchor: flow_anchor.anchor },
          { DomainAnchor: domain_anchor.anchor },
          { UserAnchor: user_anchor.anchor },
          { contexttype: contexttype.anchor },
          { uid: user._id },
          ModelEntity,
        ];

        saveContextFlow(d).then((res) => {
          setError(res.data.err);
          setAdd(false);
        });
      } else {
        alert("Plesae select all the field");
      }
    } else {
      alert("Please log in");
    }
  };

  return (
    <Container fluid className="context-wrapper">
      <Row>
        <Col xs={11} lg={4}>
          <WordPhrase
            setDomain={setDomain}
            name={"domain"}
            heading={domain_anchor ? domain_anchor.anchor : "Domain Anchor"}
          />
        </Col>
        <Col xs={11} lg={4}>
          <WordPhrase
            setFlow={setFlow}
            name={"flow"}
            heading={flow_anchor ? flow_anchor.anchor : "Flow Anchor"}
          />
        </Col>
        <Col xs={11} lg={4}>
          <WordPhrase
            setModel={setModel}
            model_entity={model_entity}
            isMulti={"isMulti"}
            name={"model_entity"}
            heading={"Model Entity"}
          />
        </Col>
        <Col xs={11} lg={12}>
          <SelectCurd
            anchorType={"typecollection"}
            setContexttype={setContexttype}
          />
        </Col>
      </Row>
      <Row style={{ width: "200px", margin: "auto", marginTop: "10px" }}>
        <Button
          variant="danger"
          onClick={() => {
            setAdd(false);
          }}
        >
          cancel
        </Button>
        <Button
          onClick={() => {
            saveContext();
          }}
          style={{ marginLeft: "10px" }}
        >
          {" "}
          confirm add
        </Button>
      </Row>
    </Container>
  );
};
export default AddContext;
