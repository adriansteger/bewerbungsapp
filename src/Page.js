import React, { Component } from 'react';
import './Page.css';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';

const API_PATH = 'http://localhost:80/src/mailer.php';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bewerbender: "",
            beruf: "",
            jobbeschreibung: "",
            geschlecht: "",
            nachname: "",
            mailSent: "",
            error: ""
        }
    }
    render() {
        return (
            <div className={"page " + this.props.size} >
                <form action="#">
                    <h1>Bewerbungsersteller:</h1>
                    <label>Wer sind Sie?</label>
                    <select className="browser-default" id="bewerbender" name="bewerbender" value={this.state.bewerbender} onChange={e => this.setState({ bewerbender: e.target.value })}>
                        <option value="">Bitte Wählen</option>
                        <option value="A.Steger">A.Steger</option>
                        <option value="G.Sicolo">G.Sicolo</option>
                    </select>
                    <label>Wählen Sie den Beruf für den Sie sich bewerben möchten.</label>
                    <select className="browser-default" id="beruf" name="beruf" value={this.state.beruf} onChange={e => this.setState({ beruf: e.target.value })}>
                        <option value="">Bitte Wählen</option>
                        <option value="Informatik">Informatik</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                    <label>Geben Sie die Jobbeschreibung des Inserats ein.</label>
                    <input type="text" id="jobbeschreibung" value={this.state.jobbeschreibung} onChange={e => this.setState({ jobbeschreibung: e.target.value })}></input>
                    <label>Geschlecht der Ansprechperson.</label>
                    <select className="browser-default" id="geschlecht" name="geschlecht" value={this.state.geschlecht} onChange={e => this.setState({ geschlecht: e.target.value })}>
                        <option value="">Bitte Wählen</option>
                        <option value="Herr">Herr</option>
                        <option value="Frau">Frau</option>
                    </select>
                    <label>Nachname der Ansprechperson</label>
                    <input type="text" id="nachname" value={this.state.nachname} onChange={e => this.setState({ nachname: e.target.value })}></input>
                    <button className="btn waves-effect waves-light" type="submit" onClick={e => this.handleFormSubmit(e)}>Submit
                    <i className="material-icons right">send</i>
                    </button>
                    <div>
                        {this.state.mailSent &&
                            <div>Daten Gesendet</div>
                        }
                    </div>
                </form>
            </div >
        )
    }
    handleFormSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        if (this.checkIfArrayEmpty() === false) {
            alert("Bitte alle Felder füllen");
        }
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: this.state
        }).then(result => {
            this.setState({
                mailSent: result.data.sent
            })
        }).catch(error => this.setState({ error: error.message }));
    }
    checkIfArrayEmpty() {
        for (let i in this.state) {
            if (this.state[i] === "") {
                return false;
            }
        }
    }
}
