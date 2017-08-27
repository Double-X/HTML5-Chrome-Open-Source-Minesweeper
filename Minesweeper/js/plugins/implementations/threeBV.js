/**
 * Implements the clicked 3BV counting features in OCGrids
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCGrids.prototype;
    var _PLUGIN = namespace.PLUGINS.THREE_BV;
    var _OC_GRIDS = _PLUGIN.OCGrids = { orig: {}, new: {} };
    var $$ = _OC_GRIDS.orig, $$$ = _OC_GRIDS.new;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @since v1.0
     * @version v1.0
     */
    $$._initCaches = $._initCaches;
    $._initCaches = function(w, h, mineNum) {
        $$._initCaches.call(this, w, h, mineNum);
        // Added to reset the number of revealed 3BV
        $$$._resetClickedThreeBVCount.call(this);
        //
    }; // $._initCaches

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} img - The path for the img to be displayed
     * @since v1.0
     * @version v1.0
     */
    $$.onHitNum = $.onHitNum;
    $.onHitNum = function(x, y, img) {
        // This ordering must be preserved or the last 3BV click will be missed
        $$$._onHitNum.call(this, x, y);
        $$.onHitNum.call(this, x, y, img);
    }; // $.onHitNum

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._recordStat = $._recordStat;
    $._recordStat = function() {
        $$._recordStat.call(this);
        // Added to record the number of 3BV of the board with access violation
        this._PUBLISH(
                "OCGrids _recordStat", ["threeBV", this._OM_GRIDS._threeBV]);
        //
    }; // $._recordStat

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._resetClickedThreeBVCount = function() { this._clickedThreeBV = 0; };

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $$$._onHitNum = function(x, y) {
        if (!$$$._canUpdateRevealedThreeBVCount.call(this, x, y)) return;
        $$$._updateRevealedThreeBVCount.call(this);
    }; // $$$._onHitNum

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._canUpdateRevealedThreeBVCount = function(x, y) {
        return !this.isEnded() && this._OM_GRIDS.isThreeBV(x, y);
    }; // $$$._canUpdateRevealedThreeBVCount

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._updateRevealedThreeBVCount = function() { this._clickedThreeBV++; };

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the 3BV marking feature by hooking the board generation in OMGrids
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.MODEL.OMGrids.prototype;
    var _PLUGIN = namespace.PLUGINS.THREE_BV, _CFG = _PLUGIN.configuration;
    var _OM_GRIDS = _PLUGIN.OMGrids = { orig: {}, new: {} };
    var $$ = _OM_GRIDS.orig, $$$ = _OM_GRIDS.new;

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
    $$.onResize = $.onResize;
    $.onResize = function(w, h, mineNum, callback) {
        // Edited to ensure the generated board has a valid 3BV count
        do {
            $$.onResize.call(this, w, h, mineNum, callback);
        } while (!_CFG.isValidThreeBV(w, h, mineNum, this._threeBV));
        //
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
    $$.onReset = $.onReset;
    $.onReset = function(mineNum, callback, sx, sy) {
        // Edited to ensure the generated board has a valid 3BV count
        do {
            $$.onReset.call(this, mineNum, callback, sx, sy);
        } while (!_CFG.isValidThreeBV(
                this._w, this._h, mineNum, this._threeBV));
        //
    }; // $.onReset

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
    $$._startGenMines = $._startGenMines;
    $._startGenMines = function(mineNum, sx, sy, callback) {
        $$._startGenMines.call(this, mineNum, sx, sy, callback);
        // Added to mark the number of mines
        $$$._markMineNum.call(this, mineNum);
        //
    }; // $._startGenMines

    /**
     * Potential Hotspot
     * @author DoubleX
     * @param {Function} callback - The function of grids data owner
     * @since v1.0
     * @version v1.0
     */
    $$._startGenSpaces = $._startGenSpaces;
    $._startGenSpaces = function(callback) {
        // Added to store the 3BV table right before generating spaces
        $$$._markThreeBVs.call(this);
        //
        $$._startGenSpaces.call(this, callback);
        // Added to store the 3BV count right after generating spaces
        $$$._markThreeBV.call(this);
        //
    }; // $._startGenSpaces

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$.isThreeBV = function(x, y) { return this._threeBVs[y][x]; };
    $.isThreeBV = $$$.isThreeBV;

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Number} The requested mine number
     * @since v1.0
     * @version v1.0
     */
    $$$.mineNum = function() { return this._mineNum; };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} mineNum - The number of mines in the grids
     * @since v1.0
     * @version v1.0
     */
    $$$._markMineNum = function(mineNum) { this._mineNum = mineNum; };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._markThreeBVs = function() {
        // Mines are incaluded but 3BVs overlapping with ops aren't
        this._threeBVs = $$$._markedThreeBVs.call(this);
        //
    }; // $$$._markThreeBVs

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Array[Array[Boolean]]} The requested marked 3BV table
     * @since v1.0
     * @version v1.0
     */
    $$$._markedThreeBVs = function() {
        var threeBVs = $$$._emptyThreeBVs.call(this);
        for (var rowIndex = 0; rowIndex < this._h; rowIndex++) {
            for (var colIndex = 0; colIndex < this._w; colIndex++) {
                threeBVs[rowIndex][colIndex] = $$$._isThreeBV.call(
                        this, rowIndex, colIndex);
            }
        }
        return threeBVs;
    }; // $$$._markedThreeBVs

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Array[Array[OGrid]]} The requested list of list of reached
     *                                     grids
     * @since v1.0
     * @version v1.0
     */
    $$$._emptyThreeBVs = function() {
        var emptyThreeBVs = [];
        for (var rowIndex = 0; rowIndex < this._h; rowIndex++) {
            var emptyThreeBVRow = [];
            for (var colIndex = 0; colIndex < this._w; colIndex++) {
                emptyThreeBVRow.push(undefined);
            }
            emptyThreeBVs.push(emptyThreeBVRow);
        }
        return emptyThreeBVs;
    }; // $$$._emptyThreeBVs

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isThreeBV = function(rowIndex, colIndex) {
        // Mines are incaluded but 3BVs overlapping with ops aren't
        return this._grids[rowIndex][colIndex] && 
                !$$$._hasNearEmpty.call(this, rowIndex, colIndex);
        //
    }; // $$$._isThreeBV

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._hasNearEmpty = function(rowIndex, colIndex) {
        // Passing this's just to play safe
        return this._nearGrids(colIndex, rowIndex).filter($$$._isEmpty, this).
                length > 0;
        //
    }; // $$$._hasNearEmpty

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {OGrid} oGrid - An object storing all grid data
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isEmpty = function(oGrid) { return !oGrid; };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._markThreeBV = function() {
        this._threeBV = $$$._calculatedThreeBV.call(this);
    }; // $$$._markThreeBV

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested 3BV count
     * @since v1.0
     * @version v1.0
     */
    $$$._calculatedThreeBV = function() {
        return $$$._markedThreeBVCount.call(this) - $$$.mineNum.call(this);
    }; // $$$._calculatedThreeBV

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested 3BV count
     * @since v1.0
     * @version v1.0
     */
    $$$._markedThreeBVCount = function() {
        // Passing this's just to play safe
        return this._threeBVs.reduce($$$._accumGrids.bind(this), []).filter(
                $$$._isNotEmpty, this).length;
        //
    }; // $$$._markedThreeBVCount

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Array[OGrid]} accumGrids - The accumulated reached grid list
     * @param {Array[OGrid]} grids - The list of grids
     * @returns {Array[OGrid]} The requested list of reached grids
     * @since v1.0
     * @version v1.0
     */
    $$$._accumGrids = function(accumGrids, grids) {
        return accumGrids.concat(grids);
    }; // $$$._accumGrids

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {OGrid} oGrid - An object storing all grid data
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isNotEmpty = function(oGrid) { return oGrid; };

})(DoubleX.PROJ.MINESWEEPER);