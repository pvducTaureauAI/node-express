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
}

const authController = new AuthController();

export default authController;