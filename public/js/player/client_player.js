/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';

/**
 * custom modules
 */
import { cookies } from "./client_player.api.js";


window.onSpotifyWebPlaybackSDKReady = () => {

    const /** {number} */ volume = localStorage.getItem('volume') ?? 100;

    /**
     * Create spotiy player instance
     */
    const token = '[My access token]';
    const player = new Spotify.Player({
      name: 'Musify Web Player',
      getOAuthToken: (callback) => { callback(cookies.get('access_token')); },
      volume: volume / 100
    });

    
    // Player is Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Connect player
    player.connect();

}