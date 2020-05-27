import { Component } from "react";
import * as authenticatieService from "../services/api/authenticatieService";

class LogUit extends Component {
  state = {};

  componentDidMount() {
    authenticatieService.handleLogUit();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default LogUit;
