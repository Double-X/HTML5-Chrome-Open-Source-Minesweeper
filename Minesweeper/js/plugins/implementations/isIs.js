/**
 * Implements the solved isis counting features in OCGrids
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCGrids.prototype;
    var _PLUGIN = namespace.PLUGINS.ISIS;
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
        // Added to reset the number of correct clicks
        $$$._resetSolvedIsIsNum.call(this);
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
        $$.onHitNum.call(this, x, y, img);
        $$$._onUpdateSolvedIsIsNum.call(this, x, y);
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
        // Added to record the number of isIs of the board with access violation
        this._PUBLISH("OCGrids _recordStat", ["isIs", this._OM_GRIDS._isIs]);
        //
    }; // $._recordStat

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._resetSolvedIsIsNum = function() { this._solvedIsIsNum = 0; };

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $$$._onUpdateSolvedIsIsNum = function(x, y) {
        if (!this._OM_GRIDS.isItsIsIsSolved(y, x)) return;
        $$$._updateSolvedIsIsNum.call(this);
    }; // $$$._onUpdateSolvedIsIsNum

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._updateSolvedIsIsNum = function() { this._solvedIsIsNum++; };

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the isIs counting feature by hooking board generation in OMGrids
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.MODEL.OMGrids.prototype;
    var _PLUGIN = namespace.PLUGINS.ISIS, _CFG = _PLUGIN.configuration;
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
        } while (!_CFG.isValidIsIs(w, h, mineNum, this._isIs));
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
        } while (!_CFG.isValidIsIs(this._w, this._h, mineNum, this._isIs));
        //
    }; // $.onReset

    /**
     * Potential Hotspot
     * @author DoubleX
     * @param {Function} callback - The function of grids data owner
     * @since v1.0
     * @version v1.0
     */
    $$._startGenSpaces = $._startGenSpaces;
    $._startGenSpaces = function(callback) {
        // Added to store the calculated isIs right before generating spaces
        $$$._setIsIs.call(this);
        //
        $$._startGenSpaces.call(this, callback);
    }; // $._startGenSpaces

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$.isItsIsIsSolved = function(rowIndex, colIndex) {
        return $$$._isInIsIs.call(this, rowIndex, colIndex) && 
                $$$._isItsIsIsRevealed.call(this, rowIndex, colIndex);
    }; // $$$.isItsIsIsSolved
    $.isItsIsIsSolved = $$$.isItsIsIsSolved;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @returns {Number} The requested isIs count
     * @since v1.0
     * @version v1.0
     */
    $$$._setIsIs = function() {
        /** @todo: Separates this function into 2 all conforming to SRP */
        this._isIsMap = $$$._emptyReachedGrids.call(this), this._isIs = 0;
        for (var rowIndex = 0; rowIndex < this._h; rowIndex++) {
            for (var colIndex = 0; colIndex < this._w; colIndex++) {
                if ($$$._hasIsIs.call(this, rowIndex, colIndex)) this._isIs++;
            }
        }
        //
    }; // $$$._setIsIs

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @returns {Array[OGrid]} The requested 1D list of reached grids
     * @since v1.0
     * @version v1.0
     */
    $$$._reachedGrids = function(rowIndex, colIndex) {
        if (!$$$._isInNewIsIs.call(this, rowIndex, colIndex)) return [];
        // Otherwise infinite recursion can come into play
        this._isIsMap[rowIndex][colIndex] = true;
        //
        // Otherwise the current grid would be unnecessarily mapped
        return this._nearGrids(colIndex, rowIndex).map($$$._reachedGrid, this).
                reduce($$$._accumReachedGrids.bind(this), []).concat(
                [this._grids[rowIndex][colIndex]]);
        //
    }; // $$$._reachedGrids

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isInNewIsIs = function(rowIndex, colIndex) {
        if ($$$._isInIsIs.call(this, rowIndex, colIndex)) return false;
        if ($$$._hasNearEmpty.call(this, rowIndex, colIndex)) return false;
        var oGrid = this._grids[rowIndex][colIndex];
        return oGrid && oGrid.canBeInIsIs();
    }; // $$$._isInNewIsIs

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
     * @param {OGrid/Nullable} oGrid - An object storing all grid data
     * @returns {Array[Array[OGrid]]} The requested list of list of reached
     *                                     grids
     * @since v1.0
     * @version v1.0
     */
    $$$._reachedGrid = function(oGrid) {
        /** @todo: Use another way instead of accessing private variables */
        return oGrid ? $$$._reachedGrids.call(this, oGrid._Y, oGrid._X) : [];
        //
    }; // $$$._reachedGrid

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._hasIsIs = function(rowIndex, colIndex) {
        return $$$._reachedGrids.call(this, rowIndex, colIndex).length > 0;
    }; // $$$._hasIsIs

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isItsIsIsRevealed = function(rowIndex, colIndex) {
        return $$$._itsIsIs.call(this, rowIndex, colIndex).every(
                this._isRevealed, this);
    }; // $$$._isItsIsIsRevealed

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @returns {Array[OGrid]} The requested list of grid in the same IsIs
     * @since v1.0
     * @version v1.0
     */
    $$$._itsIsIs = function(rowIndex, colIndex) {
        // Otherwise infinite recursion can come into play
        this._reachedIsIsGrids = $$$._emptyReachedGrids.call(this);
        var itsIsIs = $$$._collectedIsIsGrids.call(this, rowIndex, colIndex);
        this._reachedIsIsGrids = $$$._emptyReachedGrids.call(this);
        return itsIsIs;
        //
    }; // $$$._itsIsIs

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Array[Array[OGrid]]} The requested list of list of reached grids
     * @since v1.0
     * @version v1.0
     */
    $$$._emptyReachedGrids = function() {
        var reachedGrids = [];
        for (var rowIndex = 0; rowIndex < this._h; rowIndex++) {
            var reachedRow = [];
            for (var colIndex = 0; colIndex < this._w; colIndex++) {
                reachedRow.push(undefined);
            }
            reachedGrids.push(reachedRow);
        }
        return reachedGrids;
    }; // $$$._emptyReachedGrids

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @returns {Array[OGrid]} The requested list of grid in the same IsIs
     * @since v1.0
     * @version v1.0
     */
    $$$._collectedIsIsGrids = function(rowIndex, colIndex) {
        if (!$$$._isInIsIs.call(this, rowIndex, colIndex)) return [];
        // Otherwise infinite recursion can come into play
        if (this._reachedIsIsGrids[rowIndex][colIndex]) return [];
        this._reachedIsIsGrids[rowIndex][colIndex] = true;
        //
        // Otherwise the current grid would be unnecessarily mapped
        return this._nearGrids(colIndex, rowIndex).map($$$._collectedIsIsGrid, 
                this).reduce($$$._accumReachedGrids.bind(this), []).concat(
                [this._grids[rowIndex][colIndex]]);
        //
    }; // $$$._collectedIsIsGrids

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isInIsIs = function(rowIndex, colIndex) {
        return this._isIsMap[rowIndex][colIndex];
    }; // $$$._isInIsIs

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {OGrid} oGrid - An object storing all grid data
     * @returns {Array[OGrid]} The requested list of grid in the same IsIs
     * @since v1.0
     * @version v1.0
     */
    $$$._collectedIsIsGrid = function(oGrid) {
        /** @todo: Use another way instead of accessing private variables */
        return $$$._collectedIsIsGrids.call(this, oGrid._Y, oGrid._X);
        //
    }; // $$$._collectedIsIsGrid

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Array[OGrid]} accumReachedGrids - The accumulated grid list
     * @param {Array[OGrid]} reachedGrids - The list of reached grids
     * @returns {Array[Array[OGrid]]} Requested list of list of reached grids
     * @since v1.0
     * @version v1.0
     */
    $$$._accumReachedGrids = function(accumReachedGrids, reachedGrids) {
        return accumReachedGrids.concat(reachedGrids);
    }; // $$$._accumReachedGrids

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Lets OMGrid judges whether it can be in an isIs
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.MODEL.OMGrid.prototype;
    var _PLUGIN = namespace.PLUGINS.ISIS;
    _PLUGIN.OMGrid = { orig: {}, new: {} };
    var $$$ = _PLUGIN.OMGrid.new;

    /**
     * Potential hotspot/Pure function
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._canBeInIsIs = function() { return false; };
    $.canBeInIsIs = $$$._canBeInIsIs;

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Lets OMNum informs that it can be in an isIs
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _MODEL = namespace.OBJ.MODEL, $ = _MODEL.OMNum.prototype;
    var _PLUGIN = namespace.PLUGINS.ISIS;
    _PLUGIN.OMNum = { orig: {}, new: {} };
    var $$$ = _PLUGIN.OMNum.new;

    /**
     * Potential hotspot/Pure function
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._canBeInIsIs = function() { return true; };
    $.canBeInIsIs = $$$._canBeInIsIs;

})(DoubleX.PROJ.MINESWEEPER);