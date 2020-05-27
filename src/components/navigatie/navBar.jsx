import React, { Component } from "react";
import NavBarHeader from "./navBarHeader";
import NavBarItem from "./navBarItem";
import "../../css/navBar.css";
import "../../css/navBar-smaller.css";
import { Icon } from "@blueprintjs/core";
import NavBarSubItem from "./navBarSubItem";
import * as authenticatieService from "../../services/api/authenticatieService";

class NavBar extends Component {
  state = { menuZichtbaar: false, loginZichtbaar: false };
  render() {
    const { gebruiker } = this.props;
    const id = authenticatieService.getActieveGebruikersId();
    const rol = authenticatieService.getActieveGebruikersRol();
    return (
      <div className="nav">
        <NavBarHeader
          linkUrl="/"
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
          {gebruiker &&
            rol === "Standhouder" &&
            id !== "" &&
            id !== "geenid" &&
            id !== "geengebruiker" && (
              <NavBarItem
                linkUrl={"/inschrijvingen/" + id + "/status"}
                linkNaam="Status controleren"
                icoonNaam="search"
                onMenuItemClick={this.handleMenuItemClick}
              />
            )}
          {gebruiker && rol === "Administrator" && (
            <React.Fragment>
              <NavBarItem
                linkUrl="/lijsten"
                linkNaam="Lijsten"
                icoonNaam="list"
                onMenuItemClick={this.handleMenuItemClick}
              />
              <NavBarItem
                linkUrl="/inschrijvingen/opzoeken"
                linkNaam="Inschrijving opzoeken (Admin)"
                icoonNaam="search"
                onMenuItemClick={this.handleMenuItemClick}
              />
              <NavBarItem
                linkUrl="/fabrieksinstellingen"
                linkNaam="Fabrieksinstellingen"
                icoonNaam="reset"
                onMenuItemClick={this.handleMenuItemClick}
              />
            </React.Fragment>
          )}
          {gebruiker && <div className="divider"></div>}
          {!gebruiker && (
            <React.Fragment>
              <div
                className="nav-item cursorHandje"
                onClick={this.handleLoginClick}
              >
                <Icon className="nav-item-icon" icon="log-in" iconSize={20} />
                <p className="nav-item-text">Login</p>
              </div>
              {this.state.loginZichtbaar && (
                <React.Fragment>
                  <NavBarSubItem
                    linkUrl="/authenticatie/standhouder"
                    linkNaam="Standhouder"
                    onMenuItemClick={this.handleMenuItemClick}
                  />
                  <NavBarSubItem
                    linkUrl="/authenticatie/administrator"
                    linkNaam="Administrator"
                    onMenuItemClick={this.handleMenuItemClick}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
          {gebruiker && (
            <React.Fragment>
              <div className="nav-item">
                <Icon className="nav-item-icon" icon="user" iconSize={20} />
                <p className="nav-item-text">{gebruiker.given_name}</p>
              </div>
              <NavBarItem
                linkUrl="/authenticatie/loguit"
                linkNaam="Log uit"
                icoonNaam="log-out"
                onMenuItemClick={this.handleMenuItemClick}
              />
            </React.Fragment>
          )}
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

  handleLoginClick = () => {
    this.setState({ loginZichtbaar: !this.state.loginZichtbaar });
  };
}

export default NavBar;
