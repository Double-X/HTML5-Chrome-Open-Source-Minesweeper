/**
 * Runs the OMGrid unit tests suite
 * Idempotent
 * @author DoubleX
 * @param {OMGrid} OMGrid - The function of this prototype
 * @since v1.0
 * @version v1.1
 */
(function(OMGrid) {

    "use strict";

    var _UNIT_TEST = OMGrid.unitTest = { orig: {}, new: {} };
    var $ = OMGrid.prototype;
    var $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} flagStatusIndex - The _FLAG_STATUSES index
     * @since v1.0
     * @version v1.0
     */
    $$._setFlagStatusIndex = $._setFlagStatusIndex;
    $._setFlagStatusIndex = function(flagStatusIndex) {
        $$._setFlagStatusIndex.call(this, flagStatusIndex);
        // $$$._setFlagStatusIndex.call(this); // Added to test a class invariant
    }; // $._setFlagStatusIndex

    /**
     * No-op
     * @author DoubleX
     * @since v1.0
     * @version v1.1
     */
    $$$._setFlagStatusIndex = function() {
        // It's not tautological as it exposes a hidden assumption
        var maxIndex = this._FLAG_STATUSES.length - 1;
        console.info("DoubleX.PROJ.MINESWEEPER.OBJ.MODEL.OMGrid.unitTest.new._setFlagStatusIndex");
        console.info("maxIndex: " + maxIndex);
        console.info("this._flagStatusIndex: " + this._flagStatusIndex);
        if (this._flagStatusIndex >= 0 && this._flagStatusIndex <= maxIndex) {
            console.info("Passed!");
        } else console.info("Failed!");
        //
    }; // $$$._setFlagStatusIndex

})(DoubleX.PROJ.MINESWEEPER.OBJ.MODEL.OMGrid);