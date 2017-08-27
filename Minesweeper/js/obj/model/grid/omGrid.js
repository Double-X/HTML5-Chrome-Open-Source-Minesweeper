/**
 * A prototype for creating objects that stores all grid data
 * Hotspot
 * @abstract
 * @author DoubleX
 * @param {OMGrid} OMGrid - The function of this prototype
 * @since v1.0
 * @todo Split this class with 2 responsibilities into 2 with 1 each
 * @version v1.0
 */
(function(OMGrid) {

    "use strict";

    var $ = OMGrid.prototype;
    $.constructor = OMGrid;
    $._CLICK_DOWN_EVENTS = {
        1: "_onLeftHold", 2: "_onMidHold", 3: "_onRightDown"
    };
    $._CLICK_HOLD_EVENTS = {
        1: "_onLeftHold", 2: "_onMidHold", 3: "_onRightHold"
    };
    $._CLICK_UNHOLD_EVENTS = {
        1: "_onLeftUnhold", 2: "_onMidUnhold", 3: "_onRightUnhold"
    };
    $._CLICK_UP_EVENTS = { 1: "_onLeftUp", 2: "_onMidUp", 3: "_onRightUp" };
    $._MSG_ON_CLICK_UP_EVENT_NOT_IMPL = 
            "OMGrid.prototype._onclickUpEvent isn't implemented!";
    $._IMG_PRE = "/grid/unrevealed/unrevealed", $._IMG_POST = ".png";
    $._IMG_HELD = "Held", $._IMG_UNHELD = "Unheld";
    $._IMG_WRONG_FLAG = "WrongFlag", $._IMG_FLAG = "Flag";
    $._IMG_QUESTION_MARK = "QuestionMark";
    // Null objects to be overriden by subclasses
    $._IMG_REVEALED_PRE = $._IMG_REVEALED_POST = "";
    //
    $._FLAG_STATUSES = [$._IMG_UNHELD, $._IMG_FLAG, $._IMG_QUESTION_MARK];
    $._FLAG_STATUSES_NUM = $._FLAG_STATUSES.length;
    $._FLAG_EVENTS = {};
    $._FLAG_EVENTS[$._IMG_UNHELD] = "onclickHold";
    $._FLAG_EVENTS[$._IMG_FLAG] = "onFlag";
    $._FLAG_EVENTS[$._IMG_QUESTION_MARK] = "onUnflag";

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
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(ocClicks, grid, callback, x, y) {
        this._initReadOnlys(ocClicks, callback, x, y);
        this._initCaches();
        this._attachListeners(grid(x, y));
        // Notifys its owner of its initial state upon finishing initialization
        this._CALLBACK("onclickUnhold", this._onclickUnholdArgs());
        //
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {OCClicks} ocClicks - The object storing click statuses
     * @param {Function} callback - The function of grids data owner
     * @param {Number} x - Must be nonnegative and within w
     * @param {Number} y - Must be nonnegative and within h
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(ocClicks, callback, x, y) {
        this._OC_CLICKS = ocClicks, this._CALLBACK = callback;
        this._X = x, this._Y = y;
    }; // $._initReadOnlys

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function() {
        this._setIsRevealed(false);
        this._setFlagStatusIndex(0);
    }; // $._initCaches

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Boolean} isRevealed - Whether this grid's revealed
     * @since v1.0
     * @version v1.0
     */
    $._setIsRevealed = function(isRevealed) { this._isRevealed = isRevealed; };

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} flagStatusIndex - The _FLAG_STATUSES index
     * @since v1.0
     * @version v1.0
     */
    $._setFlagStatusIndex = function(flagStatusIndex) {
        this._flagStatusIndex = flagStatusIndex;
    }; // $._setFlagStatusIndex

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @param {Number} nearFlagNum - The number of nearby flags
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.canChordReveal = function(nearFlagNum) { return false; };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isRevealed = function() {return this._isRevealed; };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isFlagged = function() { return this._flagStatus() === this._IMG_FLAG; };

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onclickHold = function() { if (this._canReveal()) this._onclickHold(); };

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onclickUnhold = function() {
        if (this._canReveal()) this._onclickUnhold();
    }; // $.onclickUnhold

    /**
     * Potential Hotspot/Idempotent
     * @abstract
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onForceReveal = function() {
        if (this.isFlagged()) this._onForceReveal();
    }; // $.onForceReveal

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onReveal = function() { if (this._canReveal()) this._onReveal(); };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._canReveal = function() {
        return !this.isRevealed() &&  !this.isFlagged() && 
                !this._isQuestionMark();
    }; // $._canReveal

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isQuestionMark = function() {
        return this._flagStatus() === this._IMG_QUESTION_MARK;
    }; // $._isQuestionMark

    /**
     * Idempotent
     * @author DoubleX
     * @param {Dom} grid - The dom UI representing this grid
     * @since v1.0
     * @version v1.0
     */
    $._attachListeners = function(grid) {
        this._attachListener(grid, "onmousedown");
        this._attachListener(grid, "onmouseenter");
        this._attachListener(grid, "onmouseleave");
        this._attachListener(grid, "onmouseup");
    }; // $._attachListeners

    /**
     * Idempotent
     * @author DoubleX
     * @param {Dom} grid - The grid receiving raw input events
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._attachListener = function(grid, event) {
        grid[event] = this["_" + event].bind(this);
    }; // $._attachListener

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onmousedown = function(event) {
        this._onclick(event.which, this._CLICK_DOWN_EVENTS);
    }; // $._onmousedown

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onmouseenter = function(event) {
        this._onclick(event.which, this._CLICK_HOLD_EVENTS);
    }; // $._onmouseenter

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onmouseleave = function(event) {
        this._onclick(event.which, this._CLICK_UNHOLD_EVENTS);
    }; // $._onmouseleave

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event/Nullable} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onmouseup = function(event) {
        this._onclick(event.which, this._CLICK_UP_EVENTS);
    }; // $._onmouseup

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} which - The raw event code
     * @param {Object[String, String]} events - The mapping from event codes to
     *                                           handlers
     * @since v1.0
     * @version v1.0
     */
    $._onclick = function(which, events) {
        var event = events[which];
        if (event) this[event]();
    }; // $._onclick

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onRightDown = function() {
        this._OC_CLICKS.isLeftClicked() ? this._onChordHold() : this._onFlag();
    }; // $._onRightDown

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onLeftHold = function() {
        if (this._OC_CLICKS.isRightClicked()) return this._onChordHold();
        this.onclickHold();
    }; // $._onLeftHold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onMidHold = function() {
        if (!this._OC_CLICKS.isLeftClicked()) this._onPostMidHold();
    }; // $._onMidHold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onPostMidHold = function() {
        this._OC_CLICKS.isRightClicked() ? this._onFlag() : this._onChordHold();
    }; // $._onPostMidHold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onRightHold = function() {
        if (this._OC_CLICKS.isLeftClicked()) this._onChordHold();
    }; // $._onRightHold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onFlag = function() { if (!this.isRevealed()) this._onPostFlag(); };

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onPostFlag = function() {
        this._updateFlagStatus();
        this._CALLBACK(this._onFlagEvent(), this._onFlagArgs());
    }; // $._onPostFlag

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._updateFlagStatus = function() {
        this._flagStatusIndex++;
        this._flagStatusIndex %= this._FLAG_STATUSES_NUM;
    }; // $._updateFlagStatus

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onChordHold = function() {
        this._CALLBACK("onChordHold", this._onChordHoldArgs());
    }; // $._onChordHold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onLeftUnhold = function() {
        if (this._OC_CLICKS.isRightClicked()) return this._onMidUnhold();
        this.onclickUnhold();
    }; // $._onLeftUnhold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onRightUnhold = function() {
        if (this._OC_CLICKS.isLeftClicked()) return this._onMidUnhold();
        this._CALLBACK("onFlagUnhold", this._onFlagUnholdArgs());
    }; // $._onRightUnhold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onMidUnhold = function() {
        this._CALLBACK("onChordUnhold", this._onChordUnholdArgs());
    }; // $._onMidUnhold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onLeftUp = function() {
        this._OC_CLICKS.isRightClicked() ? this._onMidUp() : this.onReveal();
    }; // $._onLeftUp

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onRightUp = function() {
        if (this._OC_CLICKS.isLeftClicked()) return this._onMidUp();
        this._CALLBACK("onFlagUnhold", this._onFlagUnholdArgs());
    }; // $._onRightUp

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onMidUp = function() {
        this._CALLBACK("onChordUp", this._onChordUpArgs());
    }; // $._onMidUp

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onclickHold = function() {
        this._CALLBACK("onclickHold", this._onclickHoldArgs());
    }; // $._onclickHold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onclickUnhold = function() {
        this._CALLBACK("onclickUnhold", this._onclickUnholdArgs());
    }; // $._onclickUnhold

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onForceReveal = function() {
        this._CALLBACK("onWrongFlag", this._onWrongFlagArgs());
    }; // $._onForceReveal

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onReveal = function() {
        this._setIsRevealed(true);
        this._CALLBACK(this._onclickUpEvent(), this._onclickUpArgs());
    }; // $._onReveal

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {String} The requested event name for the grid owner
     * @since v1.0
     * @version v1.0
     */
    $._onFlagEvent = function() {
        return this._FLAG_EVENTS[this._flagStatus()];
    }; // $._onFlagEvent

    /**
     * Hotspot/Nullipotent
     * @abstract
     * @author DoubleX
     * @returns {String} The requested event name for the grid owner
     * @since v1.0
     * @version v1.0
     */
    $._onclickUpEvent = function() {
        // No sensible default's possible so errors must be thrown
        throw new Error(this._MSG_ON_CLICK_UP_EVENT_NOT_IMPL);
        //
    }; // $._onclickUpEvent

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onclickHoldArgs = function() {
        return this._onEventBaseArgs().concat(this._imgPath(this._IMG_HELD));
    }; // $._onclickHoldArgs

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onChordHoldArgs = function() { return this._onEventBaseArgs(); };

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onFlagArgs = function() {
        return this._onEventBaseArgs().concat(
                this._imgPath(this._flagStatus()));
    }; // $._onFlagArgs

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @returns {String} The requested status
     * @since v1.0
     * @version v1.0
     */
    $._flagStatus = function() {
        return this._FLAG_STATUSES[this._flagStatusIndex];
    }; // $._flagStatus

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onclickUnholdArgs = function() {
        return this._onEventBaseArgs().concat(this._imgPath(this._IMG_UNHELD));
    }; // $._onclickUnholdArgs

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onFlagUnholdArgs = function() { return this._onEventBaseArgs(); };

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onChordUnholdArgs = function() { return this._onEventBaseArgs(); };

    /**
     * Subclasses overriding this function must append extras after the parent
     * Hotspot/Pure function
     * @abstract
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onclickUpArgs = function() { return this._onEventBaseArgs(); };

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onChordUpArgs = function() { return this._onEventBaseArgs(); };

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onWrongFlagArgs = function() {
        return this._onEventBaseArgs().concat(
                this._imgPath(this._IMG_WRONG_FLAG));
    }; // $._onWrongFlagArgs

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {String} img - The img to have its path returned
     * @returns {String} The requested img path
     * @since v1.0
     * @version v1.0
     */
    $._imgPath = function(img) { return this._IMG_PRE + img + this._IMG_POST; };

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {String} img - The img to have its path returned
     * @returns {String} The requested img path
     * @since v1.0
     * @version v1.0
     */
    $._revealedImgPath = function(img) {
        return this._IMG_REVEALED_PRE + img + this._IMG_REVEALED_POST;
    }; // $._revealedImgPath

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array[Number](2)} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onEventBaseArgs = function() { return [this._X, this._Y]; };

})(DoubleX.PROJ.MINESWEEPER.OBJ.MODEL.OMGrid);