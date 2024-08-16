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
const auth = require('./src/routes/auth.route');
const authenticatedUser = require('./src/middlewares/auth_user.middleware');
const home = require('./src/routes/home.route');
const explore = require('./src/routes/explore.route');
const album = require('./src/routes/album.route');
const playlist = require('./src/routes/playlist.route');
const profile = require('./src/routes/profile.route');
const search = require('./src/routes/search.route');


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
app.use(express.static(`${__dirname}/public`));


/**
 * Enable cors and cookie Parser
 */
app.use(express.urlencoded({ extended: true }));


/**
 * Enable cors and cookie Parser
 */
app.use(cors()).use(cookieParser());


/**
 * Login Page
 */
app.use('/login', login);


/**
 * Auth Page
 */
app.use('/auth', auth);


/**
 * Checking user is authenticated
 */
app.use(authenticatedUser);


/**
 * Home page
 */
app.use('/', home);


/**
 * Explore page
 */
app.use('/explore', explore);


/**
 * Album page
 */
app.use('/album', album);


/**
 * Playlist page
 */
app.use('/playlist', playlist);


/**
 * Profile page
 */
app.use('/me', profile);


/**
 * Search result page
 */
app.use('/search', search);


app.listen(5000, () => {
    console.log('Server listening at http://localhost:5000');
});