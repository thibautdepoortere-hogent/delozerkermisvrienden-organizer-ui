import React from "react";
import { Icon } from "@blueprintjs/core";

const Knop = ({ naam, clickEvent, functie, object, extraClasses }) => {
  const icoon = icoonAanmaken(functie);
  return (
    <button
      type="button"
      className={classesAanmaken(functie, extraClasses)}
      onClick={object ? () => clickEvent(object) : () => clickEvent()}
    >
      {icoon && !naam && <Icon icon={icoonAanmaken(functie)} />}
      {naam ? naam : ""}
    </button>
  );
};

const classesAanmaken = (functie, extraClasses) => {
  let classes = "bp3-button ";
  if (extraClasses) {
    classes = classes + extraClasses + " ";
  }
  switch (functie) {
    case "bewerken":
      classes += "bp3-intent-primary";
      break;
    case "verwijderen":
      classes += "bp3-intent-danger";
      break;
    default:
      break;
  }

  return classes;
};

const icoonAanmaken = (functie) => {
  let icoon = "";
  switch (functie) {
    case "bewerken":
      icoon = "edit";
      break;
    case "verwijderen":
      icoon = "cross";
      break;
    default:
      break;
  }

  return icoon;
};

export default Knop;
