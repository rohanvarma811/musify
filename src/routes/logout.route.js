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
 * Custom modules
 */
const { logout } = require('../controllers/logout.controller');


router.get('/', logout);


module.exports = router;