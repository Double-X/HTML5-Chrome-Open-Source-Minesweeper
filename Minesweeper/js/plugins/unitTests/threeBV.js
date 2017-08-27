/**
 * Runs the unit test suite for the plugin implementation on counting opened 3BV
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _PLUGIN = namespace.PLUGINS.THREE_BV, _UNIT_TEST = _PLUGIN.unitTest;
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
        var threeBV = this._OM_GRIDS._threeBV;
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.THREE_BV.unitTest.new._onWin");
        console.info("threeBV: " + threeBV);
        console.info("this._clickedThreeBV: " + this._clickedThreeBV);
        console.info(this._clickedThreeBV === threeBV ? "Passed!" : "Failed!");
        //
    }; // $$$._onWin

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._updateRevealedThreeBVCount = $._updateRevealedThreeBVCount;
    $._updateRevealedThreeBVCount = function() {
        // This ordering must be preserved or the test would leak on edge cases
        $$._updateRevealedThreeBVCount.call(this);
        $$$._updateRevealedThreeBVCount.call(this);
        //
    }; // $._updateRevealedThreeBVCount

    /**
     * Hotspot/No-op
     * @since v1.0
     * @version v1.0
     */
    $$$._updateRevealedThreeBVCount = function() {
        // It's not tautological as it exposes a hidden assumption
        var threeBV = this._OM_GRIDS._threeBV;
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.THREE_BV.unitTest.new._updateRevealedThreeBVCount");
        console.info("threeBV: " + threeBV);
        console.info("this._clickedThreeBV: " + this._clickedThreeBV);
        console.info("this._isEnded: " + this._isEnded);
        if (this._clickedThreeBV > 0 && this._clickedThreeBV <= threeBV && 
                !this._isEnded) {
            console.info("Passed!");
        } else {
            console.info("Failed!");
        }
        //
    }; // $$$._updateRevealedThreeBVCount

})(DoubleX.PROJ.MINESWEEPER);