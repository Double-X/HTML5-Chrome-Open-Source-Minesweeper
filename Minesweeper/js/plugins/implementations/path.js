/**
 * Loads the new class implementing the plugin in the factory
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.Factory;
    var _PLUGIN = namespace.PLUGINS.PATH;
    var _FACTORY = _PLUGIN.Factory = { orig: {}, new: {} };
    var $$ = _FACTORY.orig, $$$ = _FACTORY.new;

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._build = $._build;
    $._build = function() {
        $$._build();
        $$$._build(); // Added to load the new class so it'll be used as well
    }; // $._build

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._build = function() {
        $$$._OM_PATH = new _PLUGIN.OMPath(
                $._CFG.doms.grids, $._OV_LAYOUT, $._OV_TIMER);
    }; // $$$._build

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Setups the subscriptions to let OMPath listen to the board events in OCGrids
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    namespace.PLUGINS.PATH.Subscription = namespace.Subscription();

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the path resetting features in OCGrids
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCGrids.prototype;
    var _PLUGIN = namespace.PLUGINS.PATH;
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
        $$$._publish("OCGrids path _initCaches"); // Added to publish this event
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
        $$$._publish("OCGrids path _onStart"); // Added to pub the start event
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
        $$$._publish("OCGrids path _onEnd"); // Added to publish the end event
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
 * Implements the path tracking feature by making a new class
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.1
 */
(function(namespace) {

    "use strict";

    var _PLUGIN = namespace.PLUGINS.PATH, _CFG = _PLUGIN.configuration;
    var _SUBSCRIBE = _PLUGIN.Subscription.subscribe;
    _PLUGIN.OMPath = function() { this.initialize.apply(this, arguments); };
    var OMPath = _PLUGIN.OMPath, $ = OMPath.prototype;
    $.constructor = OMPath;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Dom} grids - The grids consisting of individual grid UI
     * @param {OVLayout} ovLayout - The UI view layout coordinator
     * @param {OVTimer} ovTimer - The game board timer UI view
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(grids, ovLayout, ovTimer) {
        this._initReadOnlys(grids, ovLayout, ovTimer);
        this._subscribe();
        this._initCaches();
        this._attachListeners();
    }; // $.initialize

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.isEnded = function() { return this._isEnded; };

    /**
     * Idempotent
     * @author DoubleX
     * @param {Dom} grids - The grids consisting of individual grid UI
     * @param {OVLayout} ovLayout - The UI view layout coordinator
     * @param {OVTimer} ovTimer - The game board timer UI view
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(grids, ovLayout, ovTimer) {
        this._GRIDS = grids;
        this._OV_LAYOUT = ovLayout, this._OV_TIMER = ovTimer;
    }; // $._initReadOnlys

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.1
     */
    $._subscribe = function() {
        _SUBSCRIBE("OCGrids path _initCaches", this._initCaches.bind(this));
        _SUBSCRIBE("OCGrids path _onStart", this._setIsEnded.bind(this, false));
        _SUBSCRIBE("OCGrids path _onEnd", this._setIsEnded.bind(this, true));
    }; // $._subscribe

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function() {
        this._initPaths();
        this._setIsEnded.call(this, true);
    }; // $._initCaches

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initPaths = function() {
        this._path = 0;
        // _pathTimes is to mark when a point in a path's stored
        this._pathTimes = [], this._pathPts = [];
        //
    }; // $._initPaths

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Boolean} isEnded - Whether the game board's ended
     * @since v1.0
     * @version v1.0
     */
    $._setIsEnded = function(isEnded) { this._isEnded = isEnded; };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._attachListeners = function() { this._attachListener("onmousemove"); };

    /**
     * Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._attachListener = function(event) {
        this._GRIDS[event] = this["_" + event].bind(this);
    }; // $._attachListener

    /**
     * Hotspot
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $._onmousemove = function(event) {
        if (!this.isEnded()) this._onUpdatePath(event.pageX, event.pageY);
    }; // $._onmousemove

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} pageX - The raw x coordinate in the board
     * @param {Number} pageY - The raw y coordinate in the board
     * @since v1.0
     * @version v1.0
     */
    $._onUpdatePath = function(pageX, pageY) {
        // This ordering must be preserved as the latter needs the former state
        this._storeTimePts(
                this._pathCoor(pageX, this._corrOffset("left", "scrollLeft")), 
                this._pathCoor(pageY, this._corrOffset("top", "scrollTop")));
        this._updatePath();
        //
    }; // $._updatePath

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {String} direction - The direction of the offset from the board
     * @param {String} scrollDirection - The direction of the viewport scroll
     * @returns {Number} The requested raw coordinate offset from the board
     * @since v1.0
     * @version v1.0
     */
    $._corrOffset = function(direction, scrollDirection) {
        return this._GRIDS.getBoundingClientRect()[direction] + 
                document.body[scrollDirection];
    }; // $._corrXOffset

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} pageCoor - The raw coordinate in the board
     * @param {Number} offset - The raw offset of the board
     * @returns {Number} The requested path coordinate in the board
     * @since v1.0
     * @version v1.0
     */
    $._pathCoor = function(pageCoor, offset) {
        /** @todo: Use another way instead of accessing private variables */
        return (pageCoor - offset) * _CFG.gridSize / this._OV_LAYOUT._gridSize;
        //
    }; // $._pathCoor

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} pathX - The path x component in the board
     * @param {Number} pathY - The path y component in the board
     * @since v1.0
     * @version v1.0
     */
    $._storeTimePts = function(pathX, pathY) {
        /** @todo: Use another way instead of accessing private variables */
        this._pathTimes.push(this._OV_TIMER._elapsedMs);
        this._pathPts.push({ x: pathX, y: pathY });
        //
    }; // $._storeTimePts;

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._updatePath = function() {
        var latestTimeIndex = this._pathPts.length - 1;
        if (latestTimeIndex < 1) return;
        this._path += 
                this._pathPtDistance(latestTimeIndex - 1, latestTimeIndex);
    }; // $._updatePath

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} startTimeIndex - The index of the starting point
     * @param {Number} endTimeIndex - The index of the ending point
     * @since v1.0
     * @version v1.0
     */
    $._pathPtDistance = function(startTimeIndex, endTimeIndex) {
        var startPathPt = this._pathPts[startTimeIndex];
        var endPathPt = this._pathPts[endTimeIndex];
        return Math.sqrt(Math.pow(startPathPt.x - endPathPt.x, 2) + 
                Math.pow(startPathPt.y - endPathPt.y, 2));
    }; // $._pathPtDistance

})(DoubleX.PROJ.MINESWEEPER);