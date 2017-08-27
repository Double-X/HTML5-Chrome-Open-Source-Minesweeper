/**
 * A prototype for creating objects that detects the mouse click status
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {OCClicks} OCClicks - The function of this prototype
 * @since v1.0
 * @version v1.0
 */
(function(OCClicks) {

    "use strict";

    var $ = OCClicks.prototype;
    $.constructor = OCClicks;
    $._MOUSE_EVENTS = {
        1: "_setIsLeftClicked", 2: "_setIsMidClicked", 3: "_setIsRightClicked"
    };

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Dom} board - The dom receiving raw input events
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(board) {
        this._initReadOnlys(board);
        this._initCaches();
        this._addEventListeners();
        this._attachListeners();
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {Dom} board - The dom receiving raw input events
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(board) { this._BOARD = board; };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function() {
        this._setIsLeftClicked(false);
        this._setIsMidClicked(false);
        this._setIsRightClicked(false);
    }; // $._initCaches

    /**
     * Idempotent
     * @author DoubleX
     * @param {Boolean} isLeftClicked - Whether the left mouse button's clicked
     * @since v1.0
     * @version v1.0
     */
    $._setIsLeftClicked = function(isLeftClicked) {
        this._isLeftClicked = isLeftClicked;
    }; // $._setIsLeftClicked

    /**
     * Idempotent
     * @author DoubleX
     * @param {Boolean} isMidClicked - Whether the mid mouse button's clicked
     * @since v1.0
     * @version v1.0
     */
    $._setIsMidClicked = function(isMidClicked) {
        this._isMidClicked = isMidClicked;
    }; // $._setIsMidClicked

    /**
     * Idempotent
     * @author DoubleX
     * @param {Boolean} isRightClicked - Whether the right mouse btn's clicked
     * @since v1.0
     * @version v1.0
     */
    $._setIsRightClicked = function(isRightClicked) {
        this._isRightClicked = isRightClicked;
    }; // $._setIsRightClicked

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isLeftClicked = function() { return this._isLeftClicked; };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isMidClicked = function() { return this._isMidClicked; };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isRightClicked = function() { return this._isRightClicked; };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._addEventListeners = function() { this._addEventListener("contextmenu"); };

    /**
     * Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._addEventListener = function(event) {
        this._BOARD.addEventListener(event, this["_" + event].bind(this));
    }; // $._addEventListener

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._attachListeners = function() {
        this._attachListener("onmousedown");
        this._attachListener("onmouseup");
    }; // $._attachListeners

    /**
     * Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._attachListener = function(event) {
        this._BOARD[event] = this["_" + event].bind(this);
    }; // $._attachListener

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._contextmenu = function(event) { event.preventDefault(); };

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onmousedown = function(event) {
        var which = event.which;
        if (this._isMouseMid(which)) event.preventDefault();
        this._setIsClicked(which, true);
    }; // $._onmousedown

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {Number} which - The raw event code
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isMouseMid = function(which) { return which === 2; };

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onmouseup = function(event) { this._setIsClicked(event.which, false); };

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} which - The raw event code
     * @param {Boolean} isClicked - Whether the given mouse button's clicked
     * @since v1.0
     * @version v1.0
     */
    $._setIsClicked = function(which, isClicked) {
        var event = this._MOUSE_EVENTS[which];
        if (event) this[event](isClicked);
    }; // $._setIsClicked

})(DoubleX.PROJ.MINESWEEPER.OBJ.CONTROLLER.OCClicks);