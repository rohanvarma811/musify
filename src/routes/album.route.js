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
const { album, albumDetail } = require('../controllers/album.controller');


router.get(['/', '/page/:page'], album);

router.get('/:albumId', albumDetail);

module.exports = router;