import { verifyToken } from "../helpers/auth.helper.js";
import AuthService from "../services/auth.service.js";

class AuthController {
    signup = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const result = await AuthService.signup({ username, password });
            res.status(result.code).json({ message: result.message, code: result.code, error: result.error || null });   
        } catch (error) {
            next(error);
        }
    }

    login = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const result = await AuthService.login({ username, password });
            res.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

    checkJWT = async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'].toString().replace('Bearer ', '');
            const result = verifyToken(authHeader);
            if (!result.valid) {
                return res.status(401).json({ message: 'Invalid token', code: 401 });
            }
            req.userId = result.decoded.id;
            req.verified2FA = result.decoded.verified2FA;
            next();
        } catch (error) {
            next(error);
        }
    }
    
    setup2FA = async (req, res, next) => {
        try {
            const userId = req.userId;
            const setupResult = await AuthService.setup2FA(userId);
            res.status(setupResult.code).json(setupResult);
        } catch (error) {
            next(error);
        }
    }

    verify2FA = async (req, res, next) => {
        try {
            const userId = req.userId;
            const { token } = req.body;
            const verifyResult = await AuthService.verify2FA(userId, token);
            res.status(verifyResult.code).json(verifyResult);
        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController();

export default authController;