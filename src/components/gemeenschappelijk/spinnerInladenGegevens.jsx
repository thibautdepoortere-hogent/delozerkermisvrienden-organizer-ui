import React from "react";
import { Spinner } from "@blueprintjs/core";

const SpinnerInladenGegevens = () => {
  return (
    <div className="spinner-inladenGegevens">
      <Spinner intent={"Warning"} size={100} value={null} />
    </div>
  );
};

export default SpinnerInladenGegevens;
