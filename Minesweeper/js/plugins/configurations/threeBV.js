/** The configuration of the 3BV plugin
 * Potential hotspot/Pure function
 * @author DoubleX
 * @param {Object} cfg - The plugin configuration container
 * @since v1.0
 * @version v1.0
 */
(function(cfg) {

    "use strict";

    /**
     * Potential hotspot/Pure function
     * @author DoubleX
     * @interface
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Number} threeBV - The current 3BV count
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    cfg.isValidThreeBV = function(w, h, mineNum, threeBV) {
        // These are enforced by the professional minesweeper community
        if (_isBeg(w, h, mineNum)) return threeBV >= 2;
        if (_isInt(w, h, mineNum)) return threeBV >= 30;
        if (_isExp(w, h, mineNum)) return threeBV >= 99;
        //
        // Setting it as impossible to be true will lead to an infinite loop
        return true;
        //
    }; // cfg.isValidThreeBV

    /**
     * Potential hotspot/Pure function
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    function _isBeg(w, h, mineNum) { return w === h === 8 && mineNum === 10; };

    /**
     * Potential hotspot/Pure function
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    function _isInt(w, h, mineNum) { return w === h === 16 && mineNum === 40; };

    /**
     * Potential hotspot/Pure function
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    function _isExp(w, h, mineNum) {
        return w === 30 && h === 16 && mineNum === 99;
    }; // _isExp

})(DoubleX.PROJ.MINESWEEPER.PLUGINS.THREE_BV.configuration);