/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';

/**
 * Custom Modules
 */

const userApi = require('../api/user.api');
const playerApi = require('../api/player.api');
const categoryApi = require('../api/category.api');


const explore = async (req, res) => {

    // current user profile
    const currentProfile = await userApi.getProfile(req);

    // recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // get several categories
    const categories = await categoryApi.getSeveralDetail(req);
    
    res.render('./pages/explore.ejs', {
        currentProfile,
        recentlyPlayedTracks,
        categories
    });
}


module.exports = {
    explore
}