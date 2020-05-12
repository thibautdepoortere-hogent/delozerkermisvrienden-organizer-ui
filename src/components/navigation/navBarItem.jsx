import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@blueprintjs/core";

const NavBarItem = ({ linkUrl, linkNaam, icoonNaam, onMenuItemClick }) => {
  return (
    <NavLink className="nav-item" to={linkUrl} onClick={onMenuItemClick}>
      <Icon className="nav-item-icon" icon={icoonNaam} iconSize={20} />
      <p className="nav-item-text">{linkNaam}</p>
    </NavLink>
  );
};

export default NavBarItem;
