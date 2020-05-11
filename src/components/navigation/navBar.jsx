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
          />
          <NavBarItem
            linkUrl="/inschrijvingen/opzoeken"
            linkNaam="Inschrijving opzoeken"
            icoonNaam="search"
          />
          <NavBarItem linkUrl="/lijsten" linkNaam="Lijsten" icoonNaam="list" />
          <NavBarItem
            linkUrl="/fabrieksinstellingen"
            linkNaam="Fabrieksinstellingen"
            icoonNaam="reset"
          />
          <div className="divider"></div>
          <NavBarItem linkUrl="/login" linkNaam="Login" icoonNaam="log-in" />
        </div>
      </div>
    );
  }

  renderClassNameDivNavBarItems = () => {
    return this.state.menuZichtbaar ? "" : "onzichtbaar";
  };

  handleMenuClick = () => {
    console.log("Clicked");
    this.setState({ menuZichtbaar: !this.state.menuZichtbaar });
  };
}

export default NavBar;
