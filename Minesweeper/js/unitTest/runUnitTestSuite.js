(function(namespace) {

    /**
     * Runs all activated unit tests for core files in the unit test suite
     * Idempotent
     * @author DoubleX
     * @param {Function} SUBSCRIBE - Subscribes to a component
     * @param {Function} CALLBACK - Called when all tests are attached
     * @since v1.0
     * @version v1.0
     */
    namespace.RunUnitTestSuite = function(SUBSCRIBE, CALLBACK) {

        "use strict";

        var _NAMESPACE = namespace.UNIT;

        /**
         * Idempotent
         * @author DoubleX
         * @interface
         * @since v1.0
         * @version v1.0
         */
        function subscribe() {
            SUBSCRIBE("FNearGrids", _NAMESPACE.RunFNearGridsUnitTestSuite);
            SUBSCRIBE("FCMenu", _NAMESPACE.RunFCMenuUnitTestSuite);
            SUBSCRIBE("FMNewMines", _NAMESPACE.RunFMNewMinesUnitTestSuite);
            SUBSCRIBE("FVRemainMineNum", 
                    _NAMESPACE.RunFVRemainMineNumUnitTestSuite);
            CALLBACK();
        }; // subscribe

        return subscribe; // The RunUnitTestSuite API

    }; // namespace.RunUnitTestSuite

})(DoubleX.PROJ.MINESWEEPER.TEST);