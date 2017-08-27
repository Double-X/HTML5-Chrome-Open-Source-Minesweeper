/**
 * Runs the unit test suite for the plugin implementation on counting opened ops
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _PLUGIN = namespace.PLUGINS.OPS, _UNIT_TEST = _PLUGIN.unitTest;
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
        var ops = this._OM_GRIDS._ops;
        console.info(
                "DoubleX.PROJ.MINESWEEPER.PLUGINS.OPS.unitTest.new._onWin");
        console.info("ops: " + ops);
        console.info("this._revealedOps: " + this._revealedOps);
        console.info(this._revealedOps === ops ? "Passed!" : "Failed!");
        //
    }; // $$$._onWin

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._updateRevealedOpsCount = $._updateRevealedOpsCount;
    $._updateRevealedOpsCount = function() {
        // This ordering must be preserved or the test would leak on edge cases
        $$._updateRevealedOpsCount.call(this);
        $$$._updateRevealedOpsCount.call(this);
        //
    }; // $._updateRevealedOpsCount

    /**
     * Hotspot/No-op
     * @since v1.0
     * @version v1.0
     */
    $$$._updateRevealedOpsCount = function() {
        // It's not tautological as it exposes a hidden assumption
        var ops = this._OM_GRIDS._ops;
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.OPS.unitTest.new._updateRevealedOpsCount");
        console.info("ops: " + ops);
        console.info("this._revealedOps: " + this._revealedOps);
        console.info("this._isEnded: " + this._isEnded);
        if (this._revealedOps > 0 && this._revealedOps <= ops && 
                !this._isEnded) {
            console.info("Passed!");
        } else {
            console.info("Failed!");
        }
        //
    }; // $$$._updateRevealedOpsCount

})(DoubleX.PROJ.MINESWEEPER);