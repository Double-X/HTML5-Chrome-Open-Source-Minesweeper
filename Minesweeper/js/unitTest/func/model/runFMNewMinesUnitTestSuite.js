/**
 * Runs the FMNewMines unit tests suite
 * Idempotent
 * @author DoubleX
 * @param {Function} $ - The component to be unit tested
 * @since v1.0
 * @version v1.1
 */
DoubleX.PROJ.MINESWEEPER.TEST.UNIT.RunFMNewMinesUnitTestSuite = function($) {

    "use strict";

    // Stores all the original functions under unit tests
    var _UNIT_TEST = $.unitTest = { orig: {}, new: {} };
    var $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;
    $$._randMinePosIndex = $._randMinePosIndex;
    //

    var _IS_UNIT_TEST_ONCE = true, _IS_UNIT_TEST_PER_CALL = false;

    /**
     * Potential Hotspot/No-op
     * @author DoubleX
     * @param {Number} availGridNum - The number of available grids
     * @since v1.0
     * @version v1.1
     */
    $$$._unitTestRandMinePosIndex = function(availGridNum) {
        // Ensures the output's E and Var are within the 95% confidence interval
        var indexSum = 0, indexSqSum = 0, index, moe = availGridNum * 0.025;
        var e = availGridNum / 2, eVar = (Math.pow(availGridNum, 2) - 1) / 12;
        var moeSq = eVar * 0.05, minE = e - moe, maxE = e + moe;
        var minV = eVar - moeSq, maxV = eVar + moeSq;
        for (var count = 1; count < availGridNum; count++) {
            index = $$._randMinePosIndex(availGridNum);
            indexSum += index, indexSqSum += Math.pow(index - e, 2);
        }
        var mean = indexSum / availGridNum, vari = indexSqSum / availGridNum;
        console.info("DoubleX.PROJ.MINESWEEPER.TEST.RunFMNewMinesUnitTestSuite _unitTestRandMinePosIndex");
        console.info("availGridNum: " + availGridNum);
        console.info("moe: " + moe);
        console.info("e: " + e);
        console.info("eVar: " + eVar);
        console.info("moeSq: " + moeSq);
        console.info("minE: " + minE);
        console.info("maxE: " + maxE);
        console.info("minV: " + minV);
        console.info("maxV: " + maxV);
        console.info("mean: " + mean);
        console.info("vari: " + vari);
        if (mean >= minE && mean <= maxE) {
            console.info("Passed the 1st test!");
        } else console.info("Failed the 1st test!");
        if (vari >= minV && vari <= maxV) {
            console.info("Passed the 2nd test!");
        } else console.info("Failed the 2nd test!");
        //
    }; // $$$._unitTestRandMinePosIndex

    if (_IS_UNIT_TEST_PER_CALL) {

        /**
         * Potential Hotspot/Nullipotent
         * @author DoubleX
         * @param {Number} availGridNum - The number of available grids
         * @returns {Number} The requested index
         * @since v1.0
         * @version v1.0
         */
        $._randMinePosIndex = function(availGridNum) {
            // Added to test whether its expectation and variance are acceptable
            $$$._randMinePosIndex.call($, availGridNum);
            //
            return $$._randMinePosIndex.call($, availGridNum);
        }; // $._randMinePosIndex

    } // if (_IS_UNIT_TEST_PER_CALL)

    if (_IS_UNIT_TEST_ONCE) $$$._unitTestRandMinePosIndex.call($, 480);

}; // DoubleX.PROJ.MINESWEEPER.TEST.UNIT.RunFMNewMinesUnitTestSuite