import app from './app';
import config from './config/config';

const PORT = config.server.port;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API is available at http://localhost:${PORT}/api`);
});