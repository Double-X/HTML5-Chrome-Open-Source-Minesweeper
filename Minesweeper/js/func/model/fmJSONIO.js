/**
 * This function should be called exactly once per page load
 * Potential Hotspot/Pure function
 * @author DoubleX
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMJSONIO = function(PUBLISH) {

    "use strict";

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMJSONIO;

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} name - The name of the JSON to be read
     * @since v1.0
     * @version v1.0
     */
    $.delJSON = function(name) { localStorage.removeItem(name); };

    /**
     * @author DoubleX
     * @interface
     * @param {String} name - The name of the JSON to be written
     * @param {String} contents - The contents of the JSON to be written
     * @since v1.0
     * @version v1.0
     */
    $.exportJSON = function(name, contents) {
        $._exportJSONDom(name, contents).dispatchEvent($._exportJSONEvent());
    }; // $.exportJSON

    /**
     * @author DoubleX
     * @interface
     * @param {File} file - The json file to be imported
     * @param {Function(String)} callback - Returns the requested json contents
     * @param {Function(Event)} errback - Returns the failure event
     * @since v1.0
     * @version v1.0
     */
    $.importJSON = function(file, callback, errback) {
        var fileReader = new FileReader();
        fileReader.onerror = errback;
        fileReader.onload = $._onImportJSON(callback, fileReader);
        fileReader.readAsText(file);
    }; // $.importJSON

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @interface
     * @param {String} name - The name of the JSON to be read
     * @returns {Object/Nullable} The requested JSON contents
     * @since v1.0
     * @version v1.0
     */
    $.readJSON = function(name) {
        var contents = localStorage.getItem(name);
        return contents ? JSON.parse(contents) : null;
    }; // $.readJSON

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {String} name - The name of the JSON to be written
     * @param {Object} obj - The contents of the JSON to be written
     * @since v1.0
     * @version v1.0
     */
    $.writeJSON = function(name, obj) {
        localStorage.setItem(name, JSON.stringify(obj));
    }; // $.writeJSON

    /**
     * Pure function
     * @author DoubleX
     * @param {Function(String)} callback - Returns the requested json contents
     * @param {FileReader} fileReader - Reads the json file to be imported
     * @returns {Function()} The requested function
     * @since v1.0
     * @version v1.0
     */
    $._onImportJSON = function(callback, fileReader) {
        /**
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        return function(){ callback(fileReader.result); };
    }; // $._onImportJSON

    /**
     * Nullipotent
     * @author DoubleX
     * @param {String} name - The name of the JSON to be written
     * @param {String} contents - The contents of the JSON to be written
     * @returns {Dom} The requested dom
     * @since v1.0
     * @version v1.0
     */
    $._exportJSONDom = function(name, contents) {
        var a = document.createElement('a');
        a.download = name + ".json", a.href = window.URL.createObjectURL(
                new Blob([contents], {type: 'text/json'}));
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        return a;
    }; // $._exportJSONDom

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Event} The requested event
     * @since v1.0
     * @version v1.0
     */
    $._exportJSONEvent = function() {
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, 
                false, false, false, false, 0, null);
        return event;
    }; // $._exportJSONEvent

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = {
        delJSON: $.delJSON,
        exportJSON: $.exportJSON,
        importJSON: $.importJSON,
        readJSON: $.readJSON,
        writeJSON: $.writeJSON
    };
    //
    PUBLISH("FMJSONIO", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMJSONIO