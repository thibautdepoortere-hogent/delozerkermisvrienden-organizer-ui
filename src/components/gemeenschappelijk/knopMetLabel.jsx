import React from "react";
import Knop from "./knop";

const KnopMetLabel = ({
  id,
  omschrijving,
  extraInfo,
  value,
  placeholder,
  icoon,
  helperInfo,
  onChange,
  functie,
  object,
  extraClasses,
}) => {
  return (
    <div className="bp3-form-group">
      <label className="bp3-label" htmlFor={id}>
        {omschrijving}
        {extraInfo && <span className="bp3-text-muted">({extraInfo})</span>}
      </label>
      <div className="bp3-form-content">
        <div className="bp3-input-group">
          <Knop
            naam={omschrijving}
            clickEvent={onChange}
            functie={functie}
            object={object}
            extraClasses={extraClasses}
          />
        </div>
        {helperInfo && <div className="bp3-form-helper-text">{helperInfo}</div>}
      </div>
    </div>
  );
};

function icoonClasses(icoon) {
  let classes = "bp3-icon ";
  if (icoon) {
    return classes + "bp3-icon-" + icoon;
  } else {
    return classes;
  }
}

export default KnopMetLabel;
