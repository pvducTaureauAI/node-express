import { USER_STATE } from "../common/auth.js";
import { getFields } from "../common/data.js";
import { getTokens } from "../helpers/auth.helper.js";
import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';

class AuthService {
    static async signup({username, password}) {
        try {
            // check email exists
            const holder = await userModel.findOne({ username }).lean();
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

    static async login({username, password}) {
        try {
            // check email exists
            const user = await userModel.findOne({ username }).lean();
            if (!user) {
                return { success: false, message: 'Invalid username or password', code: 401 };
            }
            // compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return { success: false, message: 'Invalid username or password', code: 401 };
            }
            const tokens = getTokens({ userId: user._id });
            return { success: true, message: 'User logged in successfully!', code: 200, data: { tokens, user: getFields({ object: user, fields: ['_id', 'username', 'state'] }) } };
        } catch (error) {
            return { success: false, message: 'Login failed', error: error.message, code: 500 };
        }
    }
}

export default AuthService;