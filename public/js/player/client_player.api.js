/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';


const cookies = new Map(document.cookie.split('; ').map(item => item.split('=')));
const BASE_URL = 'https://api.spotify.com./v1';
const headers = {
    'Authorization': `Bearer ${cookies.get('access_token')}`,
    'Content-Type': 'application/json'
}

export {
    cookies
}