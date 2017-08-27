/**
 * Runs the unit test suite for the plugin implementation on counting clicks
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _PLUGIN = namespace.PLUGINS.CL, _UNIT_TEST = _PLUGIN.unitTest;
    var $ = _PLUGIN.OCClicks.new, $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onEnd = $._onEnd;
    $._onEnd = function() {
        $$._onEnd.call(this);
        $$$._verifyLeftClickNum.call(this);
    }; // $._onEnd

    /**
     * Hotspot
     * @since v1.0
     * @version v1.0
     */
    $$._increaseLeftClickNum = $._increaseLeftClickNum;
    $._increaseLeftClickNum = function() {
        // This ordering must be preserved or the unit test would be pointless
        $$._increaseLeftClickNum.call(this);
        $$$._verifyTotalClickNum.call(this);
        //
    }; // $$$._increaseLeftClickNum

    /**
     * Hotspot
     * @since v1.0
     * @version v1.0
     */
    $$._increaseMidClickNum = $._increaseMidClickNum;
    $._increaseMidClickNum = function() {
        // This ordering must be preserved or the unit test would be pointless
        $$._increaseMidClickNum.call(this);
        $$$._verifyTotalClickNum.call(this);
        //
    }; // $$$._increaseMidClickNum

    /**
     * Hotspot
     * @since v1.0
     * @version v1.0
     */
    $$._increaseRightClickNum = $._increaseRightClickNum;
    $._increaseRightClickNum = function() {
        // This ordering must be preserved or the unit test would be pointless
        $$._increaseRightClickNum.call(this);
        $$$._verifyTotalClickNum.call(this);
        //
    }; // $$$._increaseRightClickNum

    /**
     * Hotspot/No-op
     * @since v1.0
     * @version v1.0
     */
    $$$._verifyLeftClickNum = function() {
        // It's not tautological as it exposes a hidden assumption
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.CL.unitTest.new._verifyLeftClickNum");
        console.info("this._leftClickNum: " + this._leftClickNum);
        console.info(this._leftClickNum > 0 ? "Passed!" : "Failed!");
        //
    }; // $$$._verifyLeftClickNum

    /**
     * Hotspot/No-op
     * @since v1.0
     * @version v1.0
     */
    $$$._verifyTotalClickNum = function() {
        // It's not tautological as it exposes a hidden assumption
        var totalClickNum = 
                this._leftClickNum + this._midClickNum + this._rightClickNum;
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.CL.unitTest.new._verifyTotalClickNum");
        console.info("totalClickNum: " + totalClickNum);
        console.info("this._clickNum: " + this._clickNum);
        console.info("this._isEnded: " + this._isEnded);
        if (totalClickNum === this._clickNum && !this._isEnded) {
            console.info("Passed!");
        } else {
            console.info("Failed!");
        }
        //
    }; // $$$._verifyTotalClickNum

})(DoubleX.PROJ.MINESWEEPER);