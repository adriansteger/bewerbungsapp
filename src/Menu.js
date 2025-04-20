import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton, // Use ListItemButton for better semantics and ripple effect
    ListItemText,
    Box, // Use Box for the root container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// Removed makeStyles import
// import { makeStyles } from '@mui/styles';

// Import the components to be rendered
import Page from "./Page";
import AppDB from "./AppDB";
import Login from "./Login";

// Define component mapping for easier rendering
const components = {
    login: <Login />,
    page: <Page size="A4" />, // Pass props here if needed
    appDb: <AppDB />,
};

const Menu = () => {
    // Removed classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    // Use a single state variable to track the active component key
    const [activeComponentKey, setActiveComponentKey] = useState('login'); // Default to 'login'

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    // Handler to set the active component key
    const handleNavigation = (key) => {
        setActiveComponentKey(key);
        setDrawerOpen(false); // Close drawer on navigation
    };

    const list = () => (
        <Box
            sx={{ width: 250 }} // Apply width directly using sx prop
            role="presentation"
            onClick={toggleDrawer(false)} // Close drawer when clicking inside
            onKeyDown={toggleDrawer(false)} // Close drawer on keydown (e.g., Esc)
        >
            <List>
                {/* Map over navigation items */}
                {[
                    { key: 'login', text: 'Home' },
                    { key: 'page', text: 'Page A4' },
                    { key: 'appDb', text: 'Applications' },
                ].map((item) => (
                    // Use ListItemButton for clickable list items
                    <ListItem key={item.key} disablePadding>
                        <ListItemButton onClick={() => handleNavigation(item.key)}>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        // Use Box as the root element for flexGrow
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }} // Apply marginRight using sx prop (mr = margin-right, 2 = theme.spacing(2))
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div" // Use 'div' for semantic correctness as it's not the main page title
                        sx={{ flexGrow: 1 }} // Apply flexGrow using sx prop
                    >
                        Logo
                    </Typography>
                    {/* Add other AppBar items here if needed, e.g., Login/Logout button */}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
            {/* Render the active component based on the state key */}
            <Box component="main" sx={{ p: 2 }}> {/* Add some padding to the main content area */}
                {components[activeComponentKey]}
            </Box>
        </Box>
    );
};

export default Menu;
