import React, { useState } from 'react';
import './Page.css';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import Spinner from './custom_components/Spinner';
import * as Yup from 'yup';

const Page = ({ size }) => {
    const [bewerbender, setBewerbender] = useState("");
    const [beruf, setBeruf] = useState("");
    const [jobbeschreibung, setJobbeschreibung] = useState("");
    const [geschlecht, setGeschlecht] = useState("");
    const [nachname, setNachname] = useState("");
    const [mailSent, setMailSent] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validationSchema = Yup.object().shape({
        bewerbender: Yup.string().required("Bewerbender ist ein Pflichtfeld"),
        beruf: Yup.string().required("Beruf ist ein Pflichtfeld"),
        jobbeschreibung: Yup.string().required("Jobbeschreibung ist ein Pflichtfeld"),
        geschlecht: Yup.string().required("Geschlecht ist ein Pflichtfeld"),
        nachname: Yup.string().required("Nachname ist ein Pflichtfeld")
    });

    // Beispiel: Den JWT-Token aus einem sicheren Speicher abrufen
    const jwtToken = localStorage.getItem("jwtToken") || "YOUR_JWT_TOKEN";

    const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = { bewerbender, beruf, jobbeschreibung, geschlecht, nachname };

    try {
        await validationSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
        if (validationError instanceof Yup.ValidationError) {
            alert(validationError.errors.join("\n"));
        }
        setIsSubmitting(false);
        return;
    }

    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert("You are not authenticated. Please log in.");
        setIsSubmitting(false);
        return;
    }

    try {
        const result = await axios.post('http://localhost:8080/api/mailer.php', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        setMailSent(result.data.sent);
    } catch (error) {
        setError(error.message);
    } finally {
        setIsSubmitting(false);
    }
};


    return (
        <div className={"page " + size}>
            <form action="#">
                <h1>Bewerbungsersteller:</h1>
                <label>Wer sind Sie?</label>
                <select 
                    className="browser-default" 
                    id="bewerbender" 
                    name="bewerbender" 
                    value={bewerbender} 
                    onChange={e => setBewerbender(e.target.value)}
                >
                    <option value="">Bitte Wählen</option>
                    <option value="A.Steger">A.Steger</option>
                    <option value="G.Sicolo">G.Sicolo</option>
                </select>
                <label>Wählen Sie den Beruf für den Sie sich bewerben möchten.</label>
                <select 
                    className="browser-default" 
                    id="beruf" 
                    name="beruf" 
                    value={beruf} 
                    onChange={e => setBeruf(e.target.value)}
                >
                    <option value="">Bitte Wählen</option>
                    <option value="Informatik">Informatik</option>
                    <option value="Marketing">Marketing</option>
                </select>
                <label>Geben Sie die Jobbeschreibung des Inserats ein.</label>
                <input 
                    type="text" 
                    id="jobbeschreibung" 
                    value={jobbeschreibung} 
                    onChange={e => setJobbeschreibung(e.target.value)}
                />
                <label>Geschlecht der Ansprechperson.</label>
                <select 
                    className="browser-default" 
                    id="geschlecht" 
                    name="geschlecht" 
                    value={geschlecht} 
                    onChange={e => setGeschlecht(e.target.value)}
                >
                    <option value="">Bitte Wählen</option>
                    <option value="Herr">Herr</option>
                    <option value="Frau">Frau</option>
                </select>
                <label>Nachname der Ansprechperson</label>
                <input 
                    type="text" 
                    id="nachname" 
                    value={nachname} 
                    onChange={e => setNachname(e.target.value)}
                />
                <button 
                    disabled={isSubmitting} 
                    className="btn waves-effect waves-light" 
                    type="submit" 
                    onClick={handleFormSubmit}
                >
                    {isSubmitting ? <Spinner /> : "Submit"}
                    <i className="material-icons right">send</i>
                </button>
                <div>
                    {mailSent && <div>Daten Gesendet</div>}
                </div>
            </form>
        </div>
    );
};

export default Page;
