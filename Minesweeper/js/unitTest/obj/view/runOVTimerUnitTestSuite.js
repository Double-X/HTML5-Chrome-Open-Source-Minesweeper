/**
 * Runs the OVTimer unit tests suite
 * Idempotent
 * @author DoubleX
 * @param {OMGrid} OVTimer - The function of this prototype
 * @since v1.0
 * @version v1.0
 */
(function(OVTimer) {

    "use strict";

    var _UNIT_TEST = OVTimer.unitTest = { orig: {}, new: {} };
    var $ = OVTimer.prototype;
    var $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {String} The requested formatted timer
     * @since v1.0
     * @version v1.0
     */
    $$._formattedTimer = $._formattedTimer;
    $._formattedTimer = function() {
        // Edited to test a class invariant
        var formattedTimer = $$._formattedTimer.call(this);
        // $$$._formattedTimer.call(this, formattedTimer);
        return formattedTimer;
        //
    }; // $._formattedTimer

    /**
     * Hotspot/No-op
     * @author DoubleX
     * @param {Number} formattedTimer - The formatted timer to be shown
     * @since v1.0
     * @version v1.0
     */
    $$$._formattedTimer = function(formattedTimer) {
        // It's not tautological as it exposes a hidden assumption
        console.info("DoubleX.PROJ.MINESWEEPER.OBJ.VIEW.OVTimer.unitTest.new._formattedTimer");
        console.info("formattedTimer: " + formattedTimer);
        if (formattedTimer.match(/\d{3}\.\d{2}/)) {
            console.info("Passed!");
        } else {
            console.info("Failed!");
        }
        //
    }; // $$$._formattedTimer

})(DoubleX.PROJ.MINESWEEPER.OBJ.VIEW.OVTimer);