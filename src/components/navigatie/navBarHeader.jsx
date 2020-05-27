import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@blueprintjs/core";

const NavBarHeader = ({ linkUrl, linkNaam, onMenuClick }) => {
  return (
    <div className="nav-header">
      <Link className="nav-header-item" to={linkUrl}>
        <p className="nav-header-item-text">{linkNaam}</p>
      </Link>
      <Icon
        className="nav-header-menu"
        icon="menu"
        iconSize={30}
        onClick={onMenuClick}
      />
    </div>
  );
};

export default NavBarHeader;
