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
const { login } = require('../controllers/login.controller');


router.get('/', login);


module.exports = router;