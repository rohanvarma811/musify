/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';


/**
 * node Modules
 */
const userApi = require('../api/user.api');
const playerApi = require('../api/player.api');
const searchApi = require('../api/search.api');
const { msToTimeCode } = require('../utils/helpers.util');


const searchRequest = async (req, res) => {
    res.redirect(`/search/all/${req.body.query}`);
}


const searchAll = async (req, res) => {
    // current user profile
    const currentProfile = await userApi.getProfile(req);

    // recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // search result
    const searchAll = await searchApi.getAll(req);

    res.render('./pages/search', {
        currentProfile,
        recentlyPlayedTracks,
        searchAll,
        query: req.params.query,
        type: 'all',
        msToTimeCode
    });
}


module.exports = {
    searchRequest,
    searchAll
}