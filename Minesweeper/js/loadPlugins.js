/**
 * Loads all activated plugins to be run with the core files in the game
 * Idempotent
 * @author DoubleX
 * @param {Object} PLUGINS - The plugin namespace
 * @param {Object} LIST - The relative file path having all plugin name
 * @param {Function} CALLBACK - Called when all plugins are loaded
 * @since v1.0
 * @version v1.1
 */
DoubleX.PROJ.MINESWEEPER.LoadPlugins = function(PLUGINS, LIST, CALLBACK) {

    "use strict";

    var _KEYS = Object.keys;
    var _DEPARTMENT_DELAY = 50, _COMPONENT_DELAY = 10;
    // Stores the relative file path leading to the plugin path
    var _BASE_PATH = "js/plugins/";
    //
    // The mapping from the plugin modules to their corresponding file paths
    var _COMPONENT_PATHS = {
        // This ordering must be kept or errors will probably occur
        declarations: _BASE_PATH + 'declarations/',
        configurations: _BASE_PATH + 'configurations/',
        implementations: _BASE_PATH + 'implementations/',
        unitTests: _BASE_PATH + 'unitTests/',
        compatibilities: _BASE_PATH + 'compatibilities/'
        //
    };
    //

    var _unloadedDepartments = _KEYS(_COMPONENT_PATHS);
    var _curUnloadedDepartmentComponents = [];

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    function run() { _loadNextDepartment(); };

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    function _loadNextDepartment() {
        if (_hasNoNextDepartment()) return _onLoadFinish();
        _loadDepartment(_unloadedDepartments.shift());
    }; // _loadNextDepartment

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    function _hasNoNextDepartment() {
        return _unloadedDepartments.length <= 0;
    }; // _hasNoNextDepartment

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} department - The name of the department
     * @since v1.0
     * @version v1.1
     */
    function _loadDepartment(department) {
        _setCurComponent(department);
        setTimeout(_loadNextComponent.bind(undefined, 
                _COMPONENT_PATHS[department]), _DEPARTMENT_DELAY);
    }; // _loadDepartment

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} department - The name of the department
     * @since v1.0
     * @version v1.0
     */
    function _setCurComponent(department) {
        _curUnloadedDepartmentComponents = LIST[department];
    }; // _setCurComponent

    /**
     * @author DoubleX
     * @param {String} path - The path of the plugin component
     * @since v1.0
     * @version v1.0
     */
    function _loadNextComponent(path) {
        if (_isFinishLoadingCurComponent()) return _loadNextDepartment();
        _loadComponent(path, _curUnloadedDepartmentComponents.shift());
    }; // _loadNextComponent

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    function _isFinishLoadingCurComponent() {
        return _curUnloadedDepartmentComponents.length <= 0;
    }; // _isFinishLoadingCurComponent

    /**
     * @author DoubleX
     * @param {String} path - The path of the plugin component
     * @param {String} component - The name of the plugin component
     * @since v1.0
     * @version v1.1
     */
    function _loadComponent(path, component) {
        _appendComponent(path, component);
        setTimeout(_loadNextComponent.bind(undefined, path), _COMPONENT_DELAY);
    }; // _loadComponent

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} path - The path of the plugin component
     * @param {String} component - The name of the plugin component
     * @since v1.0
     * @version v1.0
     */
    function _appendComponent(path, component) {
        var element = document.createElement('script');
        element.type = 'application/javascript';
        element.src = path + component + '.js';
        document.body.appendChild(element);
    }; // _loadDepartment

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    function _onLoadFinish() {
        _checkAllNeededPlugins();
        CALLBACK();
    }; // _onLoadFinish

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    function _checkAllNeededPlugins() {
        _KEYS(PLUGINS).forEach(_checkNeededPlugins);
    }; // _checkAllNeededPlugins

    /**
     * @author DoubleX
     * @param {String} plugin - The name of the plugin container
     * @since v1.0
     * @version v1.1
     */
    function _checkNeededPlugins(plugin) {
        _KEYS(PLUGINS[plugin].neededPlugins).forEach(
                _checkNeededPlugin.bind(undefined, plugin));
    }; // _checkNeededPlugins

    /**
     * @author DoubleX
     * @param {String} plugin - The name of the plugin container
     * @param {String} neededPlugin - The name of the needed one
     * @since v1.0
     * @version v1.0
     */
    function _checkNeededPlugin(plugin, neededPlugin) {
        if (PLUGINS[plugin].neededPlugins[neededPlugin]) return;
        // Ensures users won't miss such an important message
        var msg = 'Plugin ' + plugin + ' needs plugin ' + neededPlugin;
        alert(msg);
        console.info(msg);
        //
    }; // _checkNeededPlugin

    return run;

}; // DoubleX.PROJ.MINESWEEPER.LoadPlugins