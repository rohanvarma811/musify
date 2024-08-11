/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';


/**
 * custom Modules
 */

const userApi = require('../api/user.api');
const playerApi = require('../api/player.api');
const albumApi = require('../api/album.api');


const album = async (req, res) => {

    // current user profile
    const currentProfile = await userApi.getProfile(req);

    // recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // new release albums
    const newRelease = await albumApi.getNewRelease(req);

    res.render('./pages/album', {
        title: 'New Releases',
        currentProfile,
        recentlyPlayedTracks,
        albums: newRelease
    });
}

module.exports = {
    album
}