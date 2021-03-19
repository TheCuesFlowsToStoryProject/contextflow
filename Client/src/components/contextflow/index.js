import React, { useEffect, useState, useContext } from "react";
import AddContext from "./AddContext";
import { getAllContextFlow } from "../../client-api/contextflow";
import "./context_flow.css";
import { Button } from "react-bootstrap";
import AddModuleEntity from "./AddModuleEnity";
import ErrorNotice from "../Notify/ErrorNotice";
import { UserContext } from "../../provider/UserProvider";

const ContextFlow = () => {
  const [error, setError] = useState();
  const [contextData, setContextData] = useState([]);
  const [add, setAdd] = useState(false);
  const [addModule, setAddModule] = useState(false);
  const [atn, setAtn] = useState();
  const [context, setContext] = useState();
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;
  useEffect(() => {
    (async () => {
      const data = await getAllContextFlow();
      setContextData(data.data.arr);
    })();
  }, [setAdd, add, addModule, setAddModule]);
  var flow_anchor = JSON.parse(sessionStorage.getItem("FlowAnchor"));
  var domain_anchor = JSON.parse(sessionStorage.getItem("DomainAnchor"));
  var user_anchor = JSON.parse(sessionStorage.getItem("UserAnchor"));

  const user = userData.user !== undefined ? userData.user : userData.user2;

  const Context = () => {
    setAdd(true);
  };
  const add_module = async (context) => {
    var count = 0;
    for (var key in context) {
      if (key.includes("atn")) {
        count = count + 1;
      }
    }
    setAtn(count);
    setAddModule(true);
    setContext(context);
  };

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
      {addModule ? (
        <>
          <AddModuleEntity
            context={context}
            atn={atn}
            setAddModule={setAddModule}
          />
        </>
      ) : null}
      <div style={{ marginTop: "10px" }}>
        {add ? <AddContext setError={setError} setAdd={setAdd} /> : null}
      </div>
      <div className="context-wrapper">
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
                <Button onClick={() => Context()}>+</Button>
              ) : null}
            </div>
          </div>
        </div>
        <hr />

        {contextData.map((context, index) => (
          <ul key={index} className="module-container">
            {" "}
            <div>
              <li>{context.domain}</li>
            </div>
            <div>
              <li>{context.flow}</li>
            </div>
            <div>
              <div className="wp-holder">
                {context.atn1 ? (
                  <>
                    {" "}
                    <li>{context.atn1}</li>{" "}
                    <div className="button-container">
                      <Button
                        variant="warning"
                        onClick={() => {
                          add_module(context);
                        }}
                        className="change-button"
                      >
                        +
                      </Button>
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn2 ? (
                  <>
                    {" "}
                    <li>{context.atn2}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn3 ? (
                  <>
                    {" "}
                    <li>{context.atn3}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn4 ? (
                  <>
                    {" "}
                    <li>{context.atn4}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn5 ? (
                  <>
                    {" "}
                    <li>{context.atn5}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn6 ? (
                  <>
                    {" "}
                    <li>{context.atn6}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn7 ? (
                  <>
                    {" "}
                    <li>{context.atn7}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn8 ? (
                  <>
                    {" "}
                    <li>{context.atn8}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn9 ? (
                  <>
                    {" "}
                    <li>{context.atn9}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn10 ? (
                  <>
                    {" "}
                    <li>{context.atn10}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn11 ? (
                  <>
                    {" "}
                    <li>{context.atn11}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn12 ? (
                  <>
                    {" "}
                    <li>{context.atn12}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn13 ? (
                  <>
                    {" "}
                    <li>{context.atn13}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn14 ? (
                  <>
                    {" "}
                    <li>{context.atn14}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn15 ? (
                  <>
                    {" "}
                    <li>{context.atn15}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn16 ? (
                  <>
                    {" "}
                    <li>{context.atn16}</li>{" "}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};
export default ContextFlow;
