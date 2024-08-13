/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';

/**
 * node Modules
 */
const router = require('express').Router();


/**
 * Custom modules
 */
const { playlist, playlistDetail } = require('../controllers/playlist.controller');


router.get(['/', '/page/:page'], playlist);

router.get(['/:playlistId'], playlistDetail);

module.exports = router;