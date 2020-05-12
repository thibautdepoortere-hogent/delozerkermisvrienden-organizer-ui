import React, { Component } from "react";
import NavBarHeader from "./navBarHeader";
import NavBarItem from "./navBarItem";
import "../../css/navBar.css";
import "../../css/navBar-smaller.css";

class NavBar extends Component {
  state = { menuZichtbaar: false };
  render() {
    return (
      <div className="nav">
        <NavBarHeader
          linkUrl="/home"
          linkNaam="De Lozerkermis Vrienden"
          onMenuClick={this.handleMenuClick}
        />
        <div className={this.renderClassNameDivNavBarItems()}>
          <NavBarItem
            linkUrl="/inschrijvingen/nieuw"
            linkNaam="Nieuwe inschrijving"
            icoonNaam="add"
            onMenuItemClick={this.handleMenuItemClick}
          />
          <NavBarItem
            linkUrl="/inschrijvingen/opzoeken"
            linkNaam="Inschrijving opzoeken"
            icoonNaam="search"
            onMenuItemClick={this.handleMenuItemClick}
          />
          <NavBarItem
            linkUrl="/lijsten"
            linkNaam="Lijsten"
            icoonNaam="list"
            onMenuItemClick={this.handleMenuItemClick}
          />
          <NavBarItem
            linkUrl="/fabrieksinstellingen"
            linkNaam="Fabrieksinstellingen"
            icoonNaam="reset"
            onMenuItemClick={this.handleMenuItemClick}
          />
          <div className="divider"></div>
          <NavBarItem
            linkUrl="/login"
            linkNaam="Login"
            icoonNaam="log-in"
            onMenuItemClick={this.handleMenuItemClick}
          />
        </div>
      </div>
    );
  }

  renderClassNameDivNavBarItems = () => {
    return this.state.menuZichtbaar ? "nav-items" : "nav-items onzichtbaar";
  };

  handleMenuClick = () => {
    this.setState({ menuZichtbaar: !this.state.menuZichtbaar });
  };

  handleMenuItemClick = () => {
    if (this.state.menuZichtbaar) {
      this.setState({ menuZichtbaar: false });
    }
  };
}

export default NavBar;
