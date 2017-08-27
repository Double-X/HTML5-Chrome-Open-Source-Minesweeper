/** The configuration of the op plugin
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
     * @param {Number} isIs - The current isIs count
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    cfg.isValidIsIs = function(w, h, mineNum, isIs) {
        // Setting it as impossible to be true will lead to an infinite loop
        return true;
        //
    }; // cfg.isValidIsIs

})(DoubleX.PROJ.MINESWEEPER.PLUGINS.ISIS.configuration);