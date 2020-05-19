import React from "react";

const Knop = ({
  id,
  inhoud,
  icoon,
  intent,
  outlined,
  vullen,
  alleenLezen,
  onKlik,
}) => {
  return (
    <div className="knop-vullen">
      <button
        id={id}
        disabled={alleenLezen}
        onClick={onKlik}
        type="button"
        className={klasseOpbouwen(icoon, intent, outlined, vullen)}
      >
        {inhoud}
      </button>
    </div>
  );
};

function klasseOpbouwen(icoon, intent, outlined, vullen) {
  let classes = "bp3-button ";
  if (icoon) {
    classes = classes + "bp3-icon-" + icoon + " ";
  }
  if (intent) {
    classes = classes + "bp3-intent-" + intent + " ";
  }
  if (outlined) {
    classes = classes + "bp3-outlined ";
  }
  if (vullen) {
    classes = classes + "bp3-fill ";
  }
  return classes;
}

export default Knop;
