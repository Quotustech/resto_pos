import crypto from 'crypto';
import ApiCredentialsModel from '../models/apiKey.model';


/**
 * Generate unique API key and API secret
 * @returns {Object} - API key and API secret
 */

export const generateApiCredentials = () => {
    const apiKey = crypto.randomBytes(32).toString('hex');
    const apiSecret = crypto.createHmac('sha256', crypto.randomBytes(64)).digest('hex');

    return { apiKey, apiSecret };
};
