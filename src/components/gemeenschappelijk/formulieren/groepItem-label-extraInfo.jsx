import React from "react";

const FormulierGroepItemLabelExtraInfo = ({ id, inhoud, onKlik }) => {
  return (
    <React.Fragment>
      {inhoud && !onKlik && (
        <span id={id + "ExtraInfo"} className="bp3-text-muted">
          ({inhoud})
        </span>
      )}
      {inhoud && onKlik && (
        <span
          id={id + "ExtraInfo"}
          className="bp3-text-muted cursorHandje"
          onClick={onKlik}
        >
          ({inhoud})
        </span>
      )}
    </React.Fragment>
  );
};

export default FormulierGroepItemLabelExtraInfo;
