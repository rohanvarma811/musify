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
const { album } = require('../controllers/album.controller');


router.get(['/', '/page/:page'], album);


module.exports = router;