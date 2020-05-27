import React from "react";
import { NavLink } from "react-router-dom";

const NavBarSubItem = ({ linkUrl, linkNaam, onMenuItemClick }) => {
  return (
    <NavLink className="nav-subitem" to={linkUrl} onClick={onMenuItemClick}>
      <p className="nav-subitem-text">{linkNaam}</p>
    </NavLink>
  );
};

export default NavBarSubItem;
