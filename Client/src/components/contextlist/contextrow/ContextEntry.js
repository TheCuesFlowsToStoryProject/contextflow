import React, { useState, useContext } from "react";
import WordPhrase from "../../word-phrase/index";
import { Button } from "react-bootstrap";
import { updateContextFlowById } from "../../../client-api/contextflow";
import ErrorNotice from "../../Notify/ErrorNotice";
import { UserContext } from "../../../provider/UserProvider";

const ContextEntry = ({ setAddModule, atn, setRefresh, contextData }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const value = useContext(UserContext);
  const [userData] = value.user;
  const user = userData.user !== undefined ? userData.user : userData.user2;
  const AddContextEntry = async () => {
    if (user) {
      if (data) {
        const check_entity = contextData.atttentionentities.includes(data.wp);
        if (!check_entity) {
          if (user._id === contextData.owner) {
            var obj = {
              contextId: contextData._id,
              wpId: data._id,
              currentUser: user._id,
            };
            updateContextFlowById(obj)
              .then((res) => {
                setAddModule(false);
                setError(res.data.err);
                setRefresh(res);
              })
              .catch((err) => {
                setAddModule(false);
                setRefresh(err);
              });
          } else {
            alert("only owner can add");
          }
        } else {
          alert("this model entity is already exists");
        }
      } else {
        alert("please select an entity");
      }
    } else {
      alert("Please log in");
    }
  };
  return (
    <div>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <WordPhrase setAddModulesData={setData} name={"add module entity"} />
      <div style={{ width: "200px", margin: "auto", marginTop: "10px" }}>
        <Button variant="danger" onClick={() => setAddModule(false)}>
          cancel
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={() => AddContextEntry()}
        >
          confirm add
        </Button>
      </div>
    </div>
  );
};
export default ContextEntry;
