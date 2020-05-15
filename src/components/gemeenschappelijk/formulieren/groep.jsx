import React from "react";

const FormulierGroep = ({ data: formulierItems }) => {
  return (
    <div className="formulier-groep">
      {formulierItems.map((formulierItem) => (
        <div
          key={formulierItem.id}
          className={klasseGenereren(formulierItems.length)}
        >
          {formulierItem.item}
        </div>
      ))}
    </div>
  );
};

function klasseGenereren(aantalItems) {
  switch (aantalItems) {
    case 1:
    default:
      return "formulier-groep-item-alleen";
    case 2:
      return "formulier-groep-item-twee";
    case 3:
      return "formulier-groep-item-drie";
  }
}

export default FormulierGroep;
