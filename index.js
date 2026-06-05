import app from './src/app.js';
import selectedConfig from './src/configs/config.js';

const server = app.listen(selectedConfig.app.port, () => {
  console.log(`Server is running on port ${selectedConfig.app.port}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server closed gracefully.');
        process.exit(0);
    });
});