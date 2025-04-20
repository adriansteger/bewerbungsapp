import React, { useState } from 'react';
import axios from 'axios';
// Import Box for layout and styling
import { TextField, Button, Typography, Box } from '@mui/material';
// Remove makeStyles import
// import { makeStyles } from '@mui/styles';

// No longer need useStyles

const Login = () => {
    // Removed classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [jwt, setJwt] = useState(null); // Consider if this state is needed here or managed globally
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setJwt(null); // Clear previous JWT state on new attempt

        try {
            const response = await axios.post('http://localhost:8877/api/login', {
                username,
                password,
            }, { headers: { 'Content-Type': 'application/json' } });

            const token = response.data.jwt;
            setJwt(token); // Set JWT state locally (consider if this is the right place)
            localStorage.setItem('jwtToken', token); // Store token

            // Maybe trigger a navigation or state update in a parent component here
            // instead of just showing the "Logged in successfully!" message locally.

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        // Use Box for the main container, applying padding
        <Box sx={{ p: 2, maxWidth: '400px', margin: 'auto' }}> {/* Added padding, max-width and centering */}
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            {/* Use Box for the form container and apply styles via sx prop */}
            <Box
                component="form"
                onSubmit={handleLogin}
                noValidate // Good practice for HTML5 validation bypass when using libraries
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5, // Use gap for spacing between elements (adjust value as needed)
                    // padding: 2, // Padding is now on the outer Box
                }}
            >
                <TextField
                    // Apply styles directly using sx prop
                    sx={{
                        // margin: 1, // Replaced by gap on parent Box
                        width: '100%', // Make text fields take full width of the form container
                        maxWidth: '300px', // Optional: constrain max width if needed
                    }}
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required // Add basic HTML5 required validation
                />
                <TextField
                    sx={{
                        // margin: 1, // Replaced by gap on parent Box
                        width: '100%',
                        maxWidth: '300px',
                    }}
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        mt: 1, // Add a little extra margin-top if gap isn't enough
                        // margin: 2, // Replaced by gap and mt
                    }}
                    type="submit"
                >
                    Login
                </Button>
            </Box>
            {error && (
                <Typography
                    variant="body2"
                    align="center"
                    // Apply error color using sx prop and theme palette
                    sx={{ color: 'error.main', mt: 2 }} // Use theme's error color, add margin-top
                >
                    {error}
                </Typography>
            )}
            {/* Consider removing this local JWT message if login triggers navigation or global state change */}
            {jwt && (
                 <Typography variant="body1" align="center" sx={{ color: 'success.main', mt: 2 }}>
                    Logged in successfully!
                 </Typography>
            )}
        </Box>
    );
};

export default Login;
