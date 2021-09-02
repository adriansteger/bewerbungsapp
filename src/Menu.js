import React, { Component, useState } from "react";
import M from "materialize-css";
import Page from "./Page";
import { render } from "@testing-library/react";
import AppDB from "./AppDB";

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: false,
      page: false,
      appdb: false,
    };
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelector(".sidenav");
      var instances = M.Sidenav.init(elems, {});
    });
  }

  render() {
    return (
      <div>
        <nav className="teal darken-4">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Logo
            </a>
            <a href="#!" data-target="mobile-nav" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a
                  href="#Home"
                  onClick={() =>
                    this.setState({
                      home: "Willkommen auf dem Bewerbungstool. Das Projekt befindet sich noch in der Entwicklung und kann daher Fehler enthalten.",
                      page: "",
                      appdb: "",
                    })
                  }
                >
                  Home
                </a>
              </li>
              <li>
                <a href="#Page" onClick={() => this.PageClick()}>
                  Page A4
                </a>
              </li>
              <li>
                <a href="#AppDB" onClick={() => this.AppDBClick()}>
                  Applications
                </a>
              </li>
            </ul>
          </div>
          <ul className="sidenav" id="mobile-nav">
            <li>
              <a
                href="#Home"
                onClick={() =>
                  this.setState({
                    home: (
                      <p className="flow-text">
                        Willkommen auf dem Bewerbungstool. Das Projekt befindet
                        sich noch in der Entwicklung und verfügt daher nur über
                        eingeschränkte Funktionalität.
                      </p>
                    ),
                    page: "",
                    appdb: "",
                  })
                }
              >
                Home
              </a>
            </li>
            <li>
              <a href="#Page" onClick={() => this.PageClick()}>
                Page A4
              </a>
            </li>
            <li>
              <a href="#AppDB" onClick={() => this.AppDBClick()}>
                Applications
              </a>
            </li>
          </ul>
        </nav>
        {this.state.home}
        {this.state.page}
        {this.state.appdb}
      </div>
    );
  }
  PageClick() {
    this.setState({ home: "", appdb: "" });
    if (this.state.page) {
      this.setState({
        page: (
          <h5 className="center-align red">
            Die Seite wurde gelöscht. <br />
            Klicken Sie auf einen anderen Tab und wieder auf diesen um ein neues
            Formular zu erhalten.
          </h5>
        ),
      });
    } else {
      this.setState({ page: <Page size="A4" /> });
    }
    return false;
  }
  AppDBClick() {
    this.setState({ home: "", page: "" });
    this.setState({ appdb: <AppDB /> });
  }
}

export default Menu;
