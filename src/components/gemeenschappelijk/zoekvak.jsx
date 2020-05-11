import React from "react";

const Zoekvak = ({
  id,
  omschrijving,
  extraInfo,
  value,
  placeholder,
  icoon,
  helperInfo,
  onChange,
}) => {
  return (
    <div className="bp3-form-group">
      <label className="bp3-label" htmlFor={id}>
        {omschrijving}
        {extraInfo && <span className="bp3-text-muted">({extraInfo})</span>}
      </label>
      <div className="bp3-form-content">
        <div className="bp3-input-group">
          {icoon && <span className={icoonClasses(icoon)}></span>}
          <input
            id={id}
            type="text"
            className="bp3-input"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            //dir="auto"
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

export default Zoekvak;
