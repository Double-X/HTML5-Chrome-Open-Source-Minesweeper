/**
 * This function should be called exactly once per page load
 * Potential Hotspot/Pure function
 * @author DoubleX
 * @param {OMSpace} OMSpace - The function creating a space data object
 * @param {OCClicks} OC_CLICKS - The object storing click statuses
 * @param {Function} GRID - Returns the grid of the given coors
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMNewSpaces = function(
        OMSpace, OC_CLICKS, GRID, PUBLISH) {

    "use strict";

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMNewSpaces;

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
    $.newSpaces = function(oGrids, callback) {
        return oGrids.map($._newRowSpaces.bind($, callback));
    }; // $.newSpaces

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Function} callback - The function of the grid data owner
     * @param {Array[OGrid]} row - A list of grid data
     * @param {Number} rowIndex - The currently checked row index
     * @returns {Array[OGrid]} The requested list of grid data
     * @since v1.0
     * @version v1.0
     */
    $._newRowSpaces = function(callback, row, rowIndex) {
        return row.map($._newSpaceFunc(callback, rowIndex));
    }; // $._newRowSpaces

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Function} callback - The function of the grid data owner
     * @param {Number} rowIndex - The currently checked row index
     * @returns {Function(OGrid, Number) => OGrid} The requested function
     * @since v1.0
     * @version v1.0
     */
    $._newSpaceFunc = function(callback, rowIndex) {
        /**
         * Potential Hotspot/Pure function
         * @author DoubleX
         * @param {OGrid} oGrid - An object storing all grid data
         * @param {Number} colIndex - The currently checked col index
         * @returns {OGrid} The requested num data or intact grid
         * @since v1.0
         * @version v1.0
         */
        return function(oGrid, colIndex) {
            // Spaces should be generated after having everything else generated
            return oGrid || $._newSpace(callback, rowIndex, colIndex);
            //
        };
    }; // $._newSpaceFunc

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Function} callback - The function of the grid data owner
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently checked col index
     * @returns {OGrid} The requested num data or intact grid
     * @since v1.0
     * @version v1.0
     */
    $._newSpace = function(callback, rowIndex, colIndex) {
        return new OMSpace(OC_CLICKS, GRID, callback, colIndex, rowIndex);
    }; // $._newSpace

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = { newSpaces: $.newSpaces };
    //
    PUBLISH("FMNewSpaces", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMNewSpaces