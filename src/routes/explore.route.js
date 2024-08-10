/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';

/**
 * node modules
 */
const router = require('express').Router();


/**
 * custom modules
 */
const { explore } = require('../controllers/explore.controller');

router.get(['/', '/page/:page'], explore);

module.exports = router;