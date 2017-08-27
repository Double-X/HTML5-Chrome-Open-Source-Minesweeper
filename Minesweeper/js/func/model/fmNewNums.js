/**
 * This function should be called exactly once per page load
 * Potential Hotspot/Pure function
 * @author DoubleX
 * @param {Object[String, Function]} F_NEAR_GRIDS - The FNearGrids API mapping
 * @param {OMNum} OMNum - The function creating a num data object
 * @param {OCClicks} OC_CLICKS - The object storing click statuses
 * @param {Function} GRID - Returns the grid of the given coors
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMNewNums = function(
        F_NEAR_GRIDS, OMNum, OC_CLICKS, GRID, PUBLISH) {

    "use strict";

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMNewNums;

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Array[OGrid]]} oGrids - List of list of grid data
     * @param {Function} callback - The function of the grid data owner
     * @returns {Array[Array[OGrid]]} The requested list of lists of grids
     * @since v1.0
     * @version v1.0
     */
    $.newNums = function(oGrids, callback) {
        return oGrids.map($._newRowNumsFunc(callback));
    }; // $.newNums

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Function} callback - The function of the grid data owner
     * @returns {Function(Array[OGrid], Number, Array[Array[OGrid]], 
     *          Array[OGrid]) => Array[OGrid]} The requested function
     * @since v1.0
     * @version v1.0
     */
    $._newRowNumsFunc = function(callback) {
        /**
         * Potential Hotspot/Pure function
         * @author DoubleX
         * @param {Array[OGrid]} row - A list of grid data
         * @param {Number} rowIndex - The currently checked row index
         * @param {Array[Array[OGrid]]} oGrids - List of lists of grids
         * @returns {Array[OGrid]} The requested list of grid data
         * @since v1.0
         * @version v1.0
         */
        return function(row, rowIndex, oGrids) {
            return $._newRowNums(callback, row, rowIndex, oGrids);
        };
    }; // $._newRowNumsFunc

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Function} callback - The function of the grid data owner
     * @param {Array[OGrid]} row - A list of grid data
     * @param {Number} rowIndex - The currently checked row index
     * @param {Array[Array[OGrid]]} oGrids - List of list of grid data
     * @returns {Array[OGrid]} The requested list of grid data
     * @since v1.0
     * @version v1.0
     */
    $._newRowNums = function(callback, row, rowIndex, oGrids) {
        return row.map($._newNumFunc(callback, rowIndex, oGrids));
    }; // $._newRowNums

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Function} callback - The function of the grid data owner
     * @param {Number} rowIndex - The currently checked row index
     * @param {Array[Array[OGrid]]} oGrids - List of list of grid data
     * @returns {Function(OGrid/Nullable, Number, Array[OGrid]) => 
     *          OGrid/Nullable} The requested function
     * @since v1.0
     * @version v1.0
     */
    $._newNumFunc = function(callback, rowIndex, oGrids) {
        /**
         * Potential Hotspot/Pure function
         * @author DoubleX
         * @param {OGrid/Nullable} oGrid - An object storing all grid data
         * @param {Number} colIndex - The currently checked col index
         * @param {Array[OGrid]} row - A list of grid data
         * @returns {OGrid/Nullable} The requested num data or intact grid
         * @since v1.0
         * @version v1.0
         */
        return function(oGrid, colIndex, row) {
            return $._newNumNull(
                    callback, rowIndex, oGrids, oGrid, colIndex, row);
        };
    }; // $._newNumFunc

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Function} callback - The function of the grid data owner
     * @param {Number} rowIndex - The currently checked row index
     * @param {Array[Array[OGrid]]} oGrids - List of list of grid data
     * @param {OGrid/Nullable} oGrid - An object storing all grid data
     * @param {Number} colIndex - The currently checked col index
     * @param {Array[OGrid]} row - A list of grid data
     * @returns {OGrid/Nullable} The requested num data or intact grid
     * @since v1.0
     * @version v1.0
     */
    $._newNumNull = function(
            callback, rowIndex, oGrids, oGrid, colIndex, row) {
        // Only mines should be generated before generating numbers
        if ($._isGen(oGrid)) return oGrid;
        var num = F_NEAR_GRIDS.nearGrids(colIndex, rowIndex, row.length, 
                oGrids.length, oGrids).filter($._isGen).length;
        //
        return num <= 0 ? oGrid : $._newNum(callback, rowIndex, colIndex, num);
    }; // $._newNumNull

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Function} callback - The function of the grid data owner
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently checked col index
     * @param {Number} num - The number of mines nearby this num
     * @returns {OGrid} The requested num data or intact grid
     * @since v1.0
     * @version v1.0
     */
    $._newNum = function(callback, rowIndex, colIndex, num) {
        return new OMNum(OC_CLICKS, GRID, callback, colIndex, rowIndex, num);
    }; // $._newNum

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {OGrid} oGrid - An object storing all grid data
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isGen = function(oGrid) { return oGrid; };

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = { newNums: $.newNums };
    //
    PUBLISH("FMNewNums", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMNewNums