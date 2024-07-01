/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';


/**
 * custom modules
 */
// const apiConfig = require('../config/api.config');
// const userApi = require('../api/user.api');
// const playerApi = require('../api/player.api');
// const trackApi = require('../api/track.api');

// --- ORIGINAL CODE ---
// const home = async (req, res) => {

//     // current user Profile
//     const currentProfile = await userApi.getProfile(req);

//     // recently played tracks
//     const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
//     const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

//     // recommend albums
//     const trackIds = recentlyPlayedTracks.map(({ id }) => id);
//     const trackSeed = trackIds.slice(0, 5).join(',');
//     const recommendedAlbums = await trackApi.getRecommendedTrack(req, trackSeed, apiConfig.LOW_LIMIT)

//     console.log(recommendedAlbums);

//     res.render('./pages/home', {
//         currentProfile,
//         recentlyPlayedTracks,
//         recommendedAlbums
//     });
// }


// module.exports = { home };



// --- REFERENCE CODE ---
'use strict';

/**
 * custom modules
 */

const userApi = require('../api/user.api');
const playerApi = require('../api/player.api');
const trackApi = require('../api/track.api');
const apiConfig = require('../config/api.config');

const home = async (req, res) => {
    try {
        const currentProfile = await userApi.getProfile(req);
        // console.log('Current Profile:', currentProfile);

        const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
        // console.log('Recently Played:', recentlyPlayed);

        const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);
        // console.log('Recently Played Tracks:', recentlyPlayedTracks);

        const trackIds = recentlyPlayedTracks.map(({ id }) => id);
        const trackSeed = trackIds.slice(0, 5).join(',');
        // console.log('Track Seed:', trackSeed);

        const recommendedAlbums = await trackApi.getRecommendedTrack(req, trackSeed, apiConfig.LOW_LIMIT);
        // console.log('Recommended Albums:', recommendedAlbums);

        res.render('./pages/home', {
            currentProfile,
            recentlyPlayedTracks,
            recommendedAlbums
        });
    } catch (error) {
        console.error('Error in home controller:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { home };