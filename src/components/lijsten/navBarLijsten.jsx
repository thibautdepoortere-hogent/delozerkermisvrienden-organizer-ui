import React from "react";
import { Link } from "react-router-dom";
import "../../css/navBarLijsten.css";
import "../../css/navBarLijsten-smaller.css";

const NavBarLijsten = ({ lijsten }) => {
  return (
    <div className="bp3-dark nav-bar-lijsten">
      {lijsten.map((lijst) => (
        <Link
          key={lijst.id}
          className={getClassName(lijst.extraClass)}
          to={lijst.link}
        >
          {lijst.omschrijving}
        </Link>
      ))}
    </div>
  );
};

function getClassName(extraClass) {
  let classes = "bp3-button nav-bar-lijsten-item ";
  if (extraClass) {
    return classes + extraClass;
  } else {
    return classes;
  }
}

export default NavBarLijsten;
