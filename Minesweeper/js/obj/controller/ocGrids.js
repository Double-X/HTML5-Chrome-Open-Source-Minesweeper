/**
 * A prototype for creating objects that coordinates all grid UIs on the board
 * Hotspot
 * @author DoubleX
 * @param {OCGrids} OCGrids - The function used by this prototype
 * @since v1.0
 * @todo Split this class with 2 responsibilities into 2 with 1 each
 * @version v1.0
 */
(function(OCGrids) {

    "use strict";

    var $ = OCGrids.prototype;
    $.constructor = OCGrids;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Function} subscribe - Subscribes to a component
     * @param {Function} publish - Publishes itself to its subscribers
     * @param {Function(Dom, String)} onDraw - The callback of the object
     *                                          drawing UI
     * @param {Function} newGameBtn - The new game button UI view
     * @param {Object[String, Function]} fvRemainMineNum - The FVRemainMineNum
     *                                                      API mapping
     * @param {OMGrids} omGrids - The  grid data container
     * @param {OVLayout} ovLayout - The UI view layout coordinator
     * @param {OVTimer} ovTimer - The game board timer UI view
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(subscribe, publish, onDraw, newGameBtn, 
            fvRemainMineNum, omGrids, ovLayout, ovTimer, w, h, mineNum) {
        this._initReadOnlys(publish, onDraw, newGameBtn, fvRemainMineNum, 
                omGrids, ovLayout, ovTimer);
        this._subscribe(subscribe);
        this._initCaches(w, h, mineNum);
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} publish - Publishes itself to its subscribers
     * @param {Function(Dom, String)} onDraw - The callback of the object
     *                                          drawing UI
     * @param {Function} newGameBtn - The new game button UI view
     * @param {Object[String, Function]} fvRemainMineNum - The FVRemainMineNum
     *                                                      API mapping
     * @param {OMGrids} omGrids - The grid data container
     * @param {OVLayout} ovLayout - The UI view layout coordinator
     * @param {OVTimer} ovTimer - The game board timer UI view
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(publish, onDraw, newGameBtn, fvRemainMineNum, 
            omGrids, ovLayout, ovTimer) {
        this._PUBLISH = publish;
        this._ON_DRAW = onDraw;
        this._NEW_GAME_BTN = newGameBtn;
        this._FV_REMAIN_MINE_NUM = fvRemainMineNum;
        this._OM_GRIDS = omGrids;
        this._OV_LAYOUT = ovLayout, this._OV_TIMER = ovTimer;
    }; // $._initReadOnlys

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} subscribe - Subscribes to a component
     * @since v1.0
     * @version v1.0
     */
    $._subscribe = function(subscribe) {
        subscribe("FMProfile _onSwitchSuc", this._onResize.bind(this));
    }; // $._subscribe

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function(w, h, mineNum) {
        this._setSize(w, h);
        this._setMineNum(mineNum);
        this._setRemainMineNum(mineNum);
        this._setNonMineNum(w, h, mineNum);
        this._setIsStarted(false);
        this._setIsEnded(false);
        this._setIsNF(true);
        this._PUBLISH("OCGrids _initCaches", null);
    }; // $._initCaches

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @since v1.0
     * @version v1.0
     */
    $._setSize = function(w, h) { this._w = w, this._h = h; };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} mineNum - The number of mines in the grids
     * @since v1.0
     * @version v1.0
     */
    $._setMineNum = function(mineNum) { this._mineNum = mineNum; };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} remainMineNum - The number of remaining mines
     * @since v1.0
     * @version v1.0
     */
    $._setRemainMineNum = function(remainMineNum) {
        this._remainMineNum = remainMineNum;
    }; // $._setRemainMineNum

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @since v1.0
     * @version v1.0
     */
    $._setNonMineNum = function(w, h, mineNum) {
        this._nonMineNum = w * h - mineNum;
    }; // $._setNonMineNum

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Boolean} isStarted - Whether the game board's started
     * @since v1.0
     * @version v1.0
     */
    $._setIsStarted = function(isStarted) { this._isStarted = isStarted; };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Boolean} isEnded - Whether the game board's ended
     * @since v1.0
     * @version v1.0
     */
    $._setIsEnded = function(isEnded) { this._isEnded = isEnded; };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Boolean} isNF - Whether the game board's a NF game
     * @since v1.0
     * @version v1.0
     */
    $._setIsNF = function(isNF) { this._isNF = isNF; };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isStarted = function() { return this._isStarted; };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isEnded = function() { return this._isEnded; };

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @since v1.0
     * @version v1.0
     */
    $.onResize = function(w, h, mineNum) {
        this._initCaches(w, h, mineNum);
        this._FV_REMAIN_MINE_NUM.setNum(mineNum);
        // This ordering must be preserved or all grid listeners will be gone
        this._OV_LAYOUT.onResize(w, h);
        this._OM_GRIDS.onResize(w, h, mineNum, this._onEvent.bind(this));
        //
        this._OV_TIMER.onReset();
    }; // $.onResize

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Number/Nullable} x - The current grid col index
     * @param {Number/Nullable} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $.onReset = function(x, y) {
        this._initCaches(this._w, this._h, this._mineNum);
        this._FV_REMAIN_MINE_NUM.setNum(this._mineNum);
        // This ordering must be preserved or all grid listeners will be gone
        this._OV_LAYOUT.onReset();
        this._OM_GRIDS.onReset(this._mineNum, this._onEvent.bind(this), x, y);
        //
        this._OV_TIMER.onReset();
    }; // $.onReset

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
    $.onclickHold = function(x, y, img) {
        if (!this.isEnded()) this._onclickHold(x, y, img);
    }; // $.onclickHold

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
    $.onFlag = function(x, y, img) {
        this._setIsNF(false);
        this._onToggleFlagStatus(x, y, img, -1);
    }; // $.onFlag

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
    $.onUnflag = function(x, y, img) {
        this._setIsNF(false); // It's just to play safe
        this._onToggleFlagStatus(x, y, img, 1);
    }; // $.onUnflag

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $.onChordHold = function(x, y) {
        // Chording alone shouldn't discard NF as there can be no flags to chord
        this._OM_GRIDS.onEvent(x, y, "onclickHold", []);
        this._OM_GRIDS.onNearEvent(x, y, "onclickHold", []);
        //
    }; // $.onChordHold

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
    $.onclickUnhold = function(x, y, img) {
        if (!this.isEnded()) this._onclickUnhold(x, y, img);
    }; // $.onclickUnhold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $.onFlagUnhold = function(x, y) {
        this._setIsNF(false); // It's just to play safe
        if (!this.isEnded()) this._NEW_GAME_BTN.onUnhold();
    }; // $.onFlagUnhold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $.onChordUnhold = function(x, y) {
        // Chording alone shouldn't discard NF as there can be no flags to chord
        this._OM_GRIDS.onEvent(x, y, "onclickUnhold", []);
        this._OM_GRIDS.onNearEvent(x, y, "onclickUnhold", []);
        //
    }; // $.onChordUnhold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $.onChordUp = function(x, y) {
        // Chording alone shouldn't discard NF as there can be no flags to chord
        if (this._canChordReveal(x, y)) return this._onChordUp(x, y);
        this.onChordUnhold(x, y);
        //
    }; // $.onChordUp

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
    $.onHitSpace = function(x, y, img) {
        this._OM_GRIDS.onNearEvent(x, y, "onReveal", []);
        this._onHitNonMineGrid(x, y, img);
    }; // $.onHitSpace

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
    $.onHitNum = function(x, y, img) { this._onHitNonMineGrid(x, y, img); };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} img - The path for the img to be displayed
     * @since v1.0
     * @version v1.0
     */
    $.onHitMine = function(x, y, img) {
        this.isStarted() ? this._onLose(x, y, img) : this._onRestart(x, y);
    }; // $.onHitMine

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} img - The path for the img to be displayed
     * @since v1.0
     * @version v1.0
     */
    $.onRevealMine = function(x, y, img) { this._onDraw(x, y, img); };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} img - The path for the img to be displayed
     * @since v1.0
     * @version v1.0
     */
    $.onWrongFlag = function(x, y, img) { this._onDraw(x, y, img); };

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {Object} profile - The profile to have its board spec updated
     * @since v1.0
     * @version v1.0
     */
    $._onResize = function(profile) {
        this.onResize(profile.lastW, profile.lastH, profile.lastMineNum);
    }; // $._onResize

    /**
     * Hotspot
     * @author DoubleX
     * @param {String} event - The function name handling the event
     * @param {Array} args - The arguments of the event to be handled
     * @since v1.0
     * @version v1.0
     */
    $._onEvent = function(event, args) {
        if (!this.isEnded()) this[event].apply(this, args);
    }; // $._onEvent

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $._onRestart = function(x, y) {
        // This ordering's to ensure the 1st clicked grid will be revealed
        this.onReset(x, y);
        this._onStart();
        this._OM_GRIDS.onEvent(x, y, "onReveal", []);
        //
    }; // $._onRestart

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onStart = function() {
        this._setIsStarted(true);
        this._setIsEnded(false);
        this._OV_TIMER.onStart();
    }; // $._onStart

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} img - The path for the img to be displayed
     * @param {Number} numChange - The change of number of remain mine
     * @since v1.0
     * @version v1.0
     */
    $._onToggleFlagStatus = function(x, y, img, numChange) {
        if (!this.isEnded()) this._toggleFlagStatus(x, y, img, numChange);
    }; // $._onToggleFlagStatus

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} img - The path for the img to be displayed
     * @param {Number} numChange - The change of number of remain mine
     * @since v1.0
     * @version v1.0
     */
    $._toggleFlagStatus = function(x, y, img, numChange) {
        this._setRemainMineNum(this._remainMineNum + numChange);
        this.onclickHold(x, y, img);
        this._FV_REMAIN_MINE_NUM.setNum(this._remainMineNum);
    }; // $._toggleFlagStatus

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._canChordReveal = function(x, y) {
        return this._OM_GRIDS.onEvent(
                x, y, "canChordReveal", [this._OM_GRIDS.nearFlagNum(x, y)]);
    }; // $._canChordReveal

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} img - The path for the img to be displayed
     * @since v1.0
     * @version v1.0
     */
    $._onclickHold = function(x, y, img) {
        this._NEW_GAME_BTN.onclickGrid();
        this._onDraw(x, y, img);
    }; // $._onclickHold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} img - The path for the img to be displayed
     * @since v1.0
     * @version v1.0
     */
    $._onclickUnhold = function(x, y, img) {
        this._NEW_GAME_BTN.onUnhold();
        this._onDraw(x, y, img);
    }; // $._onclickUnhold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $._onChordUp = function(x, y) {
        // A successful chord must be on an already revealed grid
        this._OM_GRIDS.onNearEvent(x, y, "onReveal", []);
        //
    }; // $._onChordUp

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @param {String} img - The path for the img to be displayed
     * @since v1.0
     * @version v1.0
     */
    $._onHitNonMineGrid = function(x, y, img) {
        this.onclickUnhold(x, y, img);
        if (!this.isStarted()) this._onStart();
        if (this._isAllNonMineRevealed()) this._onWin();
    }; // $._onHitNonMineGrid

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The hit mine col index
     * @param {Number} y - The hit mine row index
     * @param {String} img - The path for the img to be displayed
     * @since v1.0
     * @version v1.0
     */
    $._onLose = function(x, y, img) {
        // This ordering must be preserved or the unhit mines won't be revealed
        this._NEW_GAME_BTN.onLose();
        this._OM_GRIDS.onAllOtherEvent(x, y, "onForceReveal", []);
        this._onDraw(x, y, img);
        this._onEnd();
        //
    }; // $._onLose

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The hit mine col index
     * @param {Number} y - The hit mine row index
     * @param {String} img - The path for the img to be displayed
     * @since v1.0
     * @version v1.0
     */
    $._onDraw = function(x, y, img) {
        this._ON_DRAW(this._OV_LAYOUT.grid(x, y), img);
    }; // $._onDraw

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isAllNonMineRevealed = function() {
        return this._OM_GRIDS.revealedGridNum() === this._nonMineNum;
    }; // $._isAllNonMineRevealed

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onWin = function() {
        this._onRecordStat();
        this._NEW_GAME_BTN.onWin();
        this._FV_REMAIN_MINE_NUM.setNum(0);
        this._onEnd();
    }; // $._onWin

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onRecordStat = function() {
        this._PUBLISH("OCGrids _onPreRecordStat", null);
        this._recordStat();
        this._PUBLISH("OCGrids _onPostRecordStat", null);
    }; // $._onRecordStat

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._recordStat = function() {
        this._PUBLISH("OCGrids _recordStat", ["w", this._w]);
        this._PUBLISH("OCGrids _recordStat", ["h", this._h]);
        this._PUBLISH("OCGrids _recordStat", ["mineNum", this._mineNum]);
        this._PUBLISH("OCGrids _recordStat", ["isNF", this._isNF]);
    }; // $._recordStat

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onEnd = function() {
        this._setIsEnded(true);
        this._OV_TIMER.onStop();
    }; // $._onEnd

})(DoubleX.PROJ.MINESWEEPER.OBJ.CONTROLLER.OCGrids);