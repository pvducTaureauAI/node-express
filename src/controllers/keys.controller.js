import KeysService from "../services/keys.service.js";

const API_KEY = 'x-api-key';

class KeyController {
    add = async (req, res, next) => {
        try {
            const { key, permissions } = req.body;
            const result = await KeysService.add({ key, permissions });
            res.status(result.code).json({ message: result.message, code: result.code, error: result.error || null });   
        } catch (error) {
            next(error);
        }
    }

    validate = async (req, res, next) => {
        try {
            const key = req.header(API_KEY);
            console.log('Validating API key:', key);
            if (!key) {
                return res.status(400).json({ valid: false, message: 'API key is required' });
            }
            const result = await KeysService.validate(key);
            if (!result.valid) {
                return res.status(401).json(result);
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

const keyController = new KeyController();

export default keyController;