/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';


/**
 * custom modules
 */
const { getData } = require('../config/axios.config');


/**
 * 
 * Recommendations are generated based on the available
 * information for a given seed entity and matched against similar
 * artists and tracks. If there is sufficient information about the
 * provided seeds, a list of tracks will be returned together with
 * pool size details
 * 
 * @param {Object} req - server request object
 * @param {Object} seeds - object of artist or track seeds string
 * @param {number} itemLimit - the maximum number of items to returns. default: 30
 * @returns {Object}
 */
const getRecommendedTrack = async (req, trackSeed, itemLimit) => {
    const { data: { track: recommendedTracks } } = await getData(`/recommendations?seed_tracks=${trackSeed}&limit=${itemLimit}`, req.cookies.access_token);

    return recommendedTracks;
}


module.exports = { getRecommendedTrack };