import JWT from 'jsonwebtoken';
import selectedConfig from '../configs/config.js';

export const getTokens = ({ userId }) => {
    const accessToken = JWT.sign({ id: userId }, selectedConfig.app.jwtSecret, { expiresIn: '2m' });
    const refreshToken = JWT.sign({ id: userId }, selectedConfig.app.jwtSecret, { expiresIn: '7d' });
    return { accessToken, refreshToken };
}