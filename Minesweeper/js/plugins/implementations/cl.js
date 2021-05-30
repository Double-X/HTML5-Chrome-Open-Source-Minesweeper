/**
 * Setups the subscriptions to let OCClicks listen to the reset event in OCGrids
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    namespace.PLUGINS.CL.Subscription = namespace.Subscription();

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the click counting features by listening to raw events in OCClicks
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.1
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCClicks.prototype;
    var _PLUGIN = namespace.PLUGINS.CL;
    var _SUBSCRIBE = _PLUGIN.Subscription.subscribe;
    var _OC_CLICKS = _PLUGIN.OCClicks = { orig: {}, new: {} };
    var $$ = _OC_CLICKS.orig, $$$ = _OC_CLICKS.new;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Dom} board - The dom receiving raw input events
     * @since v1.0
     * @version v1.0
     */
    $$.initialize = $.initialize;
    $.initialize = function(board) {
        $$.initialize.call(this, board);
        $$$._initialize.call(this); // Added to initialize with this plugin too
    }; // $.initialize

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $$$.isEnded = function() { return this._isEnded; };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._initialize = function() {
        $$$._subscribe.call(this);
        $$$._initCaches.call(this);
    }; // $$$._initialize

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.1
     */
    $$$._subscribe = function() {
        _SUBSCRIBE("OCGrids cl _initCaches", $$$._initCaches.bind(this));
        _SUBSCRIBE("OCGrids cl _onStart", $$$._setIsEnded.bind(this, false));
        _SUBSCRIBE("OCGrids cl _onEnd", $$$._setIsEnded.bind(this, true));
        _SUBSCRIBE("OMGrid cl _onFlag", $$$._increaseRightClickNum.bind(this));
        _SUBSCRIBE("OMGrid cl _onLeftUp", $$$._onLeftUp.bind(this));
        _SUBSCRIBE("OMGrid cl _onMidUp", $$$._onMidUp.bind(this));
    }; // $$$._subscribe

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._initCaches = function() {
        $$$._initClickNums.call(this);
        $$$._setIsEnded.call(this, true);
    }; // $$$._initCaches

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._initClickNums = function() {
        this._clickNum = 0, this._leftClickNum = 0;
        this._midClickNum = 0, this._rightClickNum = 0;
    }; // $$$._initClickNums

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Boolean} isEnded - Whether the game board's ended
     * @since v1.0
     * @version v1.0
     */
    $$$._setIsEnded = function(isEnded) { this._isEnded = isEnded; };

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._onLeftUp = function() {
        if (!$$$.isEnded.call(this)) $$$._increaseLeftClickNum.call(this);
    }; // $$$._onLeftUp

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._onMidUp = function() {
        if (!$$$.isEnded.call(this)) $$$._increaseMidClickNum.call(this);
    }; // $$$._onMidUp

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._increaseLeftClickNum = function() {
        $$$._increaseClickNum.call(this);
        $$$._increaseLeftClickNumOnly.call(this);
    }; // $$$._increaseLeftClickNum

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._increaseMidClickNum = function() {
        $$$._increaseClickNum.call(this);
        $$$._increaseMidClickNumOnly.call(this);
    }; // $$$._increaseMidClickNum

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._increaseRightClickNum = function() {
        $$$._increaseClickNum.call(this);
        $$$._increaseRightClickNumOnly.call(this);
    }; // $$$._increaseRightClickNum

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._increaseClickNum = function() { this._clickNum++; };

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._increaseLeftClickNumOnly = function() { this._leftClickNum++; };

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._increaseMidClickNumOnly = function() { this._midClickNum++; };

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._increaseRightClickNumOnly = function() { this._rightClickNum++; };

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Lets OCGrids publish the reset event for OCClicks to listen to
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCGrids.prototype;
    var _PLUGIN = namespace.PLUGINS.CL;
    var _PUBLISH = _PLUGIN.Subscription.publish;
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
        $$$._publish("OCGrids cl _initCaches"); // Added to publish this event
    }; // $._initCaches

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onStart = $._onStart;
    $._onStart = function() {
        $$._onStart.call(this);
        $$$._publish("OCGrids cl _onStart"); // Added to publish the start event
    }; // $._onStart

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onEnd = $._onEnd;
    $._onEnd = function() {
        $$._onEnd.call(this);
        $$$._publish("OCGrids cl _onEnd"); // Added to publish the end event
    }; // $._onEnd

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {String} key - The unique publish/subscribe key
     * @since v1.0
     * @version v1.0
     */
    $$$._publish = function(key) { _PUBLISH(key, null); };

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Lets OMGrid marks that a click's occurred on each grid
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.MODEL.OMGrid.prototype;
    var _PLUGIN = namespace.PLUGINS.CL;
    var _PUBLISH = _PLUGIN.Subscription.publish;
    var _OM_GRID = _PLUGIN.OMGrid = { orig: {}, new: {} };
    var $$ = _OM_GRID.orig, $$$ = _OM_GRID.new;

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onFlag = $._onFlag;
    $._onFlag = function() {
        $$._onFlag.call(this);
        $$$._publish("OMGrid cl _onFlag"); // Added to publish the flag event
    }; // $._onFlag

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onLeftUp = $._onLeftUp;
    $._onLeftUp = function() {
        $$._onLeftUp.call(this);
        $$$._onLeftUp.call(this); // Added to publish the click event
    }; // $._onLeftUp

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._onLeftUp = function() {
        if (this._OC_CLICKS.isRightClicked()) return;
        _PUBLISH("OMGrid cl _onLeftUp", null);
    }; // $$$._onLeftUp

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onMidUp = $._onMidUp;
    $._onMidUp = function() {
        $$._onMidUp.call(this);
        $$$._publish("OMGrid cl _onMidUp"); // Added to publish the chord event
    }; // $._onMidUp

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {String} key - The unique publish/subscribe key
     * @since v1.0
     * @version v1.0
     */
    $$$._publish = function(key) { _PUBLISH(key, null); };

})(DoubleX.PROJ.MINESWEEPER);