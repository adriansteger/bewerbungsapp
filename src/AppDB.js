import React from "react";

const AppDB = () => {
  return (
    <div className="container">
      <table className="responsive-table striped">
        <thead>
          <tr>
            <th>Anrede</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Stellenbezeichnung</th>
            <th>Datum</th>
            <th>Firma</th>
            <th>Adresse</th>
            <th>Telefon</th>
            <th>E-Mail</th>
            <th>Stellenangebot</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Herr</td>
            <td>Johannes</td>
            <td>von Niederhäusern</td>
            <td>Webentwickler</td>
            <td>01.09.2021</td>
            <td>Diktum.ch</td>
            <td>Kalkbreitestrasse 10, 8003 Zürich</td>
            <td>043 535 60 73</td>
            <td>mike@diktum.ch</td>
            <td>https://www.linkedin.com/jobs/view/2692868382</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AppDB;
