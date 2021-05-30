/**
 * Runs the unit test suite for the plugin implementation on counting corr click
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.1
 */
(function(namespace) {

    "use strict";

    var _PLUGIN = namespace.PLUGINS.CORR, _UNIT_TEST = _PLUGIN.unitTest;
    var $ = _PLUGIN.OCGrids.new, $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onEnd = $._onEnd;
    $._onEnd = function() {
        $$._onEnd.call(this);
        $$$._onEnd.call(this);
    }; // $._onEnd

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._updateCorr = $._updateCorr;
    $._updateCorr = function() {
        // This ordering must be preserved or the test would leak on edge cases
        $$._updateCorr.call(this);
        $$$._updateCorr.call(this);
        //
    }; // $._updateCorr

    /**
     * Hotspot/No-op
     * @since v1.0
     * @version v1.0
     */
    $$$._onEnd = function() {
        // It's not tautological as it exposes a hidden assumption
        console.info(
                "DoubleX.PROJ.MINESWEEPER.PLUGINS.CORR.unitTest.new._onEnd");
        console.info("this._corr: " + this._corr);
        console.info(this._corr > 0 ? "Passed!" : "Failed!");
        //
    }; // $$$._onEnd

    /**
     * Hotspot/No-op
     * @since v1.0
     * @version v1.1
     */
    $$$._updateCorr = function() {
        // It's not tautological as it exposes a hidden assumption
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.CORR.unitTest.new._updateCorr");
        console.info("this._nonMineNum: " + this._nonMineNum);
        console.info("this._corr: " + this._corr);
        console.info("this._isEnded: " + this._isEnded);
        if (this._corr > 0 && this._corr <= this._nonMineNum && 
                !this._isEnded) {
            console.info("Passed!");
        } else console.info("Failed!");
        //
    }; // $$$._updateCorr

})(DoubleX.PROJ.MINESWEEPER);