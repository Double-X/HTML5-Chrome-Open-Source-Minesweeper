/**
 * Runs the unit test suite for the plugin implementation on storing the path
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _PLUGIN = namespace.PLUGINS.PATH, _UNIT_TEST = _PLUGIN.unitTest;
    var $ = _PLUGIN.OMPath.prototype;
    var $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} pathX - The path x component in the board
     * @param {Number} pathY - The path y component in the board
     * @since v1.0
     * @version v1.0
     */
    $$._storeTimePts = $._storeTimePts;
    $._storeTimePts = function(pathX, pathY) {
        $$._storeTimePts.call(this, pathX, pathY);
        /** @todo: Makes this test performant enough to be run here */
        // $$$._storeTimePts.call(this, pathX, pathY);
        //
    }; // $._storeTimePts

    /**
     * Hotspot/No-op
     * @param {Number} pathX - The path x component in the board
     * @param {Number} pathY - The path y component in the board
     * @since v1.0
     * @version v1.0
     */
    $$$._storeTimePts = function(pathX, pathY) {
        // It's not tautological as it exposes a hidden assumption
        var timesLength = this._pathTimes.length;
        var ptsLength = this._pathPts.length;
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.PATH.OMPath.unitTest.new._storeTimePts");
        console.info("pathX: " + pathX);
        console.info("pathY: " + pathY);
        console.info("timesLength: " + timesLength);
        console.info("ptsLength: " + ptsLength);
        console.info("this._isEnded: " + this._isEnded);
        if (timesLength === ptsLength && !this._isEnded) {
            console.info("Passed!");
        } else {
            console.info("Failed!");
        }
        //
    }; // $$$._storeTimePts

})(DoubleX.PROJ.MINESWEEPER);