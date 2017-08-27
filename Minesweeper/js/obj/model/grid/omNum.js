/**
 * A prototype for creating objects that stores all mine data
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {Function} Parent - The function of the parent prototype
 * @param {OMNum} OMNum - The function of this prototype
 * @since v1.0
 * @version v1.0
 */
(function(Parent, OMNum) {

    "use strict";

    var _PARENT = Parent.prototype;
    var $ = OMNum.prototype = Object.create(_PARENT);
    $.constructor = OMNum;
    $._IMG_REVEALED_PRE = "/grid/num/num", $._IMG_REVEALED_POST = ".png";

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {OCClicks} ocClicks - The object storing click statuses
     * @param {Function(Number, Number)} grid - Returns the grid of the given
     *                                           coordinates
     * @param {Function} callback - The function of grid data owner
     * @param {Number} x - Must be nonnegative and within w
     * @param {Number} y - Must be nonnegative and within h
     * @param {Number} num - The number of mines nearby this grid
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(ocClicks, grid, callback, x, y, num) {
        _PARENT.initialize.call(this, ocClicks, grid, callback, x, y);
        this._NUM =  num;
    }; // $.initialize

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @param {Number} nearFlagNum - The number of nearby flags
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.canChordReveal = function(nearFlagNum) {
        return this.isRevealed() && this._isNearFlagNumMatch(nearFlagNum);
    }; // $.canChordReveal

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {Number} nearFlagNum - The number of nearby flags
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isNearFlagNumMatch = function(nearFlagNum) {
        return this._NUM === nearFlagNum;
    }; // $._isNearFlagNumMatch

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {String} The requested event name for the grid owner
     * @since v1.0
     * @version v1.0
     */
    $._onclickUpEvent = function() { return "onHitNum"; };

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onclickUpArgs = function() {
        return _PARENT._onclickUpArgs.call(this).concat(
                [this._revealedImgPath(this._NUM)]);
    }; // $._onclickUpArgs

})(DoubleX.PROJ.MINESWEEPER.OBJ.MODEL.OMGrid, 
        DoubleX.PROJ.MINESWEEPER.OBJ.MODEL.OMNum);