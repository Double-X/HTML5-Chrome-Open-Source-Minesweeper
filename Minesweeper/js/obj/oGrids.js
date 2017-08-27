/**
 * A prototype for creating objects that generates all grids on the board
 * Hotspot
 * @abstract
 * @author DoubleX
 * @param {OGrids} OGrids - The function of this prototype
 * @since v1.0
 * @version v1.0
 */
(function(OGrids) {

    "use strict";

    var $ = OGrids.prototype;
    $.constructor = OGrids;

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
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(fNearGrids, fAllOtherGrids, w, h) {
        this._initReadOnlys(fNearGrids, fAllOtherGrids);
        this._initCaches(w, h);
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object[String, Function]} fNearGrids - The FNearGrids API
     *                                                 mapping
     * @param {Object[String, Function]} fAllOtherGrids - The FAllOtherGrids
     *                                                     API mapping
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(fNearGrids, fAllOtherGrids) {
        this._F_NEAR_GRIDS = fNearGrids;
        this._F_ALL_OTHER_GRIDS = fAllOtherGrids;
    }; // $._initReadOnlys

    /**
     * Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function(w, h) { this._resetGrids(w, h); };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @since v1.0
     * @version v1.0
     */
    $._resetGrids = function(w, h) {
        /** @todo: Fixes the memory leak caused by the old grids */
        this._w = w; this._h = h;
        this._grids = [];
        for (var rowIndex = 0; rowIndex < this._h; rowIndex++) {
            this._grids.push(this._resetRowGrids());
        };
        //
    }; // $._resetGrids

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @returns {Array[OGrid]} The requested reset row grids
     * @since v1.0
     * @version v1.0
     */
    $._resetRowGrids = function() {
        var row = [];
        // It's to ensure the array's not sparse and its length's correct
        for (var colIndex = 0; colIndex < this._w; colIndex++) {
            row.push(undefined);
        }
        //
        return row;
    }; // $._resetRowGrids

    /**
     * Subclasses must call their parents before overriding this function
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @since v1.0
     * @version v1.0
     */
    $.onResize = function(w, h) { this._resetGrids(w, h); };

    /**
     * Subclasses must call their parents before overriding this function
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onReset = function() { this._resetGrids(this._w, this._h); };

    /**
     * Hotspot
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} event - The function name handling the event
     * @param {Array} args - The arguments of the event to be handled
     * @returns {Nullable} The requested result
     * @since v1.0
     * @version v1.0
     */
    $.onEvent = function(x, y, event, args) {
        return this._onEvent(event, args)(this._grids[y][x]);
    }; // $.onEvent

    /**
     * Hotspot
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} event - The function name handling the event
     * @param {Array} args - The arguments of the event to be handled
     * @since v1.0
     * @version v1.0
     */
    $.onNearEvent = function(x, y, event, args) {
        this._nearGrids(x, y).forEach(this._onEvent(event, args), this);
    }; //  $._onNearEvent

    /**
     * Potential Hotspot
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} event - The function name handling the event
     * @param {Array} args - The arguments of the event to be handled
     * @since v1.0
     * @version v1.0
     */
    $.onAllOtherEvent = function(x, y, event, args) {
        this._allOtherGrids(x, y).forEach(this._onEvent(event, args), this);
    }; //  $._onAllOtherEvent

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @returns {Array} The requested list of grids
     * @since v1.0
     * @version v1.0
     */
    $._nearGrids = function(x, y) {
        return this._F_NEAR_GRIDS.nearGrids(
                x, y, this._w, this._h, this._grids);
    }; //  $._nearGrids

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @returns {Array} The requested list of grids
     * @since v1.0
     * @version v1.0
     */
    $._allOtherGrids = function(x, y) {
        return this._F_ALL_OTHER_GRIDS.allOtherGrids(x, y, this._grids);
    }; //  $._allOtherGrids

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {String} event - The function name handling the event
     * @param {Array} args - The arguments of the event to be handled
     * @returns {Function(OGrid) => Nullable} The requested function
     * @since v1.0
     * @version v1.0
     */
    $._onEvent = function(event, args) {
        /**
         * Hotspot
         * @author DoubleX
         * @param {OGrid} oGrid - An object storing all grid contents
         * @returns {Nullable} The requested result
         * @since v1.0
         * @version v1.0
         */
        return function(oGrid) { return oGrid[event].apply(oGrid, args); };
    }; // $._onEvent

})(DoubleX.PROJ.MINESWEEPER.OBJ.OGrids);