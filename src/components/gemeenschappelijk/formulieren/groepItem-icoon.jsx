import React from "react";

const FormulierGroepItemIcoon = ({ id, waarde }) => {
  return (
    <span id={id + "Icoon"} className={"bp3-icon bp3-icon-" + waarde}></span>
  );
};

export default FormulierGroepItemIcoon;
