/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';

/**
 * node Modules
 */

const cors = require('cors')
const cookieParser = require('cookie-parser');


/**
 * Custom Modules
 */
const login = require('./src/routes/login.route');


// Initial express app
const express = require('express');
const app = express();


/**
 * EJS setting
 */
app.set('view engine', 'ejs');


/**
 * Setting static Directory
 */
app.use(express.static('${__dirname}/public'));


/**
 * Enable cors and cookie Parser
 */
app.use(cors()).use(cookieParser());


/**
 * Login Page
 */
app.use('/login', login);


app.listen(5000, () => {
    console.log('Server listening at http://localhost:5000');
});