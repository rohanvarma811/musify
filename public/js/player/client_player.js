/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';

/**
 * custom modules
 */
import { cookies, transferPlayback, play } from "./client_player.api.js";
import { addEventOnElems, msToTimeCode } from "../utils.js";

const /** {Array<HTMLElement>} */ $players = document.querySelectorAll('[data-player]');
const /** {HTMLElement} */ $playerNextBtn = document.querySelector('[data-player-next-btn]');
const /** {HTMLElement} */ $playerPrevBtn = document.querySelector('[data-player-prev-btn]');

const updatePlayerInfo = (playerState, $player) => {

  const /** {HTMLElement} */ $trackBanner = $player.querySelector('[data-track-banner]');
  const /** {HTMLElement} */ $trackName = $player.querySelector('[data-track-name]');
  const /** {HTMLElement} */ $trackArtist = $player.querySelector('[data-track-artist]');

  // destructure current playerState
  const {
    track_window: {
      current_track: {
        album: { images: trackImages },
        artists: trackArtists,
        name: trackName
      }
    }
  } = playerState;

  const {
    url = './images/track-banner.png',
    width,
    height
  } = trackImages.find(item => item.width > 200 && item.width < 400)  || {};

  const /** {string} */ artistNames = trackArtists.map(({ name }) => name ).join(', ');

  /**
   * update player image, track name, artist name
   * and remove hide and disabled class
   */
  $trackBanner.src = url;
  $trackBanner.width = width;
  $trackBanner.height = height;

  $trackBanner.alt = trackName;
  $trackName.textContent = trackName;
  $trackArtist.textContent = artistNames;
  $player.classList.remove('hide');
  $player.classList.remove('disabled');

}

let /** {Array<HTMLElement> | undefined} */ $lastActivePlayBtns = [];

const updateCardPlayBtnState = (playerState) => {

  const {
    paused,
    context: { uri },
    track_window: { 
      current_track: { uri : trackUri }
    }
  } = playerState;

  const /** {Array<HTMLElement>} */ $cardPlayBtns = document.querySelectorAll(`[data-uri="${uri}"]`);

  const /** {Array<HTMLElement>} */ $trackPlayBtns = document.querySelectorAll(`[data-track-uri="${trackUri}"]`);

  const /** {Array<HTMLElement>} */ $currentActivePlayBtns = [...$cardPlayBtns, ...$trackPlayBtns];

  $lastActivePlayBtns.forEach($playBtn => {
    $playBtn.classList.remove('active');
    $playBtn.dataset.playBtn = 'play';
  });

  $currentActivePlayBtns.forEach($playBtn => {
    $playBtn.classList[paused ? 'remove' : 'add']('active');
    $playBtn.dataset.playBtn =paused ? 'play' : 'pause';
  });

  $lastActivePlayBtns = $currentActivePlayBtns;

}

const updatePlayerBtnState = (playerState, $player) => {

  const /** {HTMLElement} */ $playerControlPlay = $player.querySelector('[data-player-control-play]');

  const { paused } = playerState;

  $playerControlPlay.classList[paused ? 'remove' : 'add']('active');
  $playerControlPlay.dataset.playBtn = paused ? 'play' : 'pause';

}

const /** {string} */ documentTitle = document.title;

const updateDocumentTitle = (playerState) => {
  // set document title when playing
  const {
    paused,
    track_window: {
      current_track: {
        artists: trackArtists,
        name: trackName
      }
    }
  } = playerState;

  const /** {string} */ artistNameStr = trackArtists.map(({ name }) => name).join(', ');

  document.title = paused ? documentTitle : `${trackName} • ${artistNameStr} | Musify `;

}

const /** {HTMLElement} */ $playerLgProgress = document.querySelector('[data-player-progress-lg]');
const /** {HTMLElement} */ $playerSmProgress = document.querySelector('[data-player-progress-sm]');
const /** {HTMLElement} */ $playerLgProgressPos = document.querySelector('[data-progress-pos]');
const /** {HTMLElement} */ $playerLgProgressDuration = document.querySelector('[data-progress-duration]');
let /** {NodeJS.Timeout | undefined} */ lastProgressInterval;

const updatePlayerProgress = (playerState) => {

  const {
    position,
    duration,
    paused
  } = playerState;

  // progress initial value
  let currentPosition = position;
  $playerLgProgress.max = duration;
  $playerSmProgress.max = duration;
  $playerLgProgress.value = currentPosition;
  $playerSmProgress.value = currentPosition;
  $playerLgProgressDuration.textContent = msToTimeCode(duration);
  $playerLgProgressPos.textContent = msToTimeCode(currentPosition);

  lastProgressInterval && clearInterval(lastProgressInterval);

  if(!paused) {
    const currentProgressInterval = setInterval(() => {
      currentPosition += 1000;
      $playerLgProgress.value = currentPosition;
      $playerSmProgress.value = currentPosition;
      $playerLgProgressPos.textContent = msToTimeCode(currentPosition);
    }, 1000);
    lastProgressInterval = currentProgressInterval;
  }

}



/**
 * when any changes occur in the playerthis function will be execute
 * e.g. change track/volumme/play/pause/seek/next/previous
 * 
 * @param {object} playerState - currently playing track object
 */
const playerStateChange = (playerState) => {
  const { track_window } = playerState;

  // console.log((playerState));
  
  // update player ui
  $players.forEach(player => updatePlayerInfo(playerState, player));

  // update card play btn ui state eg. play, pause
  updateCardPlayBtnState(playerState);

  //update player control play btn ui state state after state change
  $players.forEach(player => updatePlayerBtnState(playerState, player));

  // update document title when playing track
  updateDocumentTitle(playerState);

  // update player progress
  updatePlayerProgress(playerState);

  // disable next and prev button if there is no track available
  $playerNextBtn.disabled = !track_window.next_tracks.length;
  $playerPrevBtn.disabled = !track_window.previous_tracks.length;

}

/**
 * Toggle play
 */
const togglePlay = async function(player) {
  const /** {string} */ deviceId = localStorage.getItem('device_id');

  const {
    context: { uri: currentUri },
    track_window: {
      current_track: { uri: currentTrackUri }
    }
  } = await player.getCurrentState();

  const {
    uri: btnUri,
    trackUri: btnTrackUri,
    playBtn
  } = this.dataset;

  if(playBtn == 'play') {

    const /** {boolean} */ lastPlayed = currentUri == btnUri || currentTrackUri == btnTrackUri;

    if((!btnUri && !btnTrackUri) || lastPlayed) {
      return await player.resume();
    }

    const /** {object} */ reqBody = {}

    btnUri ? reqBody.context_uri = btnUri : null;
    btnTrackUri ? reqBody.uris = [btnTrackUri] : null;

    await play(deviceId, reqBody);

  } else {
    await player.pause();
  }

}


window.onSpotifyWebPlaybackSDKReady = () => {
  const /** {number} */ volume = localStorage.getItem('volume') ?? 100;

  /**
   * Create spotiy player instance
   */
  // const token = '[My access token]';
  const player = new Spotify.Player({
    name: 'Musify Web Player',
    getOAuthToken: (callback) => { callback(cookies.get('access_token')); },
    volume: volume / 100
  });

  
  // Player is Ready
  player.addListener('ready', async ({ device_id }) => {

    // store device_id  in localStorage
    localStorage.setItem('device_id', device_id);

    // transfer playback to current device
    await transferPlayback(device_id);


    const /** {Array<HTMLElement>} */ $playBtns = document.querySelectorAll('[data-play-btn]');
    addEventOnElems($playBtns, 'click', function () {
      togglePlay.call(this, player);
    });

    // skip to next track
    $playerNextBtn.addEventListener('click', async () => {
      await player.nextTrack();
    });

    // skip to previous track
    $playerPrevBtn.addEventListener('click', async () => {
      await player.previousTrack();
    });

    // control player seek
    $playerLgProgress.addEventListener('input', async function () {
      await player.seek(this.value);
    });

  });


  // call event when any changes occur in player
  player.addListener('player_state_changed', playerStateChange);

  // Connect player
  player.connect();

}