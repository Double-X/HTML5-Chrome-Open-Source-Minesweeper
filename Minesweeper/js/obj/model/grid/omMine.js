/**
 * A prototype for creating objects that stores all mine data
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {Function} Parent - The function of the parent prototype
 * @param {OMMine} OMMine - The function of this prototype
 * @since v1.0
 * @version v1.0
 */
(function(Parent, OMMine) {

    "use strict";

    var PARENT = Parent.prototype;
    var $ = OMMine.prototype = Object.create(PARENT);
    $.constructor = OMMine;
    $._IMG_REVEALED_PRE = "/grid/mine/", $._IMG_REVEALED_POST = "Mine.png";
    $._IMG_HIT = "hit", $._IMG_REVEALED = "revealed";

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onForceReveal = function() {
        if (this._canForceReveal()) this._onForceReveal();
    }; // $.onForceReveal

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {String} The requested event name for the grid owner
     * @since v1.0
     * @version v1.0
     */
    $._onclickUpEvent = function() { return "onHitMine"; };

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onclickUpArgs = function() {
        return PARENT._onclickUpArgs.call(this).concat(
                [this._revealedImgPath(this._IMG_HIT)]);
    }; // $._onclickUpArgs

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._canForceReveal = function() {
        return !this.isRevealed() && !this.isFlagged();
    }; // $._canForceReveal

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onForceReveal = function() {
        this._setIsRevealed(true);
        this._CALLBACK(this._onForceRevealEvent(), this._onForceRevealArgs());
    }; // $._onForceReveal

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {String} The requested event name for the grid owner
     * @since v1.0
     * @version v1.0
     */
    $._onForceRevealEvent = function() { return "onRevealMine"; };

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onForceRevealArgs = function() {
        return this._onEventBaseArgs().concat(
                [this._revealedImgPath(this._IMG_REVEALED)]);
    }; // $._onForceRevealArgs

})(DoubleX.PROJ.MINESWEEPER.OBJ.MODEL.OMGrid, 
        DoubleX.PROJ.MINESWEEPER.OBJ.MODEL.OMMine);