import React, { useState, useEffect } from "react";
import M from "materialize-css";
import * as Yup from "yup";

import Page from "./Page";
import AppDB from "./AppDB";
import Login from "./Login";

const Menu = () => {
  const [home, setHome] = useState("");
  const [page, setPage] = useState("");
  const [appDb, setAppDB] = useState("");

  const validationSchema = Yup.object().shape({
    bewerbender: Yup.string().required("Bewerbender ist ein Pflichtfeld"),
    beruf: Yup.string().required("Beruf ist ein Pflichtfeld"),
    jobbeschreibung: Yup.string().required("Jobbeschreibung ist ein Pflichtfeld"),
    geschlecht: Yup.string().required("Geschlecht ist ein Pflichtfeld"),
    nachname: Yup.string().required("Nachname ist ein Pflichtfeld"),
    mailSent: Yup.string().required("MailSent ist ein Pflichtfeld")
  });

  useEffect(() => {
    const elems = document.querySelector(".sidenav");
    M.Sidenav.init(elems, {});
  }, []);

  const PageClick = () => {
    setHome("");
    setAppDB("");
    if (page) {
      setPage(
        <h5 className="center-align red">
          Die Seite wurde gelöscht. <br />
          Klicken Sie auf einen anderen Tab und wieder auf diesen um ein neues Formular zu erhalten.
        </h5>
      );
    } else {
      setPage(<Page size="A4" />);
    }
    return false;
  };

  const AppDBClick = () => {
    setHome("");
    setPage("");
    setAppDB(<AppDB />);
  };

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
                onClick={() => {
                  setHome(<Login />);
                  setPage("");
                  setAppDB("");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a href="#Page" onClick={PageClick}>
                Page A4
              </a>
            </li>
            <li>
              <a href="#AppDB" onClick={AppDBClick}>
                Applications
              </a>
            </li>
          </ul>
        </div>
        <ul className="sidenav" id="mobile-nav">
          <li>
            <a
              href="#Home"
              onClick={() => {
                setHome(
                  <p className="flow-text">
                    Willkommen auf dem Bewerbungstool. Das Projekt befindet sich noch in der
                    Entwicklung und verfügt daher nur über eingeschränkte Funktionalität.
                  </p>
                );
                setPage("");
                setAppDB("");
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a href="#Page" onClick={PageClick}>
              Page A4
            </a>
          </li>
          <li>
            <a href="#AppDB" onClick={AppDBClick}>
              Applications
            </a>
          </li>
        </ul>
      </nav>
      {home}
      {page}
      {appDb}
    </div>
  );
};

export default Menu;
