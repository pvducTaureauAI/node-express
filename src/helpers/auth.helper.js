import JWT from 'jsonwebtoken';
import selectedConfig from '../configs/config.js';

export const getTokens = ({ userId, verified2FA }) => {
    const accessToken = JWT.sign({ id: userId, verified2FA }, selectedConfig.app.jwtSecret, { expiresIn: '2m' });
    const refreshToken = JWT.sign({ id: userId, verified2FA }, selectedConfig.app.jwtSecret, { expiresIn: '7d' });
    return { accessToken, refreshToken };
}

export const verifyToken = (token) => {
    try {
        const decoded = JWT.verify(token, selectedConfig.app.jwtSecret);
        return { valid: true, decoded };
    } catch (error) {
        return { valid: false, error };
    }
}