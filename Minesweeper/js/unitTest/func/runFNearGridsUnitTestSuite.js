/**
 * Runs the FNearGrids unit tests suite
 * Idempotent
 * @author DoubleX
 * @param {Function} $ - The component to be unit tested
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.TEST.UNIT.RunFNearGridsUnitTestSuite = function($) {

    "use strict";

    // Stores all the original functions under unit tests
    var _UNIT_TEST = $.unitTest = { orig: {}, new: {} };
    var $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;
    $$._nearGridBounds = $._nearGridBounds;
    //

    var _IS_UNIT_TEST_ONCE = true, _IS_UNIT_TEST_PER_CALL = false;

    /**
     * Hotspot/No-op
     * @author DoubleX
     * @param {Number} x - The col index of the current grid
     * @param {Number} y - The row index of the current grid
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @since v1.0
     * @version v1.0
     */
    $$$._nearGridBounds = function(x, y, w, h) {
        // Ensures the output's the expected one with respect to the input
        var unitTestNearGridBounds1 = $$._nearGridBounds(0, 0, 3, 3);
        var unitTestNearGridBounds2 = $$._nearGridBounds(0, 1, 3, 3);
        var unitTestNearGridBounds3 = $$._nearGridBounds(0, 2, 3, 3);
        var unitTestNearGridBounds4 = $$._nearGridBounds(1, 0, 3, 3);
        var unitTestNearGridBounds5 = $$._nearGridBounds(1, 1, 3, 3);
        var unitTestNearGridBounds6 = $$._nearGridBounds(1, 2, 3, 3);
        var unitTestNearGridBounds7 = $$._nearGridBounds(2, 0, 3, 3);
        var unitTestNearGridBounds8 = $$._nearGridBounds(2, 1, 3, 3);
        var unitTestNearGridBounds9 = $$._nearGridBounds(2, 2, 3, 3);
        console.info("DoubleX.PROJ.MINESWEEPER.TEST.RunFNearGridsUnitTestSuite _unitTestNearGridBounds");
        console.info("x: " + x);
        console.info("y: " + y);
        console.info("w: " + w);
        console.info("h: " + h);
        /*
         * Pure function
         * @author DoubleX
         * @param {Object[String, Object[String, Number]]} 
         *          unitTestNearGridBounds - The tested output
         * @param {Number} xMin - The min x range
         * @param {Number} xMax - The max x range
         * @param {Number} yMin - The min y range
         * @param {Number} yMax - The max y range
         * @returns {Boolean} The check result
         * @since v1.0
         * @version v1.0
         */
        function isExpected(unitTestNearGridBounds, xMin, xMax, yMin, yMax) {
            if (unitTestNearGridBounds.x.min !== xMin) return false;
            if (unitTestNearGridBounds.x.max !== xMax) return false;
            if (unitTestNearGridBounds.y.min !== yMin) return false;
            return unitTestNearGridBounds.y.max === yMax;
        }; // isExpected
        if (isExpected(unitTestNearGridBounds1, 0, 1, 0, 1)) {
            console.info("Passed the 1st test!");
        } else {
            console.info("Failed the 1st test! Actual value: " + 
                    JSON.stringify(unitTestNearGridBounds1));
        }
        if (isExpected(unitTestNearGridBounds2, 0, 1, -1, 1)) {
            console.info("Passed the 2nd test!");
        } else {
            console.info("Failed the 2nd test! Actual value: " + 
                    JSON.stringify(unitTestNearGridBounds2));
        }
        if (isExpected(unitTestNearGridBounds3, 0, 1, -1, 0)) {
            console.info("Passed the 3rd test!");
        } else {
            console.info("Failed the 3rd test! Actual value: " + 
                    JSON.stringify(unitTestNearGridBounds3));
        }
        if (isExpected(unitTestNearGridBounds4, -1, 1, 0, 1)) {
            console.info("Passed the 4th test!");
        } else {
            console.info("Failed the 4th test! Actual value: " + 
                    JSON.stringify(unitTestNearGridBounds4));
        }
        if (isExpected(unitTestNearGridBounds5, -1, 1, -1, 1)) {
            console.info("Passed the 5th test!");
        } else {
            console.info("Failed the 5th test! Actual value: " + 
                    JSON.stringify(unitTestNearGridBounds5));
        }
        if (isExpected(unitTestNearGridBounds6, -1, 1, -1, 0)) {
            console.info("Passed the 6th test!");
        } else {
            console.info("Failed the 6th test! Actual value: " + 
                    JSON.stringify(unitTestNearGridBounds6));
        }
        if (isExpected(unitTestNearGridBounds7, -1, 0, 0, 1)) {
            console.info("Passed the 7th test!");
        } else {
            console.info("Failed the 7th test! Actual value: " + 
                    JSON.stringify(unitTestNearGridBounds7));
        }
        if (isExpected(unitTestNearGridBounds8, -1, 0, -1, 1)) {
            console.info("Passed the 8th test!");
        } else {
            console.info("Failed the 8th test! Actual value: " + 
                    JSON.stringify(unitTestNearGridBounds8));
        }
        if (isExpected(unitTestNearGridBounds9, -1, 0, -1, 0)) {
            console.info("Passed the 9th test!");
        } else {
            console.info("Failed the 9th test! Actual value: " + 
                    JSON.stringify(unitTestNearGridBounds9));
        }
        //
    }; // $$$._nearGridBounds

    if (_IS_UNIT_TEST_PER_CALL) {

        /**
         * Hotspot/Pure function
         * @author DoubleX
         * @param {Number} x - The col index of the current grid
         * @param {Number} y - The row index of the current grid
         * @param {Number} w - The number of cols constituting the grid
         * @param {Number} h - The number of rows constituting the grid
         * @returns {Object[String, Object[String, Number]]} The requested
         *                                                   mapping of nearby
         *                                                   coordinates
         * @since v1.0
         * @version v1.0
         */
        $._nearGridBounds = function(x, y, w, h) {
            // Added to test whether it produces the expected outputs
            $$$._nearGridBounds.call($, x, y, w, h);
            //
            return $$._nearGridBounds.call($, x, y, w, h);
        }; // $._nearGridBounds

    } // if (_IS_UNIT_TEST_PER_CALL)

    if (_IS_UNIT_TEST_ONCE) $$$._nearGridBounds.call($, 1, 1, 3, 3);

}; // DoubleX.PROJ.MINESWEEPER.TEST.UNIT.RunFNearGridsUnitTestSuite