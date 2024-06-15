/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';


const login = (req, res) => {
    res.render('./pages/login.ejs');
};


module.exports = { login };