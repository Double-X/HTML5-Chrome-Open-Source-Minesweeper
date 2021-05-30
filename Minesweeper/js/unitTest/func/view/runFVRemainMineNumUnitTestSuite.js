/**
 * Runs the FVRemainMineNum unit tests suite
 * Idempotent
 * @author DoubleX
 * @param {Function} $ - The component to be unit tested
 * @since v1.0
 * @version v1.1
 */
DoubleX.PROJ.MINESWEEPER.TEST.UNIT.RunFVRemainMineNumUnitTestSuite = 
        function($) {

    "use strict";

    // Stores all the original functions under unit tests
    var _UNIT_TEST = $.unitTest = { orig: {}, new: {} };
    var $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;
    $$._formattedMineNum = $._formattedMineNum;
    //

    var _IS_UNIT_TEST_ONCE = true, _IS_UNIT_TEST_PER_CALL = false;

    /**
     * Hotspot/No-op
     * @author DoubleX
     * @param {Number} mineNum - The number of mines to be shown
     * @since v1.0
     * @version v1.1
     */
    $$$._formattedMineNum = function(mineNum) {
        // Ensures the output's the expected one with respect to the input
        var unitTestFormattedMineNum1 = $$._formattedMineNum(999);
        var unitTestFormattedMineNum2 = $$._formattedMineNum(100);
        var unitTestFormattedMineNum3 = $$._formattedMineNum(99);
        var unitTestFormattedMineNum4 = $$._formattedMineNum(10);
        var unitTestFormattedMineNum5 = $$._formattedMineNum(9);
        var unitTestFormattedMineNum6 = $$._formattedMineNum(0);
        var unitTestFormattedMineNum7 = $$._formattedMineNum(-1);
        var unitTestFormattedMineNum8 = $$._formattedMineNum(-9);
        var unitTestFormattedMineNum9 = $$._formattedMineNum(-10);
        var unitTestFormattedMineNum10 = $$._formattedMineNum(-99);
        console.info("DoubleX.PROJ.MINESWEEPER.TEST.RunFVRemainMineNumUnitTestSuite _unitTestFormattedMineNum");
        console.info("mineNum: " + mineNum);
        if (unitTestFormattedMineNum1 === "999") {
            console.info("Passed the 1st test!");
        } else console.info("Failed the 1st test! Actual value: " + 
                unitTestFormattedMineNum1);
        if (unitTestFormattedMineNum2 === "100") {
            console.info("Passed the 2nd test!");
        } else console.info("Failed the 2nd test! Actual value: " + 
                unitTestFormattedMineNum2);
        if (unitTestFormattedMineNum3 === "099") {
            console.info("Passed the 3rd test!");
        } else console.info("Failed the 3rd test! Actual value: " + 
                unitTestFormattedMineNum3);
        if (unitTestFormattedMineNum4 === "010") {
            console.info("Passed the 4th test!");
        } else console.info("Failed the 4th test! Actual value: " + 
                unitTestFormattedMineNum4);
        if (unitTestFormattedMineNum5 === "009") {
            console.info("Passed the 5th test!");
        } else console.info("Failed the 5th test! Actual value: " + 
                unitTestFormattedMineNum5);
        if (unitTestFormattedMineNum6 === "000") {
            console.info("Passed the 6th test!");
        } else console.info("Failed the 6th test! Actual value: " + 
                unitTestFormattedMineNum6);
        if (unitTestFormattedMineNum7 === "-01") {
            console.info("Passed the 7th test!");
        } else console.info("Failed the 7th test! Actual value: " + 
                unitTestFormattedMineNum7);
        if (unitTestFormattedMineNum8 === "-09") {
            console.info("Passed the 8th test!");
        } else console.info("Failed the 8th test! Actual value: " + 
                unitTestFormattedMineNum8);
        if (unitTestFormattedMineNum9 === "-10") {
            console.info("Passed the 9th test!");
        } else console.info("Failed the 9th test! Actual value: " + 
                unitTestFormattedMineNum9);
        if (unitTestFormattedMineNum10 === "-99") {
            console.info("Passed the 10th test!");
        } else console.info("Failed the 10th test! Actual value: " + 
                unitTestFormattedMineNum10);
        //
    }; // $$$._formattedMineNum

    if (_IS_UNIT_TEST_PER_CALL) {

        /**
         * Hotspot/Pure function
         * @author DoubleX
         * @param {Number} mineNum - The number of mines to be shown
         * @returns {String} The requested formatted mine num
         * @since v1.0
         * @version v1.0
         */
        $._formattedMineNum = function(mineNum) {
            // Added to test whether it produces the expected output
            $$$._formattedMineNum.call($, mineNum);
            //
            return $$._formattedMineNum.call($,mineNum);
        }; // $._formattedMineNum

    } // if (_IS_UNIT_TEST_PER_CALL)

    if (_IS_UNIT_TEST_ONCE) $$$._formattedMineNum.call($, 0);

}; // DoubleX.PROJ.MINESWEEPER.TEST.UNIT.RunFVRemainMineNumUnitTestSuite