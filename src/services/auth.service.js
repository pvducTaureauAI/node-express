import { USER_STATE } from "../common/auth.js";
import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';

class AuthService {
    static async signup({username, password}) {
        try {
            // check email exists
            const holder = await userModel.findOne({ username });
            if (holder) {
                return { success: false, message: 'Username already exists', code: 409 };
            }
            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            // create new user
            const newUser = new userModel({ username, password: hashedPassword, state: USER_STATE.NOT_VERIFIED });
            await newUser.save();
            return { success: true, message: 'User signed up successfully!', code: 201 };
        } catch (error) {
            return { success: false, message: 'Signup failed', error: error.message, code: 500 };
        }
    }
}

export default AuthService;