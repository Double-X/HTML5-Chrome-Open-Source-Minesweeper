/**
 * A prototype for creating objects that renders the timer view
 * Hotspot
 * @author DoubleX
 * @param {OVTimer} OVTimer - The function of this prototype
 * @since v1.0
 * @version v1.0
 */
(function(OVTimer) {

    "use strict";

    var _CLEAR_INTERVAL = window.clearInterval;
    var _SET_INTERVAL = window.setInterval;

    var $ = OVTimer.prototype;
    $.constructor = OVTimer;
    $._ELAPSED_SECS_CAP = 999.99, $._UPDATE_MS_INTERVAL = 10;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Dom} timer - The timer UI view placeholder
     * @param {Function} subscribe - Subscribes to a component
     * @param {Function} publish - Publishes itself to its subscribers
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(timer, subscribe, publish) {
        this._initReadOnlys(timer, publish);
        this._initCaches();
        this._subscribe(subscribe);
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {Dom} timer - The timer UI view placeholder
     * @param {Function} publish - Publishes itself to its subscribers
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(timer, publish) {
        this._TIMER = timer, this._PUBLISH = publish;
    }; // $._initReadOnlys

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function() { this._elapsedMs = 0; };

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} subscribe - Subscribes to a component
     * @since v1.0
     * @version v1.0
     */
    $._subscribe = function(subscribe) {
        subscribe("OCGrids _onPreRecordStat", this._onRecordStat.bind(this));
    }; // $._subscribe

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onStart = function() {
        this.onReset();
        this._onStart();
    }; // $.onStart

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onReset = function() {
        this.onStop();
        // This ordering must be preserved or the timer display won't be reset
        this._initCaches();
        this._updateTimerDisplay();
        //
    }; // $.onReset

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onStop = function() {
        if (this._onUpdateTimerId) _CLEAR_INTERVAL(this._onUpdateTimerId);
    }; // $.onStop

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onStart = function() {
        this._onUpdateTimerId = _SET_INTERVAL(
                this._onUpdateTimer.bind(this), this._UPDATE_MS_INTERVAL);
    }; // $._onStart

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onRecordStat = function() {
        this._PUBLISH(
                "OVTimer _onRecordStat", ["timerSecs", this._timerSecs()]);
    }; // $._onRecordStat

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onUpdateTimer = function() {
        this._updateElapsedTime();
        this._updateTimerDisplay();
    }; // $._onUpdateTimer

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._updateElapsedTime = function() {
        this._elapsedMs += this._UPDATE_MS_INTERVAL;
    }; // $._updateElapsedTime

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._updateTimerDisplay = function() {
        var formattedTimer = this._formattedTimer();
        // Ensures no redundant drawings could take place
        if (this._TIMER.textContent === formattedTimer) return;
        //
        this._TIMER.textContent = formattedTimer;
    }; // $._updateTimerDisplay

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {String} The requested formatted timer
     * @since v1.0
     * @version v1.0
     */
    $._formattedTimer = function() {
        // Converts the raw data in milliseconds to a formatted view in seconds
        return this._preTimer0s() + this._timerSecs() + this._postTimer0s();
        //
    }; // $._formattedTimer

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {String} The requested formatted timer starting 0s
     * @since v1.0
     * @version v1.0
     */
    $._preTimer0s = function() {
        return this._elapsedMs < 10000 ? "00" : 
                this._elapsedMs < 100000 ? "0" : "";
    }; // $._preTimer0s

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {String} The requested formatted timer in seconds
     * @since v1.0
     * @version v1.0
     */
    $._timerSecs = function() {
        return Math.min(this._elapsedMs / 1000, this._ELAPSED_SECS_CAP);
    }; // $._timerSecs

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {String} The requested formatted timer ending 0s
     * @since v1.0
     * @version v1.0
     */
    $._postTimer0s = function() {
        return this._elapsedMs % 1000 === 0 ? ".00" : 
                this._elapsedMs % 100 === 0 ? "0" : "";
    }; // $._postTimer0s

})(DoubleX.PROJ.MINESWEEPER.OBJ.VIEW.OVTimer);