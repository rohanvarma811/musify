/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';


/**
 * custom modules
 */

const userApi = require('../api/user.api');
const playerApi = require('../api/player.api');
const trackApi = require('../api/track.api');
const apiConfig = require('../config/api.config');
const artisApi = require('../api/artist.api');
const albumApi = require('../api/album.api');
const playlistApi = require('../api/playlist.api');

const home = async (req, res) => {
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


    // recommended artists
    const artistIdEntries = recommendedAlbums.map(track => track.artists.map(artist => artist.id));
    const uniqueArtistIds = [...new Set(artistIdEntries.flat(1))].join(',');
    const recommendedArtists = await artisApi.getSeveralDetail(req, uniqueArtistIds);

    // new release albums
    const newRelease = await albumApi.getNewRelease(req, apiConfig.LOW_LIMIT);

    // featured playlists
    const featuredPlaylist = await playlistApi.getFeatured(req, apiConfig.LOW_LIMIT);

    // top playlists
    const topPlaylist = await playlistApi.getCategoryPlaylist(req, apiConfig.LOW_LIMIT);

    res.render('./pages/home', {
        currentProfile,
        // recentlyPlayedTracks,
        recommendedAlbums,
        recommendedArtists,
        newRelease,
        featuredPlaylist,
        topPlaylist
    }); 
};

module.exports = { home };