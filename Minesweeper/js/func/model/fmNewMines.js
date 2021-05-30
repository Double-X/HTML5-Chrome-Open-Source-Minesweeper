/**
 * This function should be called exactly once per page load
 * Mine generations must be fast and yield consistently random distributions
 * This function can be nullipotent but will lead to less performant algorithms
 * Potential Hotspot
 * @author DoubleX
 * @param {OMMine} OMMine - The function creating a space data object
 * @param {OCClicks} OC_CLICKS - The object storing click statuses
 * @param {Function} GRID - Returns the grid of the given coors
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @todo Reconsider whether making this function nullipotent will be better
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMNewMines = function(
        OMMine, OC_CLICKS, GRID, PUBLISH) {

    "use strict";

    var _FLOOR = Math.floor, _RAND = Math.random;

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMNewMines;

    /**
     * Potential Hotspot
     * @author DoubleX
     * @interface
     * @param {Array[Array[OGrid]]} oGrids - list of list of grid data
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Number} sx - The x coor of the starting click
     * @param {Number} sy - The y coor of the starting click
     * @param {Function} callback - The function of the grid data owner
     * @returns {Array[Array[OGrid]]} The requested list of lists of grid data
     * @since v1.0
     * @version v1.1
     */
    $.newMines = function(oGrids, w, mineNum, sx, sy, callback) {
        $._newMinePosList(w, oGrids.length, mineNum, sx, sy).forEach(
                $._addNewMine.bind($, oGrids, w, callback));
        return oGrids;
    }; // $.newMines

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Number} sx - The x coor of the starting click
     * @param {Number} sy - The y coor of the starting click
     * @returns {Array[Number]} The requested list
     * @since v1.0
     * @version v1.0
     */
    $._newMinePosList = function(w, h, mineNum, sx, sy) {
        // Randomly picks a grid from available ones until all mines are added
        var gridPos = $._gridPos(w, h, sx, sy), newMinePosList = [];
        for (var genMineNum = 0; genMineNum < mineNum; genMineNum++) {
            var minePosIndex = $._randMinePosIndex(gridPos.length);
            newMinePosList.push(gridPos[minePosIndex]);
            gridPos.splice(minePosIndex, 1);
        }
        //
        return newMinePosList;
    }; //  $._newMinePosList

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} sx - The x coor of the starting click
     * @param {Number} sy - The y coor of the starting click
     * @returns {Array[Number]} The requested list
     * @since v1.0
     * @version v1.0
     */
    $._gridPos = function(w, h, sx, sy) {
        var gridPos = [], length = w * h;
        for (var index = 0; index < length; index++) gridPos.push(index);
        gridPos.splice(sx + w * sy, 1); // Or the 1st click might hit the mine
        return gridPos;
    }; // $._gridPos

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} availGridNum - The number of available grids
     * @returns {Number} The requested index
     * @since v1.0
     * @version v1.0
     */
    $._randMinePosIndex = function(availGridNum) {
        return _FLOOR(_RAND() * availGridNum);
    }; // $._randMinePosIndex

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Array[Array[OGrid]]} oGrids - List of list of grid data
     * @param {Number} w - The number of cols constituting the grids
     * @param {Function} callback - The function of the grid data owner
     * @param {Number} minePosIndex - The 1 dimensional mine pos index
     * @since v1.0
     * @version v1.0
     */
    $._addNewMine = function(oGrids, w, callback, minePosIndex) {
        // Converts the 1 dimensional array index to a 2 dimensional one
        var x = minePosIndex % w, y = _FLOOR(minePosIndex / w);
        //
        oGrids[y][x] = $._newMine(x, y, callback);
    }; // $._addNewMine

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {Function} callback - The function of the grid data owner
     * @returns {OMMine} The requested mine data
     * @since v1.0
     * @version v1.0
     */
    $._newMine = function(x, y, callback) {
        return new OMMine(OC_CLICKS, GRID, callback, x, y);
    }; // $._newMine

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = { newMines: $.newMines };
    //
    PUBLISH("FMNewMines", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMNewMines