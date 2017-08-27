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
    var _PLUGINS = namespace.PLUGINS, _PLUGIN = _PLUGINS.STAT;
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
        // Added to edit the internal of $._FM_PROFILE right after it's created
        $._SUBSCRIBE("FMProfile", $$$._editFMProfile);
        //
        $$._build();
        $$$._makeNewObjs(); // Added to load the new classes to the used as well
    }; // $._build

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object[String, Function]} fmProfile - The FMProfile API mapping
     * @since v1.0
     * @version v1.0
     */
    $$$._editFMProfile = function(fmProfile) {
        // These codes are easy, simple and small enough to be kept all together
        if (!_PLUGINS.THREE_BV) return;
        fmProfile._isGreaterThan = function(record, highscore, field) {
            return !highscore[field] || record[field] > highscore[field];
        };
        var isGreaterThan = fmProfile._isGreaterThan;
        var isLessThan = fmProfile._isLessThan;
        var highscoresFieldRules = fmProfile._HIGHSCORES_FIELD_RULES;
        highscoresFieldRules.threeBVRate = isGreaterThan;
        highscoresFieldRules.rqp = isLessThan;
        highscoresFieldRules.qg = isLessThan;
        highscoresFieldRules.ios = isGreaterThan;
        if (_PLUGINS.CORR) highscoresFieldRules.ioe = isGreaterThan;
        //
    }; // $$$._editFMProfile

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._makeNewObjs = function() {
        $$$._OM_STAT = new _PLUGIN.OMStat($._SUBSCRIBE, $._PUBLISH);
        $$$._OV_STAT = new _PLUGIN.OVStat(
                document.getElementById("rightSpace"));
    }; // $$$._makeNewObjs

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Setups the subscriptions to let this plugin listen to the stat sources
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    namespace.PLUGINS.STAT.Subscription = namespace.Subscription();

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the stat gathering features in OCClicks
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCClicks.prototype;
    var _PLUGINS = namespace.PLUGINS, _PLUGIN = _PLUGINS.STAT;
    var _PUBLISH = _PLUGIN.Subscription.publish;
    var _OC_CLICKS = _PLUGIN.OCClicks = { orig: {}, new: {} };
    var $$ = _OC_CLICKS.orig, $$$ = _OC_CLICKS.new;

    if (_PLUGINS.CL) {

        var _CL = _PLUGINS.CL.OCClicks.new;

        /**
         * Idempotent
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._initClickNums = _CL._initClickNums;
        _CL._initClickNums = function() {
            $$._initClickNums.call(this);
            // Added to notify the change of the number of clicks
            _PUBLISH("OCClicks stat _initClickNums", null);
            //
        }; // _CL._initClickNums

        /**
         * Hotspot
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._increaseClickNum = _CL._increaseClickNum;
        _CL._increaseClickNum = function() {
            $$._increaseClickNum.call(this);
            // Added to notify the change of the number of total clicks
            _PUBLISH("OCClicks stat _increaseClickNum", this._clickNum);
            //
        }; // _CL._increaseClickNum

        /**
         * Hotspot
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._increaseLeftClickNumOnly = _CL._increaseLeftClickNumOnly;
        _CL._increaseLeftClickNumOnly = function() {
            $$._increaseLeftClickNumOnly.call(this);
            // Added to notify the change of the number of left clicks
            _PUBLISH("OCClicks stat _increaseLeftClickNumOnly", 
                    this._leftClickNum);
            //
        }; // _CL._increaseLeftClickNumOnly

        /**
         * Hotspot
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._increaseMidClickNumOnly = _CL._increaseMidClickNumOnly;
        _CL._increaseMidClickNumOnly = function() {
            $$._increaseMidClickNumOnly.call(this);
            // Added to notify the change of the number of mid clicks
            _PUBLISH("OCClicks stat _increaseMidClickNumOnly", 
                    this._midClickNum);
            //
        }; // _CL._increaseMidClickNumOnly

        /**
         * Hotspot
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._increaseRightClickNumOnly = _CL._increaseRightClickNumOnly;
        _CL._increaseRightClickNumOnly = function() {
            $$._increaseRightClickNumOnly.call(this);
            // Added to notify the change of the number of right clicks
            _PUBLISH("OCClicks stat _increaseRightClickNumOnly", 
                    this._rightClickNum);
            //
        }; // _CL._increaseRightClickNumOnly

    } // if (_PLUGINS.CL)

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the stat gathering features in OCGrids
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCGrids.prototype;
    var _PLUGINS = namespace.PLUGINS, _PLUGIN = _PLUGINS.STAT;
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
        // Added to notify the change of the UPK statistics visibilities
        _PUBLISH("OCGrids stat _initCaches", null);
        //
    }; // $._initCaches

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} remainMineNum - The number of remaining mines
     * @since v1.0
     * @version v1.0
     */
    $$._setRemainMineNum = $._setRemainMineNum;
    $._setRemainMineNum = function(remainMineNum) {
        $$._setRemainMineNum.call(this, remainMineNum);
        // Added to notify the change of the number of flags
        _PUBLISH("OCGrids stat _setRemainMineNum", $$$._flags.call(this));
        //
    }; // $._setRemainMineNum

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested number of flags
     * @since v1.0
     * @version v1.0
     */
    $$$._flags = function() { return this._mineNum - this._remainMineNum; };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onEnd = $._onEnd;
    $._onEnd = function() {
        $$._onEnd.call(this);
        // Added to notify the change of the UPK statistics visibilities
        _PUBLISH("OCGrids stat _onEnd", null);
        //
    }; // $._onEnd

    if (_PLUGINS.CORR) {

        var _CORR = _PLUGINS.CORR.OCGrids.new;

        /**
         * Potential Hotspot/Idempotent
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._resetCorr = _CORR._resetCorr;
        _CORR._resetCorr = function() {
            $$._resetCorr.call(this);
            // Added to notify the change of the number of correct clicks
            _PUBLISH("OCGrids stat _resetCorr", this._corr);
            //
        }; // _CORR._resetCorr

        /**
         * Hotspot
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._updateCorr = _CORR._updateCorr;
        _CORR._updateCorr = function() {
            $$._updateCorr.call(this);
            // Added to notify the change of the number of correct clicks
            _PUBLISH("OCGrids stat _updateCorr", this._corr);
            //
        }; // _CORR._updateCorr

    } // if (_PLUGINS.CORR)

    if (_PLUGINS.ISIS) {

        var _ISIS = _PLUGINS.ISIS.OCGrids.new;

        /**
         * Potential Hotspot/Idempotent
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._resetSolvedIsIsNum = _ISIS._resetSolvedIsIsNum;
        _ISIS._resetSolvedIsIsNum = function() {
            $$._resetSolvedIsIsNum.call(this);
            // Added to notify the change of the number of solved isIs
            _PUBLISH("OCGrids stat _resetSolvedIsIsNum", this._solvedIsIsNum);
            //
        }; // _ISIS._resetSolvedIsIsNum

        /**
         * Hotspot
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._updateSolvedIsIsNum = _ISIS._updateSolvedIsIsNum;
        _ISIS._updateSolvedIsIsNum = function() {
            $$._updateSolvedIsIsNum.call(this);
            // Added to notify the change of the number of solved isIs
            _PUBLISH("OCGrids stat _updateSolvedIsIsNum", this._solvedIsIsNum);
            //
        }; // _ISIS._updateSolvedIsIsNum

    } // if (_PLUGINS.ISIS)

    if (_PLUGINS.OPS) {

        var _OPS = _PLUGINS.OPS.OCGrids.new;

        /**
         * Potential Hotspot/Idempotent
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._resetRevealedOpsCount = _OPS._resetRevealedOpsCount;
        _OPS._resetRevealedOpsCount = function() {
            $$._resetRevealedOpsCount.call(this);
            // Added to notify the change of the number of revealed ops
            _PUBLISH("OCGrids stat _resetRevealedOpsCount", this._revealedOps);
            //
        }; // _OPS._resetRevealedOpsCount

        /**
         * Hotspot
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._updateRevealedOpsCount = _OPS._updateRevealedOpsCount;
        _OPS._updateRevealedOpsCount = function() {
            $$._updateRevealedOpsCount.call(this);
            // Added to notify the change of the number of revealed ops
            _PUBLISH("OCGrids stat _updateRevealedOpsCount", this._revealedOps);
            //
        }; // _OPS._updateRevealedOpsCount

    } // if (_PLUGINS.OPS)

    if (_PLUGINS.THREE_BV) {

        var _THREE_BV = _PLUGINS.THREE_BV.OCGrids.new;

        /**
         * Potential Hotspot/Idempotent
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._resetClickedThreeBVCount = _THREE_BV._resetClickedThreeBVCount;
        _THREE_BV._resetClickedThreeBVCount = function() {
            $$._resetClickedThreeBVCount.call(this);
            // Added to notify the change of the number of clicked 3BVs
            _PUBLISH("OCGrids stat _resetClickedThreeBVCount", 
                    this._clickedThreeBV);
            //
        }; // _THREE_BV._resetClickedThreeBVCount

        /**
         * Hotspot
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._updateRevealedThreeBVCount = _THREE_BV._updateRevealedThreeBVCount;
        _THREE_BV._updateRevealedThreeBVCount = function() {
            $$._updateRevealedThreeBVCount.call(this);
            // Added to notify the change of the number of clicked 3BVs
            _PUBLISH("OCGrids stat _updateRevealedThreeBVCount", 
                    this._clickedThreeBV);
            //
        }; // _THREE_BV._updateRevealedThreeBVCount

    } // if (_PLUGINS.THREE_BV)

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the stat gathering features in OMGrids
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.MODEL.OMGrids.prototype;
    var _PLUGINS = namespace.PLUGINS, _PLUGIN = _PLUGINS.STAT;
    var _PUBLISH = _PLUGIN.Subscription.publish;
    var _OM_GRIDS = _PLUGIN.OMGrids = { orig: {}, new: {} };
    var $$ = _OM_GRIDS.orig, $$$ = _OM_GRIDS.new;

    if (_PLUGINS.ISIS) {

        var _ISIS = _PLUGINS.ISIS.OMGrids.new;

        /**
         * Potential Hotspot/Idempotent
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._setIsIs = _ISIS._setIsIs;
        _ISIS._setIsIs = function() {
            $$._setIsIs.call(this);
            // Added to notify the change of the number of isIs
            _PUBLISH("OMGrids stat _setIsIs", this._isIs);
            //
        }; // _ISIS._setIsIs

    } // if (_PLUGINS.ISIS)

    if (_PLUGINS.OPS) {

        var _OPS = _PLUGINS.OPS.OMGrids.new;

        /**
         * Potential Hotspot/Idempotent
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._setOps = _OPS._setOps;
        _OPS._setOps = function() {
            $$._setOps.call(this);
            // Added to notify the change of the number of ops
            _PUBLISH("OMGrids stat _setOps", this._ops);
            //
        }; // _OPS._setOps

    } // if (_PLUGINS.OPS)

    if (_PLUGINS.THREE_BV) {

        var _THREE_BV = _PLUGINS.THREE_BV.OMGrids.new;

        /**
         * Potential Hotspot/Idempotent
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $$._markThreeBV = _THREE_BV._markThreeBV;
        _THREE_BV._markThreeBV = function() {
            $$._markThreeBV.call(this);
            // Added to notify the change of the number of 3BVs
            _PUBLISH("OMGrids stat _markThreeBV", this._threeBV);
            //
        }; // _THREE_BV._markThreeBV

    } // _PLUGINS.THREE_BV

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Reserves the specified amount of the at the right of the screen in OVLayout
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.VIEW.OVLayout.prototype;
    var _PLUGIN = namespace.PLUGINS.STAT, _CFG = _PLUGIN.configuration;
    var _OV_LAYOUT = _PLUGIN.OVLayout = { orig: {}, new: {} };
    var $$ = _OV_LAYOUT.orig, $$$ = _OV_LAYOUT.new;

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @returns {Number} The requested width
     * @since v1.0
     * @version v1.0
     */
    $$._usedScreenW = $._usedScreenW;
    $._usedScreenW = function() {
        // Edited to reserve space for displaying stat
        return $$._usedScreenW.call(this) * $$$._statWRatio.call(this);
        //
    }; // $._usedScreenW

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @returns {Number} The requested ratio
     * @since v1.0
     * @version v1.0
     */
    $$$._statWRatio = function() { return 1 - _CFG.wRatio; };

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the stat gathering features in OVTimer
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.VIEW.OVTimer.prototype;
    var _PLUGIN = namespace.PLUGINS.STAT;
    var _PUBLISH = _PLUGIN.Subscription.publish;
    var _OV_TIMER = _PLUGIN.OVTimer = { orig: {}, new: {} };
    var $$ = _OV_TIMER.orig, $$$ = _OV_TIMER.new;

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._initCaches = $._initCaches;
    $._initCaches = function() {
        $$._initCaches.call(this);
        // Added to notify the change of the elapsed time
        _PUBLISH("OVTimer stat _initCaches", this._elapsedMs);
        //
    }; // $._initCaches

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._updateElapsedTime = $._updateElapsedTime;
    $._updateElapsedTime = function() {
        $$._updateElapsedTime.call(this);
        // Added to notify the change of the elapsed time
        _PUBLISH("OVTimer stat _updateElapsedTime", this._elapsedMs);
        //
    }; // $._updateElapsedTime

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the stat gathering features in OMPath
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _PLUGINS = namespace.PLUGINS, _PATH = _PLUGINS.PATH;

    if (!_PATH) return;

    var $ = _PATH.OMPath.prototype;
    var _PLUGIN = _PLUGINS.STAT, _PUBLISH = _PLUGIN.Subscription.publish;
    var _OM_PATH = _PLUGIN.OMPath = { orig: {}, new: {} };
    var $$ = _OM_PATH.orig, $$$ = _OM_PATH.new;

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._initPaths = $._initPaths;
    $._initPaths = function() {
        $$._initPaths.call(this);
        // Added to notify the change of the path length
        _PUBLISH("OMPath stat _initPaths", this._path);
        //
    }; // $._initPaths

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._updatePath = $._updatePath;
    $._updatePath = function() {
        $$._updatePath.call(this);
        // Added to notify the change of the path length
        _PUBLISH("OMPath stat _updatePath", this._path);
        //
    }; // $._updatePath

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the stat gathering feature by making a new class
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _PLUGINS = namespace.PLUGINS, _PLUGIN = _PLUGINS.STAT;
    var _SUBSCRITION = _PLUGIN.Subscription;
    var _SUBSCRIBE = _SUBSCRITION.subscribe, _PUBLISH = _SUBSCRITION.publish;
    _PLUGIN.OMStat = function() { this.initialize.apply(this, arguments); };
    var OMStat = _PLUGIN.OMStat, $ = OMStat.prototype;
    $.constructor = OMStat;
    $._MAX_TIME_S = 999.99;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Function} subscribe - Subscribes to a component
     * @param {Function} publish - Publishes itself to its subscribers
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(subscribe, publish) {
        this._initReadOnlys(publish);
        this._initCaches(); // It's just to play safe
        this._subscribe(subscribe);
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} publish - Publishes itself to its subscribers
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(publish) { this._PUBLISH = publish; };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function() {
        this._clickNum = 0, this._corr = 0;
        this._elapsedS = 0;
        this._solvedIsIsNum = 0, this._isIs = 0;
        this._openOps = 0, this._ops = 0;
        this._revealedThreeBV = 0, this._threeBV = 0;
    }; // $._initCaches

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} subscribe - Subscribes to a component
     * @since v1.0
     * @version v1.0
     */
    $._subscribe = function(subscribe) {
        _SUBSCRIBE("OCGrids stat _setRemainMineNum", 
                this._onFlagsChange.bind(this));
        _SUBSCRIBE("OVTimer stat _initCaches", this._onTimeChange.bind(this));
        _SUBSCRIBE("OVTimer stat _updateElapsedTime", 
                this._onTimeChange.bind(this));
        _SUBSCRIBE("OCGrids stat _onEnd", this._onEstimatedSChange.bind(this));
        _SUBSCRIBE("OCClicks stat _initClickNums", 
                this._onResetClickNum.bind(this));
        _SUBSCRIBE("OCClicks stat _increaseClickNum", 
                this._onClickNumChange.bind(this));
        _SUBSCRIBE("OCClicks stat _increaseLeftClickNumOnly", 
                this._onLeftClickNumChange.bind(this));
        _SUBSCRIBE("OCClicks stat _increaseMidClickNumOnly", 
                this._onMidClickNumChange.bind(this));
        _SUBSCRIBE("OCClicks stat _increaseRightClickNumOnly", 
                this._onRightClickNumChange.bind(this));
        _SUBSCRIBE("OCGrids stat _resetCorr", this._onCorrChange.bind(this));
        _SUBSCRIBE("OCGrids stat _updateCorr", this._onCorrChange.bind(this));
        _SUBSCRIBE("OCGrids stat _resetSolvedIsIsNum", 
                this._onSolvedIsIsNumChange.bind(this));
        _SUBSCRIBE("OCGrids stat _updateSolvedIsIsNum", 
                this._onSolvedIsIsNumChange.bind(this));
        _SUBSCRIBE("OMGrids stat _setIsIs", this._onIsIsChange.bind(this));
        _SUBSCRIBE("OCGrids stat _resetRevealedOpsCount", 
                this._onOpenOpsChange.bind(this));
        _SUBSCRIBE("OCGrids stat _updateRevealedOpsCount", 
                this._onOpenOpsChange.bind(this));
        _SUBSCRIBE("OMGrids stat _setOps", this._onOpsChange.bind(this));
        _SUBSCRIBE("OMPath stat _initPaths", this._onPathChange.bind(this));
        _SUBSCRIBE("OMPath stat _updatePath", this._onPathChange.bind(this));
        _SUBSCRIBE("OCGrids stat _resetClickedThreeBVCount", 
                this._onRevealedThreeBVChange.bind(this));
        _SUBSCRIBE("OCGrids stat _updateRevealedThreeBVCount", 
                this._onRevealedThreeBVChange.bind(this));
        _SUBSCRIBE("OMGrids stat _markThreeBV", 
                this._onThreeBVChange.bind(this));
        subscribe("OCGrids _onPreRecordStat", this._onRecordStat.bind(this));
    }; // $._subscribe

    /**
     * Potential Hotspot
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onRecordStat = function() {
        // These codes are easy, simple and small enough to be kept all together
        if (!_PLUGINS.THREE_BV) return;
        this._PUBLISH("OCGrids _recordStat", 
                ["threeBVRate", this._threeBVRate()]);
        this._PUBLISH("OCGrids _recordStat", ["rqp", this._curRQP()]);
        this._PUBLISH("OCGrids _recordStat", ["ios", this._curIOS()]);
        this._PUBLISH("OCGrids _recordStat", ["qg", this._curQG()]);
        if (!_PLUGINS.CORR) return;
        this._PUBLISH("OCGrids _recordStat", ["ioe", this._ioe()]);
        //
    }; // $._onRecordStat

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} flagNum - The number of raised flags
     * @since v1.0
     * @version v1.0
     */
    $._onFlagsChange = function(flagNum) {
        _PUBLISH("OMStat stat _onFlagsChange", flagNum);
    }; // $._onFlagsChange

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @since v1.0
     * @version v1.0
     */
    $._onTimeChange = function(elapsedMs) {
        // These codes are easy, simple and small enough to be kept all together
        this._elapsedS = elapsedMs / 1000;
        this._onThreeBVRateChange();
        this._onIOSChange();
        this._onRQPChange();
        this._onQGChange();
        this._onEstimatedSChange();
        //
    }; // $._onTimeChange

    /**
     * Potential Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onResetClickNum = function() {
        _PUBLISH("OMStat stat _onResetClickNum", null);
    }; // $._onResetClickNum

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} clickNum - The number of clicks
     * @since v1.0
     * @version v1.0
     */
    $._onClickNumChange = function(clickNum) {
        // These codes are easy, simple and small enough to be kept all together
        this._clickNum = clickNum;
        _PUBLISH("OMStat stat _onClickNumChange", 
                [clickNum, this._statRate(clickNum)]);
        this._onCorrRatioChange();
        //
    }; // $._onClickNumChange

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} leftClickNum - The number of left clicks
     * @since v1.0
     * @version v1.0
     */
    $._onLeftClickNumChange = function(leftClickNum) {
        _PUBLISH("OMStat stat _onLeftClickNumChange", 
                [leftClickNum, this._statRate(leftClickNum)]);
    }; // $._onLeftClickNumChange

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} midClickNum - The number of mid clicks
     * @since v1.0
     * @version v1.0
     */
    $._onMidClickNumChange = function(midClickNum) {
        _PUBLISH("OMStat stat _onMidClickNumChange", 
                [midClickNum, this._statRate(midClickNum)]);
    }; // $._onMidClickNumChange

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} rightClickNum - The number of right clicks
     * @since v1.0
     * @version v1.0
     */
    $._onRightClickNumChange = function(rightClickNum) {
        _PUBLISH("OMStat stat _onRightClickNumChange", 
                [rightClickNum, this._statRate(rightClickNum)]);
    }; // $._onRightClickNumChange

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} corr - The number of correct clicks
     * @since v1.0
     * @version v1.0
     */
    $._onCorrChange = function(corr) {
        // These codes are easy, simple and small enough to be kept all together
        this._corr = corr;
        this._onRawCorrChange();
        this._onCorrRatioChange();
        this._onThrpChange();
        //
    }; // $._onCorrChange

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} solvedIsIsNum - The number of solved isIs
     * @since v1.0
     * @version v1.0
     */
    $._onSolvedIsIsNumChange = function(solvedIsIsNum) {
        this._solvedIsIsNum = solvedIsIsNum;
        // These codes are easy, simple and small enough to be kept all together
        _PUBLISH("OMStat stat _onSolvedIsIsNumChange", 
                [this._solvedIsIsNum, this._isIs]);
        //
    }; // $._onSolvedIsIsNumChange

    /**
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} isIs - The number of isIs
     * @since v1.0
     * @version v1.0
     */
    $._onIsIsChange = function(isIs) {
        this._isIs = isIs;
        // These codes are easy, simple and small enough to be kept all together
        _PUBLISH("OMStat stat _onIsIsChange", 
                [this._solvedIsIsNum, this._isIs]);
        //
    }; // $._onIsIsChange

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} openOps - The number of open ops
     * @since v1.0
     * @version v1.0
     */
    $._onOpenOpsChange = function(openOps) {
        // These codes are easy, simple and small enough to be kept all together
        this._openOps = openOps;
        _PUBLISH("OMStat stat _onOpenOpsChange", [this._openOps, this._ops]);
        //
    }; // $._onOpenOpsChange

    /**
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} ops - The number of ops
     * @since v1.0
     * @version v1.0
     */
    $._onOpsChange = function(ops) {
        // These codes are easy, simple and small enough to be kept all together
        this._ops = ops;
        _PUBLISH("OMStat stat _onOpsChange", [this._openOps, this._ops]);
        //
    }; // $._onOpsChange

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} path - The current path length
     * @since v1.0
     * @version v1.0
     */
    $._onPathChange = function(path) {
        _PUBLISH("OMStat stat _onPathChange", path);
    }; // $._onPathChange

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} revealedThreeBV - The number of revealed 3BVs
     * @since v1.0
     * @version v1.0
     */
    $._onRevealedThreeBVChange = function(revealedThreeBV) {
        // These codes are easy, simple and small enough to be kept all together
        this._revealedThreeBV = revealedThreeBV;
        _PUBLISH("OMStat stat _onRevealedThreeBVChange", 
                [this._revealedThreeBV, this._threeBV]);
        this._onThreeBVRateChange();
        this._onRQPChange();
        this._onIOSChange();
        this._onQGChange();
        this._onThrpChange();
        //
    }; // $._onRevealedThreeBVChange

    /**
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} threeBV - The number of 3BVs
     * @since v1.0
     * @version v1.0
     */
    $._onThreeBVChange = function(threeBV) {
        // These codes are easy, simple and small enough to be kept all together
        this._threeBV = threeBV;
        _PUBLISH("OMStat stat _onThreeBVChange", 
                [this._revealedThreeBV, this._threeBV]);
        this._onIOSChange();
        this._onQGChange();
        //
    }; // $._onThreeBVChange

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onRawCorrChange = function() {
        _PUBLISH("OMStat stat _onRawCorrChange", 
                [this._corr, this._statRate(this._corr)]);
    }; // $._onRawCorrChange

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onCorrRatioChange = function() {
        _PUBLISH("OMStat stat _onCorrRatioChange", this._corrRatio());
    }; // $._onCorrRatioChange

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onThreeBVRateChange = function() {
        _PUBLISH("OMStat stat _onThreeBVRateChange", this._threeBVRate());
    }; // $._onThreeBVRateChange

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onRQPChange = function() {
        _PUBLISH("OMStat stat _onCurRQPChange", this._curRQP());
        _PUBLISH("OMStat stat _onEstimatedRQPChange", this._estimatedRQP());
    }; // $._onRQPChange

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested Corr
     * @since v1.0
     * @version v1.0
     */
    $._curRQP = function() { return this._rqp(this._elapsedS); };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested Corr
     * @since v1.0
     * @version v1.0
     */
    $._estimatedRQP = function(){ return this._rqp(this._estimatedS()); };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} sec - The board play time in seconds
     * @returns {Number} The requested Corr
     * @since v1.0
     * @version v1.0
     */
    $._rqp = function(sec) {
        // These codes are easy, simple and small enough to be kept all together
        var threeBVRate = this._threeBVRate();
        return threeBVRate === 0 ? 0 : sec / threeBVRate;
        //
    }; // $._rqp

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested 3BV/s
     * @since v1.0
     * @version v1.0
     */
    $._threeBVRate = function() {
        return this._statRate(this._revealedThreeBV);
    }; // $._threeBVRate

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} stat - The value of the stat to have its rate
     * @returns {Number} The requested stat rate w.r.t. its value
     * @since v1.0
     * @version v1.0
     */
    $._statRate = function(stat) {
        // These codes are easy, simple and small enough to be kept all together
        return this._elapsedS === 0 ? 0 : stat / this._elapsedS;
        //
    }; // $._statRate

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onThrpChange = function() {
        _PUBLISH("OMStat stat _onThrpChange", this._thrp());
        this._onIOEChange();
    }; // $._onThrpChange

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onIOEChange = function() {
        _PUBLISH("OMStat stat _onIOEChange", this._ioe());
    }; // $._onIOEChange

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested IOE
     * @since v1.0
     * @version v1.0
     */
    $._ioe = function() { return this._corrRatio() * this._thrp(); };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested Corr
     * @since v1.0
     * @version v1.0
     */
    $._corrRatio = function() {
        // These codes are easy, simple and small enough to be kept all together
        return this._clickNum === 0 ? 0 : this._corr / this._clickNum;
        //
    }; // $._corrRatio

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested Thrp
     * @since v1.0
     * @version v1.0
     */
    $._thrp = function() {
        // These codes are easy, simple and small enough to be kept all together
        return this._corr === 0 ? 0 : this._revealedThreeBV / this._corr;
        //
    }; // $._thrp

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onIOSChange = function() {
        _PUBLISH("OMStat stat _onCurIOSChange", this._curIOS());
        _PUBLISH("OMStat stat _onEstimatedIOSChange", this._estimatedIOS());
    }; // $._onIOSChange

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested IOS
     * @since v1.0
     * @version v1.0
     */
    $._curIOS = function() {
        return this._ios(this._elapsedS, this._revealedThreeBV);
    }; // $._curIOS

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested IOS
     * @since v1.0
     * @version v1.0
     */
    $._estimatedIOS = function() {
        return this._ios(this._estimatedS(), this._threeBV);
    }; // $._estimatedIOS

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} sec - The board play time in seconds
     * @param {Number} threeBV - The 3BV of the board
     * @returns {Number} The requested IOS
     * @since v1.0
     * @version v1.0
     */
    $._ios = function(sec, threeBV) {
        /** @todo: Check the correct base of the logarithms */
        return sec <= 1 || threeBV <= 1 ? 0 : Math.log(threeBV) / Math.log(sec);
        //
    }; // $._ios

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onQGChange = function() {
        _PUBLISH("OMStat stat _onCurQGChange", this._curQG());
        _PUBLISH("OMStat stat _onEstimatedQGChange", this._estimatedQG());
    }; // $._onQGChange

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested QG
     * @since v1.0
     * @version v1.0
     */
    $._curQG = function() {
        return this._qg(this._revealedThreeBV, this._elapsedS);
    }; // $._curQG

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested QG
     * @since v1.0
     * @version v1.0
     */
    $._estimatedQG = function() {
        return this._qg(this._threeBV, this._estimatedS());
    }; // $._estimatedQG

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} threeBV - The 3BV of the board
     * @param {Number} sec - The board play time in seconds
     * @returns {Number} The requested QG
     * @since v1.0
     * @version v1.0
     */
    $._qg = function(threeBV, sec) {
        // These codes are easy, simple and small enough to be kept all together
        return threeBV === 0 ? 0 : Math.pow(sec, 1.7) / threeBV;
        //
    }; // $._qg

    /**
     * Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onEstimatedSChange = function() {
        _PUBLISH("OMStat stat _onEstimatedSChange", this._estimatedS());
    }; // $._onEstimatedSChange

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested estimated time in seconds
     * @since v1.0
     * @version v1.0
     */
    $._estimatedS = function() {
        // These codes are easy, simple and small enough to be kept all together
        if (this._revealedThreeBV <= 0) return this._MAX_TIME_S;
        // Dividing first might lead to loss in precisions and thus errors
        return this._elapsedS * this._threeBV / this._revealedThreeBV;
        //
        //
    }; // $._estimatedS

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the stat display feature by making a new class
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _PLUGINS = namespace.PLUGINS, _PLUGIN = _PLUGINS.STAT;
    var _SUBSCRIBE = _PLUGIN.Subscription.subscribe, _KEYS = Object.keys;
    _PLUGIN.OVStat = function() { this.initialize.apply(this, arguments); };
    var OVStat = _PLUGIN.OVStat, $ = OVStat.prototype;
    $.constructor = OVStat;
    $._STAT_DISPLAY_DOM_IDS = {
        flags: "flagsDisplay",
        estimatedS: "estimatedSDisplay",
        cl: "clDisplay",
        l: "lDisplay",
        d: "dDisplay",
        r: "rDisplay",
        rawCorr: "rawCorrDisplay",
        corr: "corrDisplay",
        isIs: "isIsDisplay",
        ops: "opsDisplay",
        path: "pathDisplay",
        threeBV: "threeBVDisplay",
        threeBVRate: "threeBVRateDisplay",
        curIOS: "curIOSDisplay",
        estimatedIOS: "estimatedIOSDisplay",
        curRQP: "curRQPDisplay",
        estimatedRQP: "estimatedRQPDisplay",
        thrp: "thrpDisplay",
        ioe: "ioeDisplay",
        curQG: "curQGDisplay",
        estimatedQG: "estimatedQGDisplay"
    };
    $._STAT_DISPLAY_FORMATS = {
        flags: "_displayedUnboundStat",
        estimatedS: "_displayedUnboundStat",
        cl: "_displayedStatValRate",
        l: "_displayedStatValRate",
        d: "_displayedStatValRate",
        r: "_displayedStatValRate",
        rawCorr: "_displayedStatValRate",
        corr: "_displayedUnboundStat",
        isIs: "_displayedBoundStat",
        ops: "_displayedBoundStat",
        path: "_displayedUnboundStat",
        threeBV: "_displayedBoundStat",
        threeBVRate: "_displayedUnboundStat",
        curIOS: "_displayedUnboundStat",
        estimatedIOS: "_displayedUnboundStat",
        curRQP: "_displayedUnboundStat",
        estimatedRQP: "_displayedUnboundStat",
        thrp: "_displayedUnboundStat",
        ioe: "_displayedUnboundStat",
        curQG: "_displayedUnboundStat",
        estimatedQG: "_displayedUnboundStat"
    };
    // Marks whether the displayed stats should be hidden when playing the board
    $._STAT_DISPLAY_HIDDEN_FLAGS = {
        flags: false,
        estimatedS: true,
        cl: false,
        l: false,
        d: false,
        r: false,
        rawCorr: false,
        corr: false,
        isIs: true,
        ops: true,
        path: false,
        threeBV: true,
        threeBVRate: true,
        curIOS: true,
        estimatedIOS: true,
        curRQP: true,
        estimatedRQP: true,
        thrp: true,
        ioe: true,
        curQG: true,
        estimatedQG: true
    };
    //
    $._STAT_DISPLAY_NAMES = {
        flags: "Flags",
        estimatedS: "Estimated Time",
        cl: "Cl",
        l: "L",
        d: "D",
        r: "R",
        rawCorr: "Raw Corr",
        corr: "Corr",
        isIs: "IsIs",
        ops: "Ops",
        path: "Path",
        threeBV: "3BV",
        threeBVRate: "3BV/s",
        curIOS: "Current IOS",
        estimatedIOS: "Estimated IOS",
        curRQP: "Current RQP",
        estimatedRQP: "Estimated RQP",
        thrp: "Thrp",
        ioe: "IOE",
        curQG: "Current QG",
        estimatedQG: "Estimated QG"
    };
    $._CUR_MAX_VAL_SEPARATOR = "/";
    $._STAT_VAL_SEPARATOR = ": ", $._VAL_RATE_SEPARATOR = "@";

    /**
     * @author DoubleX
     * @constructor
     * @param {Dom} rightSpace - The dom as the space at the right
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(rightSpace) {
        this._initRightSpace(rightSpace);
        this._initStats();
        this._subscribe();
        this._makeUPKStatInvisible();
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {Dom} rightSpace - The dom as the space at the right
     * @since v1.0
     * @version v1.0
     */
    $._initRightSpace = function(rightSpace) { this._RIGHT_SPACE = rightSpace; };

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initStats = function() {
        // These codes are easy, simple and small enough to be kept all together
        var hasCl = _PLUGINS.CL, hasCorr= hasCl && _PLUGINS.CORR;
        var hasOps = _PLUGINS.OPS, hasThreeBV = hasOps && _PLUGINS.THREE_BV;
        this._initFlagsDisplay();
        this._initEstimatedSDisplay();
        if (hasCl) this._initClDisplay();
        if (hasCorr) this._initCorrDisplay();
        if (_PLUGINS.ISIS) this._initIsIsDisplay();
        if (hasOps) this._initOpsDisplay();
        if (_PLUGINS.PATH) this._initPathDisplay();
        if (hasThreeBV) {
            this._initThreeBVDisplay();
            this._initIOSDisplay();
            this._initRQPDisplay();
            this._initQGDisplay();
        }
        if (hasCorr && hasThreeBV) {
            this._initThrpDisplay();
            this._initIOEDisplay();
        }
        //
    }; // $._initStats

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initFlagsDisplay = function() { this._appendChild("flags"); };

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initEstimatedSDisplay = function() {
        this._appendChild("estimatedS");
    }; // $._initEstimatedSDisplay

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initClDisplay = function() {
        this._appendChild("cl");
        this._appendChild("l");
        this._appendChild("d");
        this._appendChild("r");
    }; // $._initClDisplay

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initCorrDisplay = function() {
        this._appendChild("rawCorr");
        this._appendChild("corr");
    }; // $._initCorrDisplay

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initIsIsDisplay = function() { this._appendChild("isIs"); };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initOpsDisplay = function() { this._appendChild("ops"); };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initPathDisplay = function() { this._appendChild("path"); };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initThreeBVDisplay = function() {
        this._appendChild("threeBV");
        this._appendChild("threeBVRate");
    }; // $._initThreeBVDisplay

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initIOSDisplay = function() {
        this._appendChild("curIOS");
        this._appendChild("estimatedIOS");
    }; // $._initIOSDisplay

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initRQPDisplay = function() {
        this._appendChild("curRQP");
        this._appendChild("estimatedRQP");
    }; // $._initRQPDisplay

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initThrpDisplay = function() { this._appendChild("thrp"); };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initIOEDisplay = function() { this._appendChild("ioe"); };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initQGDisplay = function() {
        this._appendChild("curQG");
        this._appendChild("estimatedQG");
    }; // $._initQGDisplay

    /**
     * @author DoubleX
     * @param {String} stat - A key in _STAT_DISPLAY_DOM_IDS
     * @since v1.0
     * @version v1.0
     */
    $._appendChild = function(stat) {
        this._RIGHT_SPACE.appendChild(this._newDisplayDom(stat));
        this._RIGHT_SPACE.appendChild(this._newLineDom());
    }; // $._appendChild

    /**
     * Nullipotent
     * @author DoubleX
     * @param {String} stat - A key in _STAT_DISPLAY_DOM_IDS
     * @return {dom} The dom for displaying the requested stat
     * @since v1.0
     * @version v1.0
     */
    $._newDisplayDom = function(stat) {
        var newDisplayDom = document.createElement('text');
        newDisplayDom.id = this._STAT_DISPLAY_DOM_IDS[stat];
        newDisplayDom.contentEditable = false;
        newDisplayDom.textContent = 
                this[this._STAT_DISPLAY_FORMATS[stat]](stat, 0, 0);
        return newDisplayDom;
    }; // $._newDisplayDom

    /**
     * Nullipotent
     * @author DoubleX
     * @return {dom} The new line like dom
     * @since v1.0
     * @version v1.0
     */
    $._newLineDom = function() { return document.createElement('br'); };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._subscribe = function() {
        _SUBSCRIBE("OCGrids stat _initCaches", 
                this._makeUPKStatInvisible.bind(this));
        _SUBSCRIBE("OCGrids stat _onEnd", this._makeUPKStatVisible.bind(this));
        _SUBSCRIBE(
                "OMStat stat _onFlagsChange", this._onFlagsChange.bind(this));
        _SUBSCRIBE("OMStat stat _onEstimatedSChange", 
                this._onEstimatedSChange.bind(this));
        _SUBSCRIBE("OMStat stat _onResetClickNum", 
                this._onResetClickNum.bind(this));
        _SUBSCRIBE("OMStat stat _onClickNumChange", 
                this._onClickNumChange.bind(this));
        _SUBSCRIBE("OMStat stat _onLeftClickNumChange", 
                this._onLeftClickNumChange.bind(this));
        _SUBSCRIBE("OMStat stat _onMidClickNumChange", 
                this._onMidClickNumChange.bind(this));
        _SUBSCRIBE("OMStat stat _onRightClickNumChange", 
                this._onRightClickNumChange.bind(this));
        _SUBSCRIBE("OMStat stat _onRawCorrChange", 
                this._onRawCorrChange.bind(this));
        _SUBSCRIBE("OMStat stat _onCorrRatioChange", 
                this._onCorrRatioChange.bind(this));
        _SUBSCRIBE("OMStat stat _onSolvedIsIsNumChange", 
                this._onIsIsChange.bind(this));
        _SUBSCRIBE("OMStat stat _onIsIsChange", this._onIsIsChange.bind(this));
        _SUBSCRIBE("OMStat stat _onOpenOpsChange", 
                this._onOpsChange.bind(this));
        _SUBSCRIBE("OMStat stat _onOpsChange", this._onOpsChange.bind(this));
        _SUBSCRIBE("OMStat stat _onPathChange", this._onPathChange.bind(this));
        _SUBSCRIBE("OMStat stat _onRevealedThreeBVChange", 
                this._onThreeBVChange.bind(this));
        _SUBSCRIBE("OMStat stat _onThreeBVChange", 
                this._onThreeBVChange.bind(this));
        _SUBSCRIBE("OMStat stat _onThreeBVRateChange", 
                this._onThreeBVRateChange.bind(this));
        _SUBSCRIBE(
                "OMStat stat _onCurIOSChange", this._onCurIOSChange.bind(this));
        _SUBSCRIBE("OMStat stat _onEstimatedIOSChange", 
                this._onEstimatedIOSChange.bind(this));
        _SUBSCRIBE(
                "OMStat stat _onCurRQPChange", this._onCurRQPChange.bind(this));
        _SUBSCRIBE("OMStat stat _onEstimatedRQPChange", 
                this._onEstimatedRQPChange.bind(this));
        _SUBSCRIBE(
                "OMStat stat _onCurQGChange", this._onCurQGChange.bind(this));
        _SUBSCRIBE("OMStat stat _onEstimatedQGChange", 
                this._onEstimatedQGChange.bind(this));
        _SUBSCRIBE("OMStat stat _onThrpChange", this._onThrpChange.bind(this));
        _SUBSCRIBE("OMStat stat _onIOEChange", this._onIOEChange.bind(this));
    }; // $._subscribe

    /**
     * Idempotent/Potential Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._makeUPKStatInvisible = function() {
        this._setUPKStatVisibility("hidden");
    }; // $._makeUPKStatInvisible

    /**
     * Idempotent/Potential Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._makeUPKStatVisible = function() {
        this._setUPKStatVisibility("visible");
    }; // $._makeUPKStatVisible

    /**
     * Idempotent/Potential Hotspot
     * @author DoubleX
     * @param {String} visibility - The stat dom style visibility
     * @since v1.0
     * @version v1.0
     */
    $._setUPKStatVisibility = function(visibility) {
        _KEYS($._STAT_DISPLAY_HIDDEN_FLAGS).filter(this._isUPKStat, this).
                forEach(this._setStatVisibilityFunc(visibility), this);
    }; // $._setUPKStatVisibility

    /**
     * Nullipotent/Potential Hotspot
     * @author DoubleX
     * @param {String} stat - A key in _STAT_DISPLAY_DOM_IDS
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isUPKStat = function(stat) {
        return this._STAT_DISPLAY_HIDDEN_FLAGS[stat];
    }; // $._isUPKStat

    /**
     * Pure function/Potential Hotspot
     * @author DoubleX
     * @param {String} visibility - The stat dom style visibility
     * @returns {Function(String)} The requested function
     * @since v1.0
     * @version v1.0
     */
    $._setStatVisibilityFunc = function(visibility) {
        /**
         * Idempotent
         * @author DoubleX
         * @param {String} stat - A key in _STAT_DISPLAY_DOM_IDS
         * @since v1.0
         * @version v1.0
         */
        return function(stat) {
            this._displayDom(stat).style.visibility = visibility;
        };
    }; // $._setStatVisibilityFunc

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} flags - The number of raised flags
     * @since v1.0
     * @version v1.0
     */
    $._onFlagsChange = function(flags) {
        this._onUnboundStatChange("flags", flags);
    }; // $._onFlagsChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} estimatedS - The estimated time in seconds
     * @since v1.0
     * @version v1.0
     */
    $._onEstimatedSChange = function(estimatedS) {
        this._onUnboundStatChange("estimatedS", estimatedS);
    }; // $._onEstimatedSChange

    /**
     * Idempotent/Potential Hotspot
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onResetClickNum = function() {
        this._onClickNumChange([0, 0]);
        this._onLeftClickNumChange([0, 0]);
        this._onMidClickNumChange([0, 0]);
        this._onRightClickNumChange([0, 0]);
    }; // $._onResetClickNum

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Array[Number](2)} clValRate - The total click number/rate
     * @since v1.0
     * @version v1.0
     */
    $._onClickNumChange = function(clValRate) {
        this._onStatValRateChange("cl", clValRate);
    }; // $._onClickNumChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Array[Number](2)} lValRate - The left click number/rate
     * @since v1.0
     * @version v1.0
     */
    $._onLeftClickNumChange = function(lValRate) {
        this._onStatValRateChange("l", lValRate);
    }; // $._onLeftClickNumChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Array[Number](2)} dValRate - The mid click number/rate
     * @since v1.0
     * @version v1.0
     */
    $._onMidClickNumChange = function(dValRate) {
        this._onStatValRateChange("d", dValRate);
    }; // $._onMidClickNumChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Array[Number](2)} rValRate - The right click number/rate
     * @since v1.0
     * @version v1.0
     */
    $._onRightClickNumChange = function(rValRate) {
        this._onStatValRateChange("r", rValRate);
    }; // $._onRightClickNumChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Array[Number](2)} corrValRate - The correct click number/rate
     * @since v1.0
     * @version v1.0
     */
    $._onRawCorrChange = function(corrValRate) {
        this._onStatValRateChange("rawCorr", corrValRate);
    }; // $._onCorrRatioChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} corr - The correct click ratio
     * @since v1.0
     * @version v1.0
     */
    $._onCorrRatioChange = function(corr) {
        this._onUnboundStatChange("corr", corr);
    }; // $._onCorrRatioChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Array[Number](2)} isIsCurMax - The no. of cur/max isIs
     * @since v1.0
     * @version v1.0
     */
    $._onIsIsChange = function(isIsCurMax) {
        this._onBoundStatChange("isIs", isIsCurMax);
    }; // $._onIsIsChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Array[Number](2)} opsCurMax - The no. of cur/max ops
     * @since v1.0
     * @version v1.0
     */
    $._onOpsChange = function(opsCurMax) {
        this._onBoundStatChange("ops", opsCurMax);
    }; // $._onOpsChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} path - The current path distance
     * @since v1.0
     * @version v1.0
     */
    $._onPathChange = function(path) {
        this._onUnboundStatChange("path", path);
    }; // $._onPathChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Array[Number](2)} threeBVCurMax - The no. of cur/max 3BV
     * @since v1.0
     * @version v1.0
     */
    $._onThreeBVChange = function(threeBVCurMax) {
        this._onBoundStatChange("threeBV", threeBVCurMax);
    }; // $._onThreeBVChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} threeBVRate - The number of 3BV/s
     * @since v1.0
     * @version v1.0
     */
    $._onThreeBVRateChange = function(threeBVRate) {
        this._onUnboundStatChange("threeBVRate", threeBVRate);
    }; // $._onThreeBVRateChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} curIOS - The number of the current ios
     * @since v1.0
     * @version v1.0
     */
    $._onCurIOSChange = function(curIOS) {
        this._onUnboundStatChange("curIOS", curIOS);
    }; // $._onCurIOSChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} estimatedIOS - The number of the estimated ios
     * @since v1.0
     * @version v1.0
     */
    $._onEstimatedIOSChange = function(estimatedIOS) {
        this._onUnboundStatChange("estimatedIOS", estimatedIOS);
    }; // $._onEstimatedIOSChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} curRQP - The number of the current rqp
     * @since v1.0
     * @version v1.0
     */
    $._onCurRQPChange = function(curRQP) {
        this._onUnboundStatChange("curRQP", curRQP);
    }; // $._onCurRQPChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} estimatedRQP - The number of the estimated rqp
     * @since v1.0
     * @version v1.0
     */
    $._onEstimatedRQPChange = function(estimatedRQP) {
        this._onUnboundStatChange("estimatedRQP", estimatedRQP);
    }; // $._onEstimatedRQPChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} curQG - The number of the current qg
     * @since v1.0
     * @version v1.0
     */
    $._onCurQGChange = function(curQG) {
        this._onUnboundStatChange("curQG", curQG);
    }; // $._onCurQGChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} estimatedQG - The number of the estimated qg
     * @since v1.0
     * @version v1.0
     */
    $._onEstimatedQGChange = function(estimatedQG) {
        this._onUnboundStatChange("estimatedQG", estimatedQG);
    }; // $._onEstimatedQGChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} thrp - The number of thrp
     * @since v1.0
     * @version v1.0
     */
    $._onThrpChange = function(thrp) {
        this._onUnboundStatChange("thrp", thrp);
    }; // $._onThrpChange

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {Number} ioe - The number of ioe
     * @since v1.0
     * @version v1.0
     */
    $._onIOEChange = function(ioe) { this._onUnboundStatChange("ioe", ioe); };

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {String} stat - A key in _STAT_DISPLAY_DOM_IDS
     * @param {Array[Number](2)} curMaxVal - The cur/max val of requested stat
     * @since v1.0
     * @version v1.0
     */
    $._onBoundStatChange = function(stat, curMaxVal) {
        this._displayDom(stat).textContent = 
                this._displayedBoundStat(stat, curMaxVal[0], curMaxVal[1]);
    }; // $._onBoundStatChange

    /**
     * Pure function/Hotspot
     * @author DoubleX
     * @param {String} stat - A key in _STAT_DISPLAY_DOM_IDS
     * @param {Number} curVal - The current value of the requested stat
     * @param {Number} maxVal - The maximum value of the requested stat
     * @returns {String} The requested displayed stat
     * @since v1.0
     * @version v1.0
     */
    $._displayedBoundStat = function(stat, curVal, maxVal) {
        return this._STAT_DISPLAY_NAMES[stat] + this._STAT_VAL_SEPARATOR + 
                curVal + this._CUR_MAX_VAL_SEPARATOR + maxVal;
    }; // $._displayedBoundStat

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {String} stat - A key in _STAT_DISPLAY_DOM_IDS
     * @param {Array[Number](2)} valRate - The val/rate of the requested stat
     * @since v1.0
     * @version v1.0
     */
    $._onStatValRateChange = function(stat, valRate) {
        this._displayDom(stat).textContent = 
                this._displayedStatValRate(stat, valRate[0], valRate[1]);
    }; // $._onStatValRateChange

    /**
     * Pure function/Hotspot
     * @author DoubleX
     * @param {String} stat - A key in _STAT_DISPLAY_DOM_IDS
     * @param {Number} val - The value of the requested stat
     * @param {Number} rate - The rate of value of the requested stat
     * @returns {String} The requested displayed stat
     * @since v1.0
     * @version v1.0
     */
    $._displayedStatValRate = function(stat, val, rate) {
        return this._STAT_DISPLAY_NAMES[stat] + this._STAT_VAL_SEPARATOR + 
                val + this._VAL_RATE_SEPARATOR + rate;
    }; // $._displayedStatValRate

    /**
     * Idempotent/Hotspot
     * @author DoubleX
     * @param {String} stat - A key in _STAT_DISPLAY_DOM_IDS
     * @param {Number} val - The value of the requested stat
     * @since v1.0
     * @version v1.0
     */
    $._onUnboundStatChange = function(stat, val) {
        this._displayDom(stat).textContent = 
                this._displayedUnboundStat(stat, val);
    }; // $._onUnboundStatChange

    /**
     * Pure function/Hotspot
     * @author DoubleX
     * @param {String} stat - A key in _STAT_DISPLAY_DOM_IDS
     * @param {Number} val - The value of the requested stat
     * @returns {String} The requested displayed stat
     * @since v1.0
     * @version v1.0
     */
    $._displayedUnboundStat = function(stat, val) {
        return this._STAT_DISPLAY_NAMES[stat] + this._STAT_VAL_SEPARATOR + val;
    }; // $._displayedUnboundStat

    /**
     * Nullipotent/Hotspot
     * @author DoubleX
     * @param {String} stat - A key in _STAT_DISPLAY_DOM_IDS
     * @return {dom} The dom for displaying the requested stat
     * @since v1.0
     * @version v1.0
     */
    $._displayDom = function(stat) {
        return document.getElementById(this._STAT_DISPLAY_DOM_IDS[stat]);
    }; // $._displayDom

})(DoubleX.PROJ.MINESWEEPER);