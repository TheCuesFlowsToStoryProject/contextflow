import React from "react";
import Header from "./Header";

const RepeatAnchor = ({ context }) => {
  var contexts = { a: context };
  return (
    <div>
      {Object.keys(contexts.a).map((key, i) => (
        <div key={i}>
          {key === "flow" ? (
            <>
              {" "}
              <span>Key Name: {key}</span>
              <span>Value: {contexts.a[key]}</span>{" "}
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
};
export default RepeatAnchor;
hedaer: Anchor - value - Header.js;
