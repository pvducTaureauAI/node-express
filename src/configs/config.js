import dotenv from 'dotenv';

dotenv.config();
const dev = {
    app: {
        port: process.env.DEV_PORT || 5001,
        jwtSecret: process.env.DEV_JWT_SECRET || 'your_jwt_secret',
    },
    db: {
        uri: process.env.DEV_DB_URI || 'mongodb://localhost:27017/myapp',
    },
};

const prod = {
    app: {
        port: process.env.PROD_PORT || 5001,
        jwtSecret: process.env.PROD_JWT_SECRET || 'your_jwt_secret',
    },
    db: {
        uri: process.env.PROD_DB_URI || 'mongodb://localhost:27017/myapp',
    },
};

const config = {dev, prod};
const env = process.env.NODE_ENV || 'dev';
const selectedConfig = config[env];

export default selectedConfig;