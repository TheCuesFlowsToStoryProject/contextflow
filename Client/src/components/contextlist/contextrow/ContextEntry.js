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
  const [userData, setUserData] = value.user;
  const user = userData.user !== undefined ? userData.user : userData.user2;
  const AddContextEntry = async () => {
    if (user) {
      if (data) {
        const arrl = Object.entries(contextData);
        var arr = [];
        arrl.filter(([key, value]) => {
          if (key.includes("atn")) {
            arr.push(value);
          }
        });

        var n = arr.includes(data.wp);
      }
      if (!n) {
        if (data && contextData && atn && user) {
          const user_id = user._id;
          const owner_id = contextData.uid;
          if (user_id === owner_id) {
            var index = atn + 1;
            const obj1 = {
              value: data._id,
              contextId: contextData._id,
              owner: user_id,
              key: `atn${index}`,
            };
            updateContextFlowById(obj1)
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
            alert("only owner can update");
          }
        } else {
          alert("please select one module entity");
        }
      } else {
        alert("This Module Entity already exist");
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
