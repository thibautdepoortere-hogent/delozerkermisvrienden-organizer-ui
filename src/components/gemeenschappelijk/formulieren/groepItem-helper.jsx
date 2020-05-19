import React from "react";

const FormulierGroepItemHelper = ({ id, inhoud }) => {
  return (
    <React.Fragment>
      {inhoud && (
        <div id={id + "Helper"} className="bp3-form-helper-text">
          {inhoud}
        </div>
      )}
    </React.Fragment>
  );
};

export default FormulierGroepItemHelper;
