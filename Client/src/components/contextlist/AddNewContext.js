import React, { useState, useContext } from "react";
import WordPhrase from "../word-phrase/index";
import "./context_flow.css";
import { Button } from "react-bootstrap";
import { saveContextFlow } from "../../client-api/contextflow";
import { UserContext } from "../../provider/UserProvider";

const AddContext = ({ setAdd, setError }) => {
  const [domain, setDomain] = useState();
  const [flow, setFlow] = useState();
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
      console.log(user);
      if (
        domain &&
        flow &&
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
    <div>
      <div className="container">
        <div className="section">
          <WordPhrase
            setDomain={setDomain}
            name={"domain"}
            heading={domain_anchor ? domain_anchor.anchor : "Domain Anchor"}
          />
        </div>
        <div className="section">
          <WordPhrase
            setFlow={setFlow}
            name={"flow"}
            heading={flow_anchor ? flow_anchor.anchor : "Flow Anchor"}
          />
        </div>
        <div className="section">
          <WordPhrase
            setModel={setModel}
            isMulti={"isMulti"}
            name={"model_entity"}
            heading={"Model Entity"}
          />
          -
        </div>
      </div>
      <div style={{ width: "200px", margin: "auto" }}>
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
      </div>
    </div>
  );
};
export default AddContext;
