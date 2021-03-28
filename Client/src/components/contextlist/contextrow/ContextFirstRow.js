import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ContextBunch from "./ContextBunch";
const ContextFirstRow = ({ context, setRefresh }) => {
  var contxts = [context];
  const [addModule, setAddModule] = useState(false);
  const [atn, setAtn] = useState();
  const [contexts, setContexts] = useState();
  const add_module = async (context) => {
    var count = 0;
    for (var key in context) {
      if (key.includes("atn")) {
        count = count + 1;
      }
    }
    setAtn(count);
    setAddModule(true);
    setContexts(context);
  };
  return (
    <div>
      {contxts.map((contxt, i) => (
        <ul
          key={i}
          className="module-containers"
          style={{ background: "#ccf2ff" }}
        >
          <div>
            <li>{contxt.domain}</li>
          </div>
          <div>
            <li>{contxt.flow}</li>
          </div>
          <div>
            <div className="wp-holder">
              <>
                <div className="button-container">
                  <Button
                    variant="warning"
                    onClick={() => {
                      add_module(contxt);
                    }}
                    className="change-button"
                  >
                    +
                  </Button>
                </div>
              </>
            </div>
          </div>
        </ul>
      ))}
      <div>
        <ContextBunch
          context={context}
          addModule={addModule}
          atn={atn}
          setAddModule={setAddModule}
          contexts={contexts}
          setRefresh={setRefresh}
        />
      </div>
    </div>
  );
};
export default ContextFirstRow;
