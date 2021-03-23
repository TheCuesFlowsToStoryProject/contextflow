import React from "react";
import { Button } from "react-bootstrap";
import "../context_flow.css";
import ContextEntry from "./ContextEntry";    //pp Where are you using contexyEntry ? , conceptually there should be a for loop going as many times as the
                                              // number of current entities ; whole ida of component is to avoid the repeat code of 12 times in this module 
const ContextBunch = ({
  context,
  addModule,
  atn,
  setAddModule,
  contexts,
  setRefresh,
}) => {
  var contxts = [context];
  return (
    <div>
      {contxts.map((context, index) => (
        <ul key={index} className="module-containers">
          <div></div>
          <div></div>
          <div>
            <div className="wp-holder">
              {context.atn2 ? (
                <>
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
          </div>
        </ul>
      ))}
      {addModule ? (
        <>
          <ContextEntry
            contextData={contexts}
            atn={atn}
            setAddModule={setAddModule}
            setRefresh={setRefresh}
          />
        </>
      ) : null}
    </div>
  );
};
export default ContextBunch;
