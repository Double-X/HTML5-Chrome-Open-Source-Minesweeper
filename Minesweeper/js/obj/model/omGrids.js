/**
 * A prototype for creating objects that generates all grid data on the board
 * Hotspot
 * @author DoubleX
 * @param {Function} Parent - The function of the parent prototype
 * @param {MGrids} OMGrids - The function of this prototype
 * @since v1.0
 * @version v1.0
 */
(function(Parent, OMGrids) {

    "use strict";

    var FLOOR = Math.floor, RAND = Math.random;

    var PARENT = Parent.prototype;
    var $ = OMGrids.prototype = Object.create(PARENT);
    $.constructor = OMGrids;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Object[String, Function]} fNearGrids - The FNearGrids API
     *                                                 mapping
     * @param {Object[String, Function]} fAllOtherGrids - The FAllOtherGrids
     *                                                     API mapping
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Object[String, Function]} fmNewMines - The FMNewMines API
     *                                                 mapping
     * @param {Object[String, Function]} fmNewNums - The FMNewNums API mapping
     * @param {Object[String, Function]} fmNewSpaces - The FMNewSpaces API
     *                                                  mapping
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(fNearGrids, fAllOtherGrids, w, h, fmNewMines, 
            fmNewNums, fmNewSpaces) {
        // This ordering must be preserved as _resetGrids needs newMines
        this._FM_NEW_MINES = fmNewMines, this._FM_NEW_NUMS = fmNewNums;
        this._FM_NEW_SPACES = fmNewSpaces;
        PARENT.initialize.call(this, fNearGrids, fAllOtherGrids, w, h);
        //
    }; // $.initialize

    /**
     * Subclasses must call their parents before overriding this function
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Function} callback - The function of grids data owner
     * @since v1.0
     * @version v1.0
     */
    $.onResize = function(w, h, mineNum, callback) {
        PARENT.onResize.call(this, w, h);
        this._startGenGrids(
                mineNum, FLOOR(RAND(this._w)), FLOOR(RAND(this._h)), callback);
    }; // $.onResize

    /**
     * Subclasses must call their parents before overriding this function
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Function} callback - The function of grids data owner
     * @param {Number/Nullable} sx - The x coor of the starting click
     * @param {Number/Nullable} sy - The y coor of the starting click
     * @since v1.0
     * @version v1.0
     */
    $.onReset = function(mineNum, callback, sx, sy) {
        PARENT.onReset.call(this);
        this._resetGrids(this._w, this._h);
        this._startGenGrids(mineNum, sx || FLOOR(RAND(this._w)), 
                sy || FLOOR(RAND(this._h)), callback);
    }; // $.onReset

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @returns {Number} The requested number
     * @since v1.0
     * @version v1.0
     */
    $.nearFlagNum = function(x, y) {
        return this._nearGrids(x, y).filter(this._isFlagged).length;
    }; // $.nearFlagNum

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Number} The requested number
     * @since v1.0
     * @version v1.0
     */
    $.revealedGridNum = function() {
        return this._grids.reduce(this._accumRevealedGridNum.bind(this), 0);
    }; // $.revealedGridNum

    /**
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Number} sx - The x coor of the starting click
     * @param {Number} sy - The y coor of the starting click
     * @param {Function} callback - The function of grids data owner
     * @since v1.0
     * @version v1.0
     */
    $._startGenGrids = function(mineNum, sx, sy, callback) {
        // It's the only ordering that makes sense
        this._startGenMines(mineNum, sx, sy, callback);
        this._startGenNums(callback);
        this._startGenSpaces(callback);
        //
    }; // $._startGenGrids

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} accumNum - The previously accumulated number
     * @param {Array[OGrid]} row - The list of grid data
     * @returns {Number} The requested number
     * @since v1.0
     * @version v1.0
     */
    $._accumRevealedGridNum = function(accumNum, row) {
        return accumNum + row.filter(this._isRevealed).length;
    }; // $._accumRevealedGridNum

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {MGrid} grid - An object storing all grid data
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isFlagged = function(grid) { return grid.isFlagged(); };

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {MGrid} grid - An object storing all grid data
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isRevealed = function(grid) { return grid.isRevealed(); };

    /**
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Number} sx - The x coor of the starting click
     * @param {Number} sy - The y coor of the starting click
     * @param {Function} callback - The function of grids data owner
     * @since v1.0
     * @version v1.0
     */
    $._startGenMines = function(mineNum, sx, sy, callback) {
        // Mines should be generated before generating anything else
        this._grids = this._FM_NEW_MINES.newMines(
                this._grids, this._w, mineNum, sx, sy, callback);
        //
    }; // $._startGenMines

    /**
     * Potential Hotspot
     * @author DoubleX
     * @param {Function} callback - The function of the grid data owner
     * @since v1.0
     * @version v1.0
     */
    $._startGenNums = function(callback) {
        // Only mines should be generated before generating numbers
        this._grids = this._FM_NEW_NUMS.newNums(this._grids, callback);
        //
    }; // $._startGenNums

    /**
     * Potential Hotspot
     * Idempotent
     * @author DoubleX
     * @param {Function} callback - The function of the grid data owner
     * @since v1.0
     * @version v1.0
     */
    $._startGenSpaces = function(callback) {
        // Spaces should be generated after having everything else generated
        this._grids = this._FM_NEW_SPACES.newSpaces(this._grids, callback);
        //
    }; // $._startGenSpaces

})(DoubleX.PROJ.MINESWEEPER.OBJ.OGrids, 
        DoubleX.PROJ.MINESWEEPER.OBJ.MODEL.OMGrids);