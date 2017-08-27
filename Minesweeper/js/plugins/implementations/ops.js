/**
 * Implements the open ops counting features in OCGrids by adding a new event
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCGrids.prototype;
    var _PLUGIN = namespace.PLUGINS.OPS;
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
        // Added to reset the number of revealed ops
        $$$._resetRevealedOpsCount.call(this);
        //
    }; // $._initCaches

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $$._onChordUp = $._onChordUp;
    $._onChordUp = function(x, y) {
        // Added to ensure op opened by chords will also be counted
        $$$._onChordUp.call(this, x, y);
        //
        $$._onChordUp.call(this, x, y);
    }; // $._onChordUp

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._recordStat = $._recordStat;
    $._recordStat = function() {
        $$._recordStat.call(this);
        // Added to record the number of ops of the board with access violation
        this._PUBLISH("OCGrids _recordStat", ["ops", this._OM_GRIDS._ops]);
        //
    }; // $._recordStat

    /**
     * Hotspot
     * @author DoubleX
     * @interface
     * @param {Number/Nullable} x - The current grid col index
     * @param {Number/Nullable} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $$$.onRevealOps = function(x, y) {
        $$$._updateRevealedOpsCount.call(this);
    }; // $$$.onRevealOps
    $.onRevealOps = $$$.onRevealOps;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._resetRevealedOpsCount = function() { this._revealedOps = 0; };

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $$$._onChordUp = function(x, y) {
        if (!this._OM_GRIDS.hasNearbyNewOps(x, y)) return;
        $$$._updateRevealedOpsCount.call(this);
    }; // $$$._onChordUp

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._updateRevealedOpsCount = function() { this._revealedOps++; };

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the ops counting feature by hooking board generation in OMGrids
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.MODEL.OMGrids.prototype;
    var _PLUGIN = namespace.PLUGINS.OPS, _CFG = _PLUGIN.configuration;
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
        } while (!_CFG.isValidOps(w, h, mineNum, this._ops));
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
        } while (!_CFG.isValidOps(this._w, this._h, mineNum, this._ops));
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
        $$._startGenSpaces.call(this, callback);
        // Added to store the calculated ops right after generating spaces
        $$$._setOps.call(this);
        //
    }; // $._startGenSpaces

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number/Nullable} x - The current grid col index
     * @param {Number/Nullable} y - The current grid row index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._hasNearbyNewOps = function(x, y) {
        return this._nearGrids(x, y).some($$$._isInUnrevealedOps, this);
    }; // $$$._hasNearbyNewOps
    $.hasNearbyNewOps = $$$._hasNearbyNewOps;

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {OGrid} oGrid - An object storing all grid data
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isInUnrevealedOps = function(oGrid) {
        return !oGrid.isRevealed() && oGrid.isInOps();
    }; // $$$._isInUnrevealedOps

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._setOps = function() { this._ops = $$$._calculatedOps.call(this); };

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested ops count
     * @since v1.0
     * @version v1.0
     */
    $$$._calculatedOps = function() {
        var reachedGrids = $$$._emptyReachedGrids.call(this), ops = 0;
        for (var rowIndex = 0; rowIndex < this._h; rowIndex++) {
            for (var colIndex = 0; colIndex < this._w; colIndex++) {
                if ($$$._hasOps.call(this, rowIndex, colIndex, reachedGrids)) {
                    ops++;
                }
            }
        }
        return ops;
    }; // $$$._calculatedOps

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
     * @param {Array[Array[OGrid]]} reachedGrids - The list of list of reached
     *                                              grids
     * @returns {Array[OGrid]} The requested 1D list of reached grids
     * @since v1.0
     * @version v1.0
     */
    $$$._reachedGrids = function(rowIndex, colIndex, reachedGrids) {
        if (!$$$._isInNewOps.call(this, rowIndex, colIndex, reachedGrids)) {
            return [];
        }
        // Otherwise infinite recursion can come into play
        reachedGrids[rowIndex][colIndex] = true;
        //
        // Otherwise the current grid would be unnecessarily mapped
        return this._nearGrids(colIndex, rowIndex).map(
                $$$._reachedGridsFunc(reachedGrids), this).reduce(
                $$$._accumReachedGrids.bind(this), []).concat(
                [this._grids[rowIndex][colIndex]]);
        //
    }; // $$$._reachedGrids

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @param {Array[Array[OGrid]]} reachedGrids - The list of list of reached
     *                                              grids
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isInNewOps = function(rowIndex, colIndex, reachedGrids) {
        if (reachedGrids[rowIndex][colIndex]) return false;
        return this._grids[rowIndex][colIndex].isInOps();
    }; // $$$._isInNewOps

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Array[Array[OGrid]]} reachedGrids - The list of list of reached
     *                                              grids
     * @returns {Function(OGrid) => Array[Array[OGrid]]} The requested function
     * @since v1.0
     * @version v1.0
     */
    $$$._reachedGridsFunc = function(reachedGrids) {
        /**
         * Potential Hotspot/Nullipotent
         * @author DoubleX
         * @param {OGrid} oGrid - An object storing all grid data
         * @returns {Array[Array[OGrid]]} The requested list of lists of reached
         *                               grids
         * @since v1.0
         * @version v1.0
         */
        return function(oGrid) {
            /** @todo: Use another way instead of accessing private variables */
            return $$$._reachedGrids.call(
                    this, oGrid._Y, oGrid._X, reachedGrids);
            //
        };
    }; // $$$._reachedGridsFunc

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Array[OGrid]} accumReachedGrids - The accumulated grid list
     * @param {Array[OGrid]} reachedGrids - The list of reached grids
     * @returns {Array[OGrid]} The requested list of reached grids
     * @since v1.0
     * @version v1.0
     */
    $$$._accumReachedGrids = function(accumReachedGrids, reachedGrids) {
        return accumReachedGrids.concat(reachedGrids);
    }; // $$$._accumReachedGrids

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} rowIndex - The currently checked row index
     * @param {Number} colIndex - The currently check col index
     * @param {Array[Array[OGrid]]} reachedGrids - The list of lists of reached
     *                                              grids
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._hasOps = function(rowIndex, colIndex, reachedGrids) {
        return $$$._reachedGrids.call(
                this, rowIndex, colIndex, reachedGrids).length > 0;
    }; // $$$._hasOps

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Lets OMGrid judges whether it's in an ops
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.MODEL.OMGrid.prototype;
    var _PLUGIN = namespace.PLUGINS.OPS;
    _PLUGIN.OMGrid = { orig: {}, new: {} };
    var $$$ = _PLUGIN.OMGrid.new;

    /**
     * Potential hotspot/Pure function
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isInOps = function() { return false; };
    $.isInOps = $$$._isInOps;

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Lets OMSpace informs that it's in an ops
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _MODEL = namespace.OBJ.MODEL;
    var _PARENT = _MODEL.OMGrid.prototype, $ = _MODEL.OMSpace.prototype;
    var _PLUGIN = namespace.PLUGINS.OPS;
    _PLUGIN.OMSpace = { orig: {}, new: {} };
    var $$$ = _PLUGIN.OMSpace.new;

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._onLeftUp = function() {
        if ($$$._isRevealOps.call(this)) {
            this._CALLBACK("onRevealOps", $$$._onRevealOpsArgs.call(this));
        }
        _PARENT._onLeftUp.call(this);
    }; // $$$._onLeftUp
    $._onLeftUp = $$$._onLeftUp;

    /**
     * Potential hotspot/Pure function
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isInOps = function() { return true; };
    $.isInOps = $$$._isInOps;

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isRevealOps = function() {
        return this._canReveal() && !this._OC_CLICKS.isRightClicked();
    }; // $$$._isRevealOps

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $$$._onRevealOpsArgs = function() { return this._onEventBaseArgs(); };

})(DoubleX.PROJ.MINESWEEPER);