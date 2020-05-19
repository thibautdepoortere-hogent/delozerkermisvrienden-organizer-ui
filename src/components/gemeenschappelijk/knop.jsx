import React from "react";

const Knop = ({ id, omschrijving, icoon, intent, onKlik }) => {
  return (
    <button
      id={id}
      type="button"
      className={klasseOpbouwen(icoon, intent)}
      onClick={onKlik}
    >
      {omschrijving}
    </button>
  );
};

function klasseOpbouwen(icoon, intent) {
  let classes = "bp3-button ";
  if (icoon) {
    classes = classes + "bp3-icon-" + icoon;
  }
  if (intent) {
    classes = classes + "bp3-intent-" + intent;
  }
  return classes;
}

export default Knop;
