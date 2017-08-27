/**
 * Setups the subscriptions to let OCGrids listen to the click events in OMGrid
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    namespace.PLUGINS.CORR.Subscription = namespace.Subscription();

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the correcting click counting features in OCGrids
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCGrids.prototype;
    var _PLUGIN = namespace.PLUGINS.CORR;
    var _SUBSCRIBE = _PLUGIN.Subscription.subscribe;
    var _OC_GRIDS = _PLUGIN.OCGrids = { orig: {}, new: {} };
    var $$ = _OC_GRIDS.orig, $$$ = _OC_GRIDS.new;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Function} subscribe - Subscribes to a component
     * @param {Function} publish - Publishes itself to its subscribers
     * @param {Function(Dom, String)} onDraw - The callback of the object
     *                                          drawing UI
     * @param {Function} newGameBtn - The new game button UI view
     * @param {Function(Number)} remainMineNum - The remain mine num UI view
     * @param {OMGrids} omGrids - The  grid data container
     * @param {OVLayout} ovLayout - The UI view layout coordinator
     * @param {OVTimer} ovTimer - The game board timer UI view
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @since v1.0
     * @version v1.0
     */
    $$.initialize = $.initialize;
    $.initialize = function(subscribe, publish, onDraw, newGameBtn, remainMineNum, 
            omGrids, ovLayout, ovTimer, w, h, mineNum) {
        $$.initialize.call(this, subscribe, publish, onDraw, newGameBtn, 
                remainMineNum, omGrids, ovLayout, ovTimer, w, h, mineNum);
        $$$._subscribe.call(this); // Added to subscribe to OMGrid click events
    }; // $.initialize

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
        // Added to reset the number of correct clicks
        $$$._resetCorr.call(this);
        //
    }; // $._initCaches

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} x - The current grid col index
     * @param {Number} y - The current grid row index
     * @since v1.0
     * @version v1.0
     */
    $$._onChordUp = $._onChordUp;
    $._onChordUp = function(x, y) {
        $$._onChordUp.call(this, x, y);
        $$$._onUpdateCorr.call(this);
    }; // $._onChordUp

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._subscribe = function() {
        _SUBSCRIBE("OMMine corr _onPostFlag", $$$._onUpdateCorr.bind(this));
        _SUBSCRIBE("OMNum corr _onPostLeftUp", $$$._onUpdateCorr.bind(this));
        _SUBSCRIBE("OMSpace corr _onPostLeftUp", $$$._onUpdateCorr.bind(this));
    }; // $$$._subscribe

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._resetCorr = function() { this._corr = 0; };

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._onUpdateCorr = function() {
        if (!this.isEnded()) $$$._updateCorr.call(this);
    }; // $$$._onUpdateCorr

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._updateCorr = function() { this._corr++; };

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Lets OMGrid marks that a correct click's occurred on each grid
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.MODEL.OMGrid.prototype;
    var _PLUGIN = namespace.PLUGINS.CORR;
    var _OM_GRID = _PLUGIN.OMGrid = { orig: {}, new: {} };
    var $$ = _OM_GRID.orig, $$$ = _OM_GRID.new;

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._initCaches = $._initCaches;
    $._initCaches = function() {
        $$._initCaches.call(this);
        // Added to mark that this grid's not correctly clicked yet
        $$$._setIsCorrClicked(false);
        //
    }; // $._initCaches

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$.isCorrClicked = function() {return this._isCorrClicked; };

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Boolean} isCorrClicked - Whether this grid's correctly clicked
     * @since v1.0
     * @version v1.0
     */
    $$$._setIsCorrClicked = function(isCorrClicked) {
        this._isCorrClicked = isCorrClicked;
    }; // $$$._setIsCorrClicked

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Lets OMMine publish the correct click event for OCGrids to listen to
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _MODEL = namespace.OBJ.MODEL;
    var _PARENT = _MODEL.OMGrid.prototype, $ = _MODEL.OMMine.prototype;
    var _PLUGIN = namespace.PLUGINS.CORR;
    var _PUBLISH = _PLUGIN.Subscription.publish;
    _PLUGIN.OMMine = { orig: {}, new: {} };
    var $$$ = _PLUGIN.OMMine.new, _PARENT_NEW = _PLUGIN.OMGrid.new;

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onFlag = function() {
        // This ordering must be preserved or $$$._onFlag would never publish
        $$$._onFlag.call(this);
        _PARENT._onFlag.call(this);
        //
    }; // $._onFlag

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._onFlag = function() {
        // Checking this.isRevealed() isn't needed as the game would be lost
        if (!_PARENT_NEW.isCorrClicked.call(this)) $$$._onPostFlag.call(this);
        //
    }; // $$$._onFlag

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._onPostFlag = function() {
        _PARENT_NEW._setIsCorrClicked.call(this, true);
        _PUBLISH("OMMine corr _onPostFlag", null);
    }; // $$$._onPostFlag

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Lets OMNum publish the correct click event for OCGrids to listen to
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _MODEL = namespace.OBJ.MODEL;
    var _PARENT = _MODEL.OMGrid.prototype, $ = _MODEL.OMNum.prototype;
    var _PLUGIN = namespace.PLUGINS.CORR;
    var _PUBLISH = _PLUGIN.Subscription.publish;
    _PLUGIN.OMNum = { orig: {}, new: {} };
    var $$$ = _PLUGIN.OMNum.new, _PARENT_NEW = _PLUGIN.OMGrid.new;

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onLeftUp = function() {
        // Edited to publish the correct left click with the right isValidLeftUp
        var isValidLeftUp = $$$._isValidLeftUp.call(this);
        _PARENT._onLeftUp.call(this);
        if (isValidLeftUp) $$$._onPostLeftUp.call(this);
        //
    }; // $._onLeftUp

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isValidLeftUp = function() {
        if (this.isRevealed() || this._OC_CLICKS.isRightClicked()) return false;
        return !_PARENT_NEW.isCorrClicked.call(this);
    }; // $$$._isValidLeftUp

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._onPostLeftUp = function() {
        _PARENT_NEW._setIsCorrClicked.call(this, true);
        _PUBLISH("OMNum corr _onPostLeftUp", null);
    }; // $$$._onPostLeftUp

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Lets OMSpace publish the correct click event for OCGrids to listen to
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _MODEL = namespace.OBJ.MODEL;
    var _PARENT = _MODEL.OMGrid.prototype, $ = _MODEL.OMSpace.prototype;
    var _PLUGIN = namespace.PLUGINS.CORR;
    var _PUBLISH = _PLUGIN.Subscription.publish;
    _PLUGIN.OMSpace = { orig: {}, new: {} };
    var $$$ = _PLUGIN.OMSpace.new, _PARENT_NEW = _PLUGIN.OMGrid.new;

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onLeftUp = function() {
        // Edited to publish the correct left click with the right isValidLeftUp
        var isValidLeftUp = $$$._isValidLeftUp.call(this);
        _PARENT._onLeftUp.call(this);
        if (isValidLeftUp) $$$._onPostLeftUp.call(this);
        //
    }; // $._onLeftUp

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isValidLeftUp = function() {
        if (this.isRevealed() || this._OC_CLICKS.isRightClicked()) return false;
        return !_PARENT_NEW.isCorrClicked.call(this);
    }; // $$$._isValidLeftUp

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._onPostLeftUp = function() {
        _PARENT_NEW._setIsCorrClicked.call(this, true);
        _PUBLISH("OMSpace corr _onPostLeftUp", null);
    }; // $$$._onPostLeftUp

})(DoubleX.PROJ.MINESWEEPER);