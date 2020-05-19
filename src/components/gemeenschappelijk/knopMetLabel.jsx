import React from "react";
import Knop from "./knop";

const KnopMetLabel = ({
  id,
  omschrijving,
  omschrijvingKnop,
  extraInfo,
  icoon,
  intent,
  helperInfo,
  onKlik,
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
            id={id}
            omschrijving={omschrijvingKnop}
            icoon={icoon}
            intent={intent}
            onKlik={onKlik}
          />
        </div>
        {helperInfo && <div className="bp3-form-helper-text">{helperInfo}</div>}
      </div>
    </div>
  );
};

export default KnopMetLabel;
