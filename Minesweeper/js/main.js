/**
 * Setups the webpage to run the whole app
 * @author DoubleX
 * @param {Cfg} Cfg - Returns the function returning all configurations
 * @param {Factory} Factory - Returns the app entry point
 * @param {RunUnitTestSuite} RunUnitTestSuite - Runs the tests
 * @param {LoadPlugins} LoadPlugins - Loads all activated plugins
 * @param {Object} PLUGINS - The plugin namespace
 * @param {Object} LIST - The relative file path having all plugin name
 * @param {Subscription} Subscription - Runs the module subscriptions
 * @since v1.0
 * @version v1.0
 */
(function(Cfg, Factory, RunUnitTestSuite, LoadPlugins, PLUGINS, LIST, 
        Subscription) {

    "use strict";

    var _IS_UNIT_TEST = true, _MODULE_DELAY = 100, _CFG = Cfg()();
    var _modules = _collectedModules();

    /**
     * Pure function
     * @author DoubleX
     * @returns {Array[Function]} The requested list of modules to be run
     * @since v1.0
     * @version v1.1
     */
    function _collectedModules() {
        var modules = [], subscribe = Subscription.subscribe;
        if (_IS_UNIT_TEST) {
            modules.push(RunUnitTestSuite(subscribe, _runNextModule));
        }
        modules.push(LoadPlugins(PLUGINS, LIST, _runNextModule));
        modules.push(
                Factory(_CFG, subscribe, Subscription.publish, _runNextModule));
        return modules;
    } // _collectedModules

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.1
     */
    function _runNextModule() {
        if (_modules.length > 0) setTimeout(_modules.shift(), _MODULE_DELAY);
    }

    window.onload = _runNextModule;

})(DoubleX.PROJ.MINESWEEPER.Cfg, DoubleX.PROJ.MINESWEEPER.Factory, 
        DoubleX.PROJ.MINESWEEPER.TEST.RunUnitTestSuite, 
        DoubleX.PROJ.MINESWEEPER.LoadPlugins, 
        DoubleX.PROJ.MINESWEEPER.PLUGINS, DoubleX.PROJ.MINESWEEPER.PLUGIN_LIST, 
        DoubleX.PROJ.MINESWEEPER.Subscription());