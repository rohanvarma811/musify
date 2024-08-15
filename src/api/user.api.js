/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';


/**
 * custom modules
 */
const { getData } = require('../config/axios.config');
const { getUrlQuery } = require('../utils/helpers.util');


/**
 * Get detailed profile information about the currect user
 * 
 * @param {Object} req - server request object
 * @returns {Object}
 */
const getProfile = async(req) => {
    const { data: currentProfile } = await getData(`/me`, req.cookies.access_token);

    return currentProfile;
}


/**
 * Get the current user's top artists based on the calculated affinity
 * 
 * @param {Object} req - server request Object 
 * @param {number} itemLimit - the maximum number of items to return. default: 30
 * @returns  {Object}
 */
const getTopArtist = async(req, itemLimit) => {
    const { limit, offset, page } = getUrlQuery(req.params, itemLimit);

    const { data: topArtist } = await getData(`/me/top/artists?limit=${limit}&offset=${offset}`, req.cookies.access_token);

    const baseUrl = `${req.baseUrl}/top/artist`;

    return { baseUrl, page, ...topArtist }
}


/**
 * Get the current user's top tracks based on calculated affinity
 * 
 * @param {Object} req - server request object
 * @param {number} itemLimit - the maximum number of items to return. default: 30
 * @returns {Object}
 */
const getTopTracks = async(req, itemLimit) => {
    const { limit, offset, page } = getUrlQuery(req.params, itemLimit);

    const { data: topTracks } = await getData(`/me/top/tracks?limit=${limit}&offset=${offset}`, req.cookies.access_token);

    const baseUrl = `${req.baseUrl}/top/track`;

    return { baseUrl, page, ...topTracks }
}


/**
 * Get the current user's followed artists
 * 
 * @param {Object} req - server request Object
 * @returns {Object}
 */
const getFollowedArtist = async (req) => {
    const { data: { artists: followedArtist } } = await getData('/me/following?type=artist', req.cookies.access_token);

    return followedArtist;
}


module.exports = {
    getProfile,
    getTopArtist,
    getTopTracks,
    getFollowedArtist
}