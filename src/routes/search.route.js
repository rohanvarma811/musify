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
const {
    searchRequest, 
    searchAll 
} = require('../controllers/search.controller');


router.post('/', searchRequest);

router.get('/all/:query', searchAll);


module.exports = router;