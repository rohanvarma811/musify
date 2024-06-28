/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';


/**
 * custom modules
 */
const apiConfig = require('../config/api.config');
const userApi = require('../api/user.api');
const playerApi = require('../api/player.api');
const trackApi = require('../api/track.api');

const home = async (req, res) => {

    // current user Profile
    const currentProfile = await userApi.getProfile(req);

    // recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track );

    // recommend albums
    const trackIds = recentlyPlayedTracks.map(({ id }) => id);
    const trackSeed = trackIds.slice(0, 5).join(',');
    const recommendedAlbums = await trackApi.getRecommendedTrack(req, trackSeed, apiConfig.LOW_LIMIT);

    res.render('./pages/home', {
        currentProfile,
        // recentlyPlayedTracks,
        recommendedAlbums
    });
}


module.exports = { home };