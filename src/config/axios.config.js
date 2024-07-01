/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';


/**
 * node modules
 */
const axios = require('axios').default;
const querystring = require('querystring');


/**
 * custom modules
 */
const apiConfig = require('./api.config');
const { copyFileSync, access } = require('fs');


/**
 * axios instance for access token and refresh token request
 */
const token = axios.create({
    baseURL: apiConfig.TOKEN_BASE_URL,
    headers: {
        'Authorization': `Basic ${(Buffer.from(apiConfig.CLIENT_ID + ':' + apiConfig.CLIENT_SECRET).toString('base64'))}`, 'Content-Type': 'application/x-www-form-urlencoded'
    }
});


/**
 * axios instance for all api request
 */
const api = axios.create({ baseURL: apiConfig.BASE_URL });


/**
 * 
 * @param {string} apiUrl - The URL of the API endpoint to request data from.
 * 
 * @param {string} access_token - The access token used for authentication.
 * 
 * @returns {Promise} A Promise that resolves with the response from the API or rejects with an error if the request Fails.
 * */
const getData = async(apiUrl, access_token) => {
    try {
        const /** {Promise} */ response = await api.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return response;
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    token,
    getData
}