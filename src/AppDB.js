import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AppDB = () => {
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Anrede</TableCell>
              <TableCell align="right">Vorname</TableCell>
              <TableCell align="right">Nachname</TableCell>
              <TableCell align="right">Stellenbezeichnung</TableCell>
              <TableCell align="right">Datum</TableCell>
              <TableCell align="right">Firma</TableCell>
              <TableCell align="right">Adresse</TableCell>
              <TableCell align="right">Telefon</TableCell>
              <TableCell align="right">E-Mail</TableCell>
              <TableCell align="right">Stellenangebot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Herr
              </TableCell>
              <TableCell align="right">Johannes</TableCell>
              <TableCell align="right">von Niederhäusern</TableCell>
              <TableCell align="right">Webentwickler</TableCell>
              <TableCell align="right">01.09.2021</TableCell>
              <TableCell align="right">Diktum.ch</TableCell>
              <TableCell align="right">Kalkbreitestrasse 10, 8003 Zürich</TableCell>
              <TableCell align="right">043 535 60 73</TableCell>
              <TableCell align="right">mike@diktum.ch</TableCell>
              <TableCell align="right">https://www.linkedin.com/jobs/view/2692868382</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AppDB;
