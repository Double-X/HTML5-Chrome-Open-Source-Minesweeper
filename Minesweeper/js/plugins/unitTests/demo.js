/**
 * Runs the unit test suite for the plugin implementation on gathering stats
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.1
 */
(function(namespace) {

    "use strict";

    var _STAT = namespace.PLUGINS.STAT;
    if (!_STAT) return;

    var _PLUGIN = namespace.PLUGINS.DEMO, _UNIT_TEST = _PLUGIN.unitTest;
    var _SUBSCRIBE = _PLUGIN.Subscription.subscribe;
    var $ = _STAT.OMStat.prototype;
    var $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;

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
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._subscribe = function() {
        _SUBSCRIBE("OMDemo demo _onDemoEnd", $$$._onDemoEnd.bind(this));
    }; // $$$._subscribe

    /**
     * No-op
     * @author DoubleX
     * @param {Object} stats - The demo stat mapping
     * @since v1.0
     * @version v1.1
     */
    $$$._onDemoEnd = function(stats) {
        Object.keys(stats).forEach($$$._checkStat.bind(this, stats));
    }; // $$$._onDemoEnd

    /**
     * No-op
     * @author DoubleX
     * @param {Object} stats - The demo stat mapping
     * @param {String} stat - The name of the stat to be checked
     * @since v1.0
     * @version v1.0
     */
    $$$._checkStat = function(stats, stat) {
        // Ensures that the demo's valid by checking recorded vs replayed stats
        var replayedStat = $$$._replayedStat.call(this, stat);
        if (!replayedStat) return;
        console.info("DoubleX.PROJ.MINESWEEPER.PLUGINS.DEMO.unitTest.new._checkStat");
        console.info("stat: " + stat);
        console.info("stats[stat]: " + stats[stat]);
        console.info("replayedStat: " + replayedStat);
        console.info(replayedStat === stats[stat] ? "Passed!" : "Failed!");
        //
    }; // $$$._checkStat

    /**
     * Nullipotent
     * @author DoubleX
     * @param {String} stat - The name of the stat to be checked
     * @returns {Number/Nullable} The requetsed replayed stat
     * @since v1.0
     * @version v1.0
     */
    $$$._replayedStat = function(stat) {
        // Just checking several of the recorded stat's enough to check validity
        var name1 = "_" + stat, func1 = this[name1];
        if (func1 && func1.length <= 0) return func1.call(this);
        var name2 = "_cur" + stat.charAt(0).toUpperCase() + stat.slice(1);
        var func2 = this[name2];
        if (func2 && func2.length <= 0) return func2.call(this);
        var name3 = "_cur" + stat.toUpperCase(), func3 = this[name3];
        if (func3 && func3.length <= 0) return func3.call(this);
        return null;
        //
    }; // $$$._replayedSta

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Runs the unit test suite for the plugin implementation on handling demo data
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _PLUGIN = namespace.PLUGINS.DEMO, _UNIT_TEST = _PLUGIN.unitTest;
    var _SUBSCRIPTION = _PLUGIN.Subscription;
    var _SUBSCRIBE = _SUBSCRIPTION.subscribe, _PUBLISH = _SUBSCRIPTION.publish;
    var $ = _PLUGIN.OMDemo.prototype;
    var $$ = _UNIT_TEST.orig, $$$ = _UNIT_TEST.new;

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onDemoEnd = $._onDemoEnd;
    $._onDemoEnd = function() {
        $$._onDemoEnd.call(this);
        _PUBLISH("OMDemo demo _onDemoEnd", this._stats());
    }; // $._onDemoEnd

})(DoubleX.PROJ.MINESWEEPER);