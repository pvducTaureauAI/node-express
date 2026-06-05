import AuthService from "../services/auth.service.js";

class AuthController {
    signup = async (req, res, next) => {
        try {
            console.log('Signup route hit', req.body);
            const { username, password } = req.body;
            const result = await AuthService.signup({ username, password });
            res.status(result.code).json({ message: result.message, code: result.code, error: result.error || null });   
        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController();

export default authController;