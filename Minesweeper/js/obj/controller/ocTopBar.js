/**
 * A prototype for creating objects that hosts the top section of the game board
 * Potential Hotspot/Idempotent
 * @author DoubleX
 * @param {OCTopBar} OCTopBar - The function of this prototype
 * @since v1.0
 * @version v1.0
 */
(function(OCTopBar) {

    "use strict";

    var $ = OCTopBar.prototype;
    $.constructor = OCTopBar;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Dom} topBar - The UI view of the game board top section
     * @param {Function} newGameBtn - The new game button UI view
     * @param {Function} onReset - The callback resetting the grids
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(topBar, newGameBtn, onReset) {
        this._initReadOnlys(topBar, newGameBtn, onReset);
        this._attachListeners();
        this._initCaches();
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {Dom} topBar - The UI view of the game board top section
     * @param {Function} newGameBtn - The new game button UI view
     * @param {Function()} onReset - The callback resetting the grids
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(topBar, newGameBtn, onReset) {
        this._TOP_BAR = topBar;
        this._NEW_GAME_BTN = newGameBtn;
        this._ON_RESET = onReset;
    }; // $._initReadOnlys

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._attachListeners = function() {
        this._attachListener("onmousedown");
        this._attachListener("onmouseleave");
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
        this._TOP_BAR[event] = this["_" + event].bind(this);
    }; // $._attachListener

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function() { this._setIsLeftClicked(false); };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Boolean} isLeftClicked - Whether the left mouse button's clicked
     * @since v1.0
     * @version v1.0
     */
    $._setIsLeftClicked = function(isLeftClicked) {
        this._isLeftClicked = isLeftClicked;
    }; // $._setIsLeftClicked

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isLeftClicked = function() { return this._isLeftClicked; };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onmousedown = function(event) {
        this._setIsLeftClicked(true);
        this._NEW_GAME_BTN.onHold();
    }; // $._onmousedown

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onmouseleave = function(event) {
        this._setIsLeftClicked(false);
        this._NEW_GAME_BTN.onUnhold();
    }; // $._onmouseleave

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onmouseup = function(event) {
        if (this.isLeftClicked()) this._onPostMouseup(event);
    }; // $._onmouseup

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onPostMouseup = function(event) {
        this._onmouseleave();
        this._onReset(event);
    }; // $._onPostMouseup

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onReset = function(event) {
        if (this._isMouseLeft(event.which)) this._ON_RESET();
    }; // $._onReset

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {Number} which - The raw event code
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isMouseLeft = function(which) { return which === 1; };

})(DoubleX.PROJ.MINESWEEPER.OBJ.CONTROLLER.OCTopBar);