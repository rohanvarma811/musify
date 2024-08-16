/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';

/**
 * custom modules
 */
const { getData } = require('../config/axios.config');
const { search } = require('../routes/login.route');
const { getUrlQuery } = require('../utils/helpers.util');



/**
 * Get Spotify catalog information about albums, artists, playlists, tracks that match a query string
 * 
 * @param {Object} req - server request Object
 * @returns {Object}
 */
const getAll = async (req) => {
    const { query } = req.params;

    const { data: searchAll } = await getData(`/search?q=${query}&type=track,album,artist,playlist&limit=12`, req.cookies.access_token);

    return searchAll;
}


module.exports = {
    getAll
}