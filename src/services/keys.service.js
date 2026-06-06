import KeysModel from "../models/keys.model.js";

class KeysService {
    static add = async ({ key, permissions }) => {
        try {
            // Check if the key already exists in the database
            const existingKey = await KeysModel.findOne({ key });
            if (existingKey) {
                return { code: 400, message: 'Key already exists', error: 'KeyExists' };
            }

            // Create a new key document and save it to the database
            const newKey = new KeysModel({ key, permissions });
            await newKey.save();

            return { code: 201, message: 'Key added successfully' };
        } catch (error) {
            console.error('Error adding key:', error);
            return { code: 500, message: 'Internal server error', error: error.message };
        }
    }

    static validate = async (key) => {
        try {
            if (!key) {
                return { valid: false, message: 'Key is required' };
            }
            const existingKey = await KeysModel.findOne({ key }).lean();
            if (!existingKey) {
                return { valid: false, message: 'Invalid key' };
            }
            return { valid: true, message: 'Key is valid' };
        } catch (error) {
            console.error('Error validating key:', error);
            return { valid: false, message: 'Internal server error', error: error.message };
        }
    }
}

export default KeysService;