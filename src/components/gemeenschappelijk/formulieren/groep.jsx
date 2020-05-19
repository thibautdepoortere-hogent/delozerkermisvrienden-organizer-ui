import React from "react";

const FormulierGroep = ({ formulierItems }) => {
  return (
    <div className="formulier-groep">
      {formulierItems.map((formulierItem) => (
        <div
          key={formulierItem.props.id}
          className={klasseGenereren(formulierItems.length)}
        >
          {formulierItem}
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
