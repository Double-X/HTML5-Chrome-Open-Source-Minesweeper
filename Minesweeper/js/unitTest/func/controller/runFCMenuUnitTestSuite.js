/**
 * Runs the FCMenu unit tests suite
 * Idempotent
 * @author DoubleX
 * @param {Function} $ - The component to be unit tested
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.TEST.UNIT.RunFCMenuUnitTestSuite = function($) {

    "use strict";

    // Stores all the original functions under unit tests
    var _UNIT_TEST = $.unitTest = { orig: {}, new: {} };
    var $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;
    $$._wHMineNum = $._wHMineNum;
    //

    var _IS_UNIT_TEST_ONCE = true, _IS_UNIT_TEST_PER_CALL = false;

    /**
     * No-op
     * @author DoubleX
     * @param {String/Nullable} wHMineNum - The raw board param inputs
     * @since v1.0
     * @version v1.0
     */
    $$$._wHMineNum = function(wHMineNum) {
        // Ensures the output's the expected one with respect to the input
        var unitTestWHMineNum1 = $$._wHMineNum("30-24-10");
        var unitTestWHMineNum2 = $$._wHMineNum("30 24 180");
        var unitTestWHMineNum3 = $$._wHMineNum("30, 24, 667");
        var unitTestWHMineNum4 = $$._wHMineNum("");
        var unitTestWHMineNum5 = $$._wHMineNum(null);
        var unitTestWHMineNum6 = $$._wHMineNum(undefined);
        console.info("DoubleX.PROJ.MINESWEEPER.RunFCMenuUnitTestSuite _unitTestWHMineNum");
        console.info("wHMineNum: " + wHMineNum);
        if (unitTestWHMineNum1[0] === 30 && unitTestWHMineNum1[1] === 24 && unitTestWHMineNum1[2] === 10) {
            console.info("Passed the 1st test!");
        } else {
            console.info("Failed the 1st test! Actual value: " + unitTestWHMineNum1);
        }
        if (unitTestWHMineNum2[0] === 30 && unitTestWHMineNum2[1] === 24 && unitTestWHMineNum2[2] === 180) {
            console.info("Passed the 2nd test!");
        } else {
            console.info("Failed the 2nd test! Actual value: " + unitTestWHMineNum2);
        }
        if (unitTestWHMineNum3[0] === 30 && unitTestWHMineNum3[1] === 24 && unitTestWHMineNum3[2] === 667) {
            console.info("Passed the 3rd test!");
        } else {
            console.info("Failed the 3rd test! Actual value: " + unitTestWHMineNum3);
        }
        if (unitTestWHMineNum4) {
            console.info("Failed the 4th test! Actual value: " + unitTestWHMineNum4);
        } else {
            console.info("Passed the 4th test!");
        }
        if (unitTestWHMineNum5) {
            console.info("Failed the 5th test! Actual value: " + unitTestWHMineNum5);
        } else {
            console.info("Passed the 5th test!");
        }
        if (unitTestWHMineNum6) {
            console.info("Failed the 6th test! Actual value: " + unitTestWHMineNum6);
        } else {
            console.info("Passed the 6th test!");
        }
        //
    }; // $$$._wHMineNum

    if (_IS_UNIT_TEST_PER_CALL) {

        /**
         * Pure function
         * @author DoubleX
         * @param {String/Nullable} wHMineNum - The raw board param inputs
         * @returns {Array/Nullable} The requested argument list
         * @since v1.0
         * @version v1.0
         */
        $._wHMineNum = function(wHMineNum) {
            // Added to test whether it produces the expected output
            $$$._wHMineNum.call($, wHMineNum);
            //
            return $$._wHMineNum.call($, wHMineNum);
        }; // $._wHMineNum

    } // if (_IS_UNIT_TEST_PER_CALL)

    if (_IS_UNIT_TEST_ONCE) { $$$._wHMineNum.call($, ""); }

}; // DoubleX.PROJ.MINESWEEPER.TEST.UNIT.RunFCMenuUnitTestSuite