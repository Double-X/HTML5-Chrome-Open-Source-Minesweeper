/**
 * Runs the unit test suite for the plugin implementation on gathering stats
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCGrids.prototype;
    var _PLUGIN = namespace.PLUGINS.STAT, $$ = _PLUGIN.unitTest.orig;
    var _PUBLISH = _PLUGIN.Subscription.publish;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onWin = $._onWin;
    $._onWin = function() {
        $$._onWin.call(this);
        // Added to run the unit test to check for stat consistencies on victory
        _PUBLISH("OCGrids stat _onWin", null);
        //
    }; // $._onWin

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Runs the unit test suite for the plugin implementation on gathering stats
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _PLUGIN = namespace.PLUGINS.STAT, _UNIT_TEST = _PLUGIN.unitTest;
    var _SUBSCRIBE = _PLUGIN.Subscription.subscribe;
    var $ = _PLUGIN.OMStat.prototype;
    var $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._initCaches = $._initCaches;
    $._initCaches = function() {
        $$._initCaches.call(this);
        this._isNF = true; // Added to let unit tests check the NF cases
    }; // $._initCaches

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} subscribe - Subscribes to a component
     * @since v1.0
     * @version v1.0
     */
    $$._subscribe = $._subscribe;
    $._subscribe = function(subscribe) {
        $$._subscribe.call(this, subscribe);
        $$$._subscribe.call(this); // Added to check for the stat consistencies
    }; // $._subscribe

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} flagNum - The number of raised flags
     * @since v1.0
     * @version v1.0
     */
    $$._onFlagsChange = $._onFlagsChange;
    $._onFlagsChange = function(flagNum) {
        $$._onFlagsChange.call(this, flagNum);
        this._isNF = false; // Added to let unit tests check the NF cases
    }; // $._onFlagsChange

    /**
     * @author DoubleX
     * @returns {Number} The requested IOE
     * @since v1.0
     * @version v1.0
     */
    $$._ioe = $._ioe;
    $._ioe = function() {
        // Edited to check the validity of the original function result
        var ioe = $$._ioe.call(this);
        $$$._ioe.call(this, ioe);
        return ioe;
        //
    }; // $._ioe

    /**
     * @author DoubleX
     * @returns {Number} The requested Corr
     * @since v1.0
     * @version v1.0
     */
    $$._corrRatio = $._corrRatio;
    $._corrRatio = function() {
        // Edited to check the validity of the original function result
        var corrRatio = $$._corrRatio.call(this);
        $$$._corrRatio.call(this, corrRatio);
        return corrRatio;
        //
    }; // $._corrRatio

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested Thrp
     * @since v1.0
     * @version v1.0
     */
    $$._thrp = $._thrp;
    $._thrp = function() {
        // Edited to check the validity of the original function result
        var thrp = $$._thrp.call(this);
        $$$._thrp.call(this, thrp);
        return thrp;
        //
    }; // $._thrp

    /**
     * @author DoubleX
     * @returns {Number} The requested estimated time in seconds
     * @since v1.0
     * @version v1.0
     */
    $$._estimatedS = $._estimatedS;
    $._estimatedS = function() {
        // Edited to check the validity of the original function result
        var estimatedS = $$._estimatedS.call(this);
        // $$$._estimatedS.call(this, estimatedS);
        return estimatedS;
        //
    }; // $._estimatedS

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._subscribe = function() {
        _SUBSCRIBE("OCGrids stat _onWin", $$$._estimatedSWin.bind(this));
        _SUBSCRIBE("OCGrids stat _onWin", $$$._estimatedRQPWin.bind(this));
        _SUBSCRIBE("OCGrids stat _onWin", $$$._estimatedIOSWin.bind(this));
        _SUBSCRIBE("OCGrids stat _onWin", $$$._estimatedQGWin.bind(this));
    }; // $$$._subscribe

    /**
     * Potential Hotspot/No-op
     * @since v1.0
     * @version v1.0
     */
    $$$._estimatedSWin = function() {
        var estimatedS = this._estimatedS();
        // It's not tautological as it exposes a hidden assumption
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.STAT.unitTest.new._estimatedSWin");
        console.info("estimatedS: " + estimatedS);
        console.info("this._elapsedS: " + this._elapsedS);
        console.info(estimatedS === this._elapsedS ? "Passed!" : "Failed!");
        //
    }; // $$$._estimatedSWin

    /**
     * Potential Hotspot/No-op
     * @since v1.0
     * @version v1.0
     */
    $$$._estimatedRQPWin = function() {
        var curRQP = this._curRQP(), estimatedRQP = this._estimatedRQP();
        // It's not tautological as it exposes a hidden assumption
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.STAT.unitTest.new._estimatedRQPWin");
        console.info("curRQP: " + curRQP);
        console.info("estimatedRQP: " + estimatedRQP);
        console.info(estimatedRQP === curRQP ? "Passed!" : "Failed!");
        //
    }; // $$$._estimatedRQPWin

    /**
     * Potential Hotspot/No-op
     * @since v1.0
     * @version v1.0
     */
    $$$._estimatedIOSWin = function() {
        var curIOS = this._curIOS(), estimatedIOS = this._estimatedIOS();
        // It's not tautological as it exposes a hidden assumption
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.STAT.unitTest.new._estimatedIOSWin");
        console.info("curIOS: " + curIOS);
        console.info("estimatedIOS: " + estimatedIOS);
        console.info(estimatedIOS === curIOS ? "Passed!" : "Failed!");
        //
    }; // $$$._estimatedIOSWin

    /**
     * Potential Hotspot/No-op
     * @since v1.0
     * @version v1.0
     */
    $$$._estimatedQGWin = function() {
        var curQG = this._curQG(), estimatedQG = this._estimatedQG();
        // It's not tautological as it exposes a hidden assumption
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.STAT.unitTest.new._estimatedQGWin");
        console.info("curQG: " + curQG);
        console.info("estimatedQG: " + estimatedQG);
        console.info(estimatedQG === curQG ? "Passed!" : "Failed!");
        //
    }; // $$$._estimatedQGWin

    /**
     * Hotspot/No-op
     * @param {Number} ioe - The number of ioe
     * @since v1.0
     * @version v1.0
     */
    $$$._ioe = function(ioe) {
        // It's not tautological as it exposes a hidden assumption
        var thrp = this._thrp();
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.STAT.unitTest.new._ioe");
        console.info("ioe: " + ioe);
        console.info("thrp: " + thrp);
        console.info(ioe >= 0 && ioe <= thrp ? "Passed!" : "Failed!");
        if (!this._isNF) return;
        var corrRatio = this._corrRatio();
        console.info("corrRatio: " + corrRatio);
        console.info(ioe <= corrRatio ? "NF Passed!" : "NF Failed!");
        //
    }; // $$$._ioe

    /**
     * Hotspot/No-op
     * @param {Number} corrRatio - The correct click ratio
     * @since v1.0
     * @version v1.0
     */
    $$$._corrRatio = function(corrRatio) {
        // It's not tautological as it exposes a hidden assumption
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.STAT.unitTest.new._corrRatio");
        console.info("corrRatio: " + corrRatio);
        console.info(corrRatio >= 0 && corrRatio <= 1 ? "Passed!" : "Failed!");
        //
    }; // $$$._corrRatio

    /**
     * Hotspot/No-op
     * @param {Number} thrp - The effective click ratio
     * @since v1.0
     * @version v1.0
     */
    $$$._thrp = function(thrp) {
        // It's not tautological as it exposes a hidden assumption
        console.info(
                "DoubleX.PROJ.MINESWEEPER.PLUGINS.STAT.unitTest.new._thrp");
        console.info("thrp: " + thrp);
        console.info(thrp >= 0 ? "Passed!" : "Failed!");
        if (this._isNF) console.info(thrp <= 1 ? "NF Passed!" : "NF Failed!");
        //
    }; // $$$._thrp

    /**
     * Hotspot/No-op
     * @param {Number} estimatedS - The estimated number of seconds
     * @since v1.0
     * @version v1.0
     */
    $$$._estimatedS = function(estimatedS) {
        // It's not tautological as it exposes a hidden assumption
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.STAT.unitTest.new._estimatedS");
        console.info("estimatedS: " + estimatedS);
        console.info("this._elapsedS: " + this._elapsedS);
        console.info(estimatedS >= this._elapsedS ? "Passed!" : "Failed!");
        //
    }; // $$$._estimatedS

})(DoubleX.PROJ.MINESWEEPER);