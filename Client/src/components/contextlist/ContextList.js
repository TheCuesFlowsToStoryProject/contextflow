import React, { useEffect, useState, useContext } from "react";
import AddContext from "./AddNewContext";
import { getAllContextFlow } from "../../client-api/contextflow";
import "./context_flow.css";
import ErrorNotice from "../Notify/ErrorNotice";
import { UserContext } from "../../provider/UserProvider";
import AnchoredHeader from "./AnchoredHeader";
import ContextRow from "./contextrow/ContextRow";

const ContextFlow = () => {
  const [error, setError] = useState();
  const [contextData, setContextData] = useState([]);
  const [add, setAdd] = useState(false);
  const [addModule, setAddModule] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const value = useContext(UserContext);
  const [userData] = value.user;
  useEffect(() => {
    (async () => {
      const data = await getAllContextFlow();
      setContextData(data.data.arr);
    })();
  }, [setAdd, add, addModule, setAddModule, refresh]);

  var user_anchor = JSON.parse(sessionStorage.getItem("UserAnchor"));

  const user = userData.user !== undefined ? userData.user : userData.user2;

  return (
    <div className="main-containers">
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <div>
        {user_anchor ? (
          <div className="user_anchor">
            <b>{user_anchor.anchor}</b>
          </div>
        ) : null}
      </div>
      <div className="user-container">
        {user ? (
          <p>
            Username : <b>{user.name}</b>{" "}
          </p>
        ) : null}
      </div>
      <div style={{ marginTop: "10px" }}>
        {add ? <AddContext setError={setError} setAdd={setAdd} /> : null}
      </div>
      <div className="context-wrapper">
        <AnchoredHeader setAdd={setAdd} add={add} addModule={addModule} />
        <hr />

        {contextData.map((context, index) => (
          <div key={index}>
            <ContextRow context={context} setRefresh={setRefresh} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ContextFlow;
