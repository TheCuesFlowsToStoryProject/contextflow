import React from "react";
import ContextFirstRow from "./ContextFirstRow";
const ContextRow = ({ context, setRefresh }) => {
  return (
    <div>
      <ContextFirstRow context={context} setRefresh={setRefresh} />
    </div>
  );
};
export default ContextRow;
