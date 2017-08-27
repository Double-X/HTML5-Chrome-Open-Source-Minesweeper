/**
 * This function should be called exactly once per page load
 * Potential Hotspot/Pure function
 * @author DoubleX
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.FUNC.FAllOtherGrids = function(PUBLISH) {

    "use strict";

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.FAllOtherGrids;

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @interface
     * @param {Number} x - The col index of the current grid
     * @param {Number} y - The row index of the current grid
     * @param {Array[Array[OGrid]]} oGrids - The list of list of grids
     * @returns {Array[OGrid]} The requested list of grids
     * @since v1.0
     * @version v1.0
     */
    $.allOtherGrids = function(x, y, oGrids) {
        return oGrids.reduce($._allOtherRowGridsFunc(x, y), []);
    }; // $.allOtherGrids

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} x - The col index of the current grid
     * @param {Number} y - The row index of the current grid
     * @returns {Function(Array[OGrid], Array[OGrid]) => Array[OGrid], Number} 
     *         The requested function
     * @since v1.0
     * @version v1.0
     */
    $._allOtherRowGridsFunc = function(x, y) {
        /**
         * Potential Hotspot/Pure function
         * @author DoubleX
         * @param {Array[OGrid]} accumGrids - The list of accumulated grids
         * @param {Array[OGrid]} row - The list of grid
         * @param {Number} rowIndex - The currently checked row index
         * @returns {Array[OGrid]} The requested list of grids
         * @since v1.0
         * @version v1.0
         */
        return function(accumGrids, row, rowIndex) {
            return $._allOtherRowGrids(x, y, accumGrids, row, rowIndex);
        };
    }; // $._allOtherRowGridsFunc

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} x - The col index of the current grid
     * @param {Number} y - The row index of the current grid
     * @param {Array[OGrid]} accumGrids - The list of accumulated grids
     * @param {Array[OGrid]} row - The list of grid
     * @param {Number} rowIndex - The currently checked row index
     * @returns {Array[OGrid]} The requested list of grids
     * @since v1.0
     * @version v1.0
     */
    $._allOtherRowGrids = function(x, y, accumGrids, row, rowIndex) {
        return accumGrids.concat(
                row.filter($._isOtherGridFunc(x, y, rowIndex)));
    }; // $._allOtherRowGrids

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} x - The col index of the current grid
     * @param {Number} y - The row index of the current grid
     * @param {Number} rowIndex - The currently checked row index
     * @returns {Function(OGrid, Number)} The requested function
     * @since v1.0
     * @version v1.0
     */
    $._isOtherGridFunc = function(x, y, rowIndex) {
        /**
         * Potential Hotspot/Pure function
         * @author DoubleX
         * @param {OGrid} oGrid - An object storing all grid contents
         * @param {Number} colIndex - The currently check col index
         * @returns {Boolean} The check result
         * @since v1.0
         * @version v1.0
         */
        return function(oGrid, colIndex) {
            return $._isOtherGrid(x, y, rowIndex, colIndex);
        };
    }; // $._isOtherGridFunc

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} x - The col index of the current grid
     * @param {Number} y - The row index of the current grid
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isOtherGrid = function(x, y, rowIndex, colIndex) {
        return x !== colIndex || y !== rowIndex;
    }; // $._isOtherGrid

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = { allOtherGrids: $.allOtherGrids };
    //
    PUBLISH("FAllOtherGrids", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.FAllOtherGrids