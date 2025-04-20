import React, { useState } from 'react';
import './Page.css'; // Keep this if you have specific non-MUI styles
import axios from 'axios';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    Box, // Import Box for layout and styling
    Typography, // For headings and messages
    Alert, // For better error/success messages
} from '@mui/material';
// Remove makeStyles import
// import { makeStyles } from '@mui/styles';
import * as Yup from 'yup';

// No longer need useStyles

// Consider defining validation schema outside the component if it doesn't depend on props/state
const validationSchema = Yup.object().shape({
    bewerbender: Yup.string().required('Bewerbender ist ein Pflichtfeld'),
    beruf: Yup.string().required('Beruf ist ein Pflichtfeld'),
    jobbeschreibung: Yup.string().required('Jobbeschreibung ist ein Pflichtfeld'),
    geschlecht: Yup.string().required('Geschlecht ist ein Pflichtfeld'),
    nachname: Yup.string().required('Nachname ist ein Pflichtfeld'),
});

// Define form field configuration for easier mapping
const formFields = [
    { id: 'bewerbender', label: 'Wer sind Sie?', type: 'select', options: ['A.Steger', 'G.Sicolo'] },
    { id: 'beruf', label: 'Wählen Sie den Beruf für den Sie sich bewerben möchten.', type: 'select', options: ['Informatik', 'Marketing'] },
    { id: 'jobbeschreibung', label: 'Geben Sie die Jobbeschreibung des Inserats ein.', type: 'textarea', rows: 4 },
    { id: 'geschlecht', label: 'Geschlecht der Ansprechperson.', type: 'select', options: ['Herr', 'Frau'] },
    { id: 'nachname', label: 'Nachname der Ansprechperson', type: 'text' },
];

const Page = ({ size }) => {
    // Removed classes = useStyles();

    // Consolidate form state
    const [formData, setFormData] = useState({
        bewerbender: '',
        beruf: '',
        jobbeschreibung: '',
        geschlecht: '',
        nachname: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [mailSent, setMailSent] = useState(false);
    const [submitError, setSubmitError] = useState(null); // Renamed for clarity
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generic handler for form field changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
        // Clear validation error for the field being edited
        if (validationErrors[name]) {
            setValidationErrors(prevErrors => ({
                ...prevErrors,
                [name]: undefined,
            }));
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setMailSent(false);
        setValidationErrors({}); // Clear previous validation errors

        try {
            // Validate using Yup
            await validationSchema.validate(formData, { abortEarly: false });
        } catch (validationError) {
            if (validationError instanceof Yup.ValidationError) {
                // Map Yup errors to a state object
                const errors = {};
                validationError.inner.forEach(err => {
                    if (err.path) {
                        errors[err.path] = err.message;
                    }
                });
                setValidationErrors(errors);
                // Optional: Display a general validation error message
                // setSubmitError("Bitte korrigieren Sie die Fehler im Formular.");
            } else {
                // Handle unexpected validation errors
                setSubmitError("Ein unerwarteter Validierungsfehler ist aufgetreten.");
            }
            setIsSubmitting(false);
            return;
        }

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setSubmitError('Sie sind nicht authentifiziert. Bitte melden Sie sich an.');
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await axios.post('http://localhost:8080/api/mailer.php', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setMailSent(result.data.sent); // Assuming API returns { sent: true/false }
            if (result.data.sent) {
                // Optionally reset form on success
                setFormData({
                    bewerbender: '', beruf: '', jobbeschreibung: '', geschlecht: '', nachname: '',
                });
            } else {
                 setSubmitError(result.data.message || 'Fehler beim Senden der Daten.'); // Handle API non-sent case
            }
        } catch (error) {
            // Handle Axios/network errors
            setSubmitError(error.response?.data?.message || error.message || 'Ein Fehler ist aufgetreten.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper to get field props
    const getFieldProps = (id) => ({
        id: id,
        name: id,
        value: formData[id],
        onChange: handleInputChange,
        error: !!validationErrors[id],
        helpertext: validationErrors[id],
        fullWidth: true, // Make fields take full width of their container
    });

    return (
        // Use Box for padding and layout control
        <Box className={`page ${size}`} sx={{ p: 2, maxWidth: '600px', margin: 'auto' }}> {/* Added padding, max-width and centering */}
            <Typography variant="h4" component="h1" gutterBottom align="center"> {/* Use Typography for heading */}
                Bewerbungsersteller
            </Typography>
            {/* Use Box as the form container for better styling control */}
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleFormSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2, // Adds space between form elements (replaces margin on each item)
                    '& .MuiFormControl-root, & .MuiTextField-root': {
                         // No need for specific width if using fullWidth and maxWidth on container
                         // width: '25ch', // You can keep this if you prefer fixed width over fullWidth
                    },
                }}
            >
                {/* Map over form fields configuration */}
                {formFields.map(field => (
                    <FormControl key={field.id} variant="outlined" fullWidth error={!!validationErrors[field.id]}>
                        <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
                        {field.type === 'select' ? (
                            <Select
                                labelId={`${field.id}-label`}
                                label={field.label} // Important for outlined variant label positioning
                                {...getFieldProps(field.id)}
                            >
                                <MenuItem value="">
                                    <em>Bitte Wählen</em>
                                </MenuItem>
                                {field.options.map(option => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        ) : field.type === 'textarea' ? (
                             <TextField
                                label={field.label}
                                multiline
                                rows={field.rows}
                                variant="outlined"
                                {...getFieldProps(field.id)}
                            />
                        ) : (
                             <TextField
                                label={field.label}
                                variant="outlined"
                                {...getFieldProps(field.id)}
                            />
                        )}
                         {/* Display helper text directly within FormControl for selects */}
                         {validationErrors[field.id] && field.type === 'select' && (
                            <Typography variant="caption" sx={{ color: 'error.main', ml: 1.75, mt: 0.5 }}>
                                {validationErrors[field.id]}
                            </Typography>
                         )}
                    </FormControl>
                ))}

                <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    sx={{ mt: 1, alignSelf: 'center', minWidth: '120px' }} // Added top margin and centered
                >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Senden'} {/* Changed text */}
                </Button>

                {/* Display Success/Error Messages using MUI Alert */}
                {mailSent && <Alert severity="success" sx={{ mt: 2 }}>Daten erfolgreich gesendet!</Alert>}
                {submitError && <Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>}
                {/* Optional: Display general validation error summary */}
                {/* {Object.keys(validationErrors).length > 0 && !submitError && <Alert severity="warning" sx={{ mt: 2 }}>Bitte überprüfen Sie Ihre Eingaben.</Alert>} */}

            </Box>
        </Box>
    );
};

export default Page;
