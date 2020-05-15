import React from "react";

const FormulierGroepItemLabel = ({
  id,
  omschrijving,
  extraInfo,
  onKlikExtraInfo,
}) => {
  return (
    <label className="bp3-label" htmlFor={id}>
      {omschrijving + " "}
      {extraInfo && !onKlikExtraInfo && (
        <span className="bp3-text-muted cursorHandje">({extraInfo})</span>
      )}
      {extraInfo && onKlikExtraInfo && (
        <span className="bp3-text-muted cursorHandje" onClick={onKlikExtraInfo}>
          ({extraInfo})
        </span>
      )}
    </label>
  );
};

export default FormulierGroepItemLabel;
