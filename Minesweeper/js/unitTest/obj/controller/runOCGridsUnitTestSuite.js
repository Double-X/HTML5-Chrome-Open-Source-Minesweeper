/**
 * Runs the OCGrids unit tests suite
 * Idempotent
 * @author DoubleX
 * @param {OCGrids} OCGrids - The function used by this prototype
 * @since v1.0
 * @version v1.0
 */
(function(OCGrids) {

    "use strict";

    var _UNIT_TEST = OCGrids.unitTest = { orig: {}, new: {} };
    var $ = OCGrids.prototype;
    var $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} remainMineNum - The number of remaining mines
     * @since v1.0
     * @version v1.0
     */
    $$._setRemainMineNum = $._setRemainMineNum;
    $._setRemainMineNum = function(remainMineNum) {
        $$._setRemainMineNum.call(this, remainMineNum);
        $$$._setRemainMineNum.call(this); // Added to test a class invariant
    }; // $._setRemainMineNum

    /**
     * No-op
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._setRemainMineNum = function() {
        // It's not tautological as it exposes a hidden assumption
        console.info("DoubleX.PROJ.MINESWEEPER.OBJ.CONTROLLER.OCGrids.unitTest.new._setRemainMineNum");
        console.info("this._remainMineNum: " + this._remainMineNum);
        console.info("this._mineNum: " + this._mineNum);
        if (this._remainMineNum <= this._mineNum) {
            console.info("Passed!");
        } else {
            console.info("Failed!");
        }
        //
    }; // $$$._setRemainMineNum

})(DoubleX.PROJ.MINESWEEPER.OBJ.CONTROLLER.OCGrids);