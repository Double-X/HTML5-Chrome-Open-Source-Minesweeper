/**
 * Runs the unit test suite for plugin implementation on counting solved isis
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.1
 */
(function(namespace) {

    "use strict";

    var _PLUGIN = namespace.PLUGINS.ISIS, _UNIT_TEST = _PLUGIN.unitTest;
    var $ = _PLUGIN.OCGrids.new, $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onWin = $._onWin;
    $._onWin = function() {
        $$._onWin.call(this);
        $$$._onWin.call(this);
    }; // $._onWin

    /**
     * Potential Hotspot/No-op
     * @since v1.0
     * @version v1.0
     */
    $$$._onWin = function() {
        // It's not tautological as it exposes a hidden assumption
        var isIs = this._OM_GRIDS._isIs;
        console.info(
                "DoubleX.PROJ.MINESWEEPER.PLUGINS.ISIS.unitTest.new._onWin");
        console.info("isIs: " + isIs);
        console.info("this._solvedIsIsNum: " + this._solvedIsIsNum);
        console.info(this._solvedIsIsNum === isIs ? "Passed!" : "Failed!");
        //
    }; // $$$._onWin

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._updateSolvedIsIsNum = $._updateSolvedIsIsNum;
    $._updateSolvedIsIsNum = function() {
        // This ordering must be preserved or the test would leak on edge cases
        $$._updateSolvedIsIsNum.call(this);
        $$$._updateSolvedIsIsNum.call(this);
        //
    }; // $._updateSolvedIsIsNum

    /**
     * Hotspot/No-op
     * @since v1.0
     * @version v1.1
     */
    $$$._updateSolvedIsIsNum = function() {
        // It's not tautological as it exposes a hidden assumption
        var isIs = this._OM_GRIDS._isIs;
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.ISIS.unitTest.new._updateSolvedIsIsNum");
        console.info("isIs: " + isIs);
        console.info("this._solvedIsIsNum: " + this._solvedIsIsNum);
        if (this._solvedIsIsNum > 0 && this._solvedIsIsNum <= isIs) {
            console.info("Passed!");
        } else console.info("Failed!");
        //
    }; // $$$._updateSolvedIsIsNum

})(DoubleX.PROJ.MINESWEEPER);