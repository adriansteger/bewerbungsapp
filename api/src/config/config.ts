import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
    server: {
        port: process.env.PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET_KEY || 'fallback_secret_key_for_development',
        issuer: process.env.JWT_ISSUER || 'http://vernoh.com',
        audience: process.env.JWT_AUDIENCE || 'http://vernoh.com',
        expiry: parseInt(process.env.JWT_EXPIRY || '3600')
    },
    email: {
        from: process.env.EMAIL_FROM || '',
        to: process.env.EMAIL_TO || ''
    },
    // For demonstration purposes only - in production, store user credentials in a database
    users: {
        exampleUser: "password123",
        testUser: "test123"
    }
};

export default config;