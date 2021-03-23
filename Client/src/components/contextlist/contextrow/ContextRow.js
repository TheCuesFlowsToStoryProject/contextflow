import React from "react";
import ContextFirstRow from "./ContextFirstRow";
const ContextRow = ({ context, setRefresh }) => {
  return (
    <div>
      <ContextFirstRow context={context} setRefresh={setRefresh} />   //pp  what does contextrow  does that contextfirstrow does not ?
    </div>
  );
};
export default ContextRow;
