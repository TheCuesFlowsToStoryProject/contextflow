import React, { useState, useContext } from "react";
import WordPhrase from "../word-phrase/index";
import "./context_flow.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../../provider/UserProvider";
import { changeContextById } from "../../client-api/contextflow";
import SelectCurd from "../select/index";
const ChangeContext = ({
  setChange,
  changeData,
  context,
  setRefresh,
  setContxtType,
}) => {
  const [domain, setSelectDomain] = useState([]);
  const [flow, setSelectFlow] = useState([]);
  const [modelEntity, setSelectmodelEntity] = useState([]);
  const value = useContext(UserContext);
  const [contexttype, setContexttype] = useState();
  const [userData] = value.user;
  const user = userData.user !== undefined ? userData.user : userData.user2;

  const cancelChange = () => {
    setChange(false);
    setContxtType(false);
  };
  const conFirmChange = () => {
    if (user._id === context.owner) {
      var changeableData = {
        domain: domain.domain,
        flow: flow.flow,
        model_entity: modelEntity.model_entity,
        old_entity: changeData.model_entity,
        contexttype: contexttype.anchor,
        user: user._id,
        contextId: context._id,
      };
      changeContextById(changeableData).then((res) => {
        setRefresh(res);
        setContxtType(false);
        setChange(false);
      });
    } else {
      alert("only owner can make change");
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={11} lg={4}>
          <WordPhrase
            background={"#f7786b"}
            name={"domain"}
            heading={"Domain"}
            setSelectDomain={setSelectDomain}
            selectValue={changeData.domain}
          />
        </Col>
        <Col xs={11} lg={4}>
          <WordPhrase
            background={"#f7786b"}
            name={"flow"}
            heading={"flow"}
            selectValue={changeData.flow}
            setSelectFlow={setSelectFlow}
          />
        </Col>
        <Col xs={11} lg={4}>
          <WordPhrase
            background={"#f7786b"}
            name={"model_entity"}
            heading={"Model Entity"}
            setSelectmodelEntity={setSelectmodelEntity}
            selectValue={changeData.model_entity}
          />
        </Col>
        <Col xs={11} lg={12}>
          <SelectCurd
            anchorType={"typecollection"}
            setContexttype={setContexttype}
            typeValue={changeData.contexttype}
          />
        </Col>

        <Col>
          <div className="button-wrapper">
            <Button variant="danger" onClick={() => cancelChange()}>
              cancel
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => conFirmChange()}
            >
              {" "}
              confirm change
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default ChangeContext;
