/**
 * @license Apache-2.0
 * @copyright rohanvarma811 2024
 */

'use strict';


/**
 * Add events on elements
 */
const addEventOnElems = function(elements, eventType, callback) {
    elements.forEach(element => element.addEventListener(eventType,callback));
}

const msToTimeCode = (ms) => {
    const /** {number} */ sec = Math.floor((ms % 60000) / 1000);
    const /** {number} */ min = Math.floor((ms % 3600000) / 60000);

    const /** {string} */ formattedSec = sec.toString().padStart(2, '0');
    const /** {string} */ formattedMin = min.toString().padStart(2, '0');

    return `${formattedMin}:${formattedSec}`;
}


export { addEventOnElems, msToTimeCode }