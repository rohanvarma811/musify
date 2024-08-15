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
 * custom modules
 */

const { profile, topArtist, TopTrack } = require('../controllers/profile.controller');

router.get('/', profile);

router.get(['/top/artist', '/top/artist/page/:page'], topArtist);

router.get(['/top/track', '/top/artist/page/:page'], TopTrack);


module.exports = router;