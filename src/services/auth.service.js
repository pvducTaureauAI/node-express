import { USER_STATE } from "../common/auth.js";
import { getFields } from "../common/data.js";
import { getTokens } from "../helpers/auth.helper.js";
import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { generateSecret, generateURI, verify } from 'otplib';
import qrcode from 'qrcode';

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
            const tokens = getTokens({ userId: user._id, verified2FA: false });
            return { success: true, message: 'User logged in successfully!', code: 200, data: { tokens, user: getFields({ object: user, fields: ['_id', 'username', 'state', 'twoFactorState'] }) } };
        } catch (error) {
            return { success: false, message: 'Login failed', error: error.message, code: 500 };
        }
    }

    static async setup2FA(userId) {
        try {
            if (!userId) {
                return { success: false, message: 'User ID is required', code: 400 };
            }
            const user = await userModel.findById(userId).lean();
            if (!user) {
                return { success: false, message: 'User not found', code: 404 };
            }
            if (user.twoFactorState === 'verified') {
                return { success: false, message: '2FA is already enabled', code: 400 };
            }
            const secret = generateSecret();
            const otpauth = generateURI({
                secret,
                label: user.username,
                issuer: 'Node-express',
            });
            const qrCodeDataURL = await qrcode.toDataURL(otpauth);
            await userModel.findByIdAndUpdate(userId, { twoFactorAuthSecret: secret, twoFactorState: 'pending' });
            return { success: true, message: '2FA setup successful', code: 200, data: { qrCodeDataURL } };
        } catch (error) {
            return { success: false, message: '2FA setup failed', error: error.message, code: 500 };
        }
    }

    static async verify2FA(userId, token) {
        try {
            if (!userId) {
                return { success: false, message: 'User ID is required', code: 400 };
            }
            if (!token) {
                return { success: false, message: '2FA token is required', code: 400 };
            }
            const user = await userModel.findById(userId).lean();
            if (!user || !user.twoFactorAuthSecret) {
                return { success: false, message: '2FA not set up', code: 400 };
            }
            console.log('Verifying token:', token, 'with secret:', user.twoFactorAuthSecret);
            const isValid = await verify({ token, secret: user.twoFactorAuthSecret });
            console.log('Is token valid?', isValid);
            if (!isValid.valid) {
                return { success: false, message: 'Invalid 2FA token', code: 401 };
            }
            await userModel.findByIdAndUpdate(userId, { twoFactorState: 'verified' });
            return { success: true, message: '2FA verified and enabled', code: 200 };
        } catch (error) {
            return { success: false, message: '2FA verification failed', error: error.message, code: 500 };
        }
    }
}

export default AuthService;