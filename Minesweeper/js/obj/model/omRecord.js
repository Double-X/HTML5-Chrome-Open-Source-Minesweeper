/**
 * A prototype for creating objects that stores all grid data
 * Hotspot
 * @abstract
 * @author DoubleX
 * @param {OMRecord} OMRecord - The function of this prototype
 * @since v1.0
 * @todo Split this class with 2 responsibilities into 2 with 1 each
 * @version v1.0
 */
(function(OMRecord) {

    "use strict";

    var $ = OMRecord.prototype;
    $.constructor = OMRecord;
    $._MSG_NEW_HIGHSCORES_STATS_PRE = 
            "You've made the highscores for the following stats:\n";
    $._MSG_NEW_HIGHSCORES_STATS_SEPARATOR = ", ";

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Function} subscribe - Subscribes to a component
     * @param {Object[String, Function]} fmProfile - The FMProfile API mapping
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(subscribe, fmProfile) {
        this._initReadOnlys(fmProfile);
        this._initCaches();
        this._subscribe(subscribe);
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object[String, Function]} fmProfile - The FMProfile API mapping
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(fmProfile) { this._FM_PROFILE = fmProfile; };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function() { this._record = {}; };

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} subscribe - Subscribes to a component
     * @since v1.0
     * @version v1.0
     */
    $._subscribe = function(subscribe) {
        subscribe("OCGrids _initCaches", this._initCaches.bind(this));
        subscribe("OCGrids _recordStat", this._onRecordStat.bind(this));
        subscribe("OVDrawnSkin _onRecordStat", this._onRecordStat.bind(this));
        subscribe("OVTimer _onRecordStat", this._onRecordStat.bind(this));
        subscribe("OCGrids _onPostRecordStat", this._addRecord.bind(this));
    }; // $._subscribe

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array(2)} keyVal - The array containing the key-value pair
     * @since v1.0
     * @version v1.0
     */
    $._onRecordStat = function(keyVal) { this._record[keyVal[0]] = keyVal[1]; };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._addRecord = function() {
        this._FM_PROFILE.addRecord(this._timestamp(), this._record, 
                this._addRecordSuc.bind(this), this._addRecordFail.bind(this));
    }; // $._addRecord

    /**
     * @author DoubleX
     * @returns {String} The requested timestamp
     * @since v1.0
     * @version v1.0
     */
    $._timestamp = function() { return new Date().toString(); };

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation success
     * @param {Array[String]} newHighscoresStats - The list of stats having
     *                                              new highscores
     * @since v1.0
     * @version v1.0
     */
    $._addRecordSuc = function(msg, newHighscoresStats) {
        console.info(msg);
        this._onShowNewHighscoresStats(newHighscoresStats);
    }; // $._addRecordSuc

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array[String]} newHighscoresStats - The list of stats having
     *                                              new highscores
     * @since v1.0
     * @version v1.0
     */
    $._onShowNewHighscoresStats = function(newHighscoresStats) {
        if (!this._hasNewHighscoresStats(newHighscoresStats)) return;
        this._showNewHighscoresStats(newHighscoresStats);
    }; // $._onShowNewHighscoresStats

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[String]} newHighscoresStats - The list of stats having
     *                                              new highscores
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._hasNewHighscoresStats = function(newHighscoresStats) {
        return newHighscoresStats.length > 0;
    }; // $._hasNewHighscoresStats

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array[String]} newHighscoresStats - The list of stats having
     *                                              new highscores
     * @since v1.0
     * @version v1.0
     */
    $._showNewHighscoresStats = function(newHighscoresStats) {
        var msgNewHighscoresStats = 
                this._msgNewHighscoresStats(newHighscoresStats);
        alert(msgNewHighscoresStats);
        console.info(msgNewHighscoresStats);
    }; // $._showNewHighscoresStats

    /**
     * Nullipotent
     * @author DoubleX
     * @param {Array[String]} newHighscoresStats - The list of stats having
     *                                              new highscores
     * @returns {String} The requested message
     * @since v1.0
     * @version v1.0
     */
    $._msgNewHighscoresStats = function(newHighscoresStats) {
        return this._MSG_NEW_HIGHSCORES_STATS_PRE + newHighscoresStats.join(
                this._MSG_NEW_HIGHSCORES_STATS_SEPARATOR);
    }; // $._msgNewHighscoresStats

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation failure
     * @since v1.0
     * @version v1.0
     */
    $._addRecordFail = function(msg) { console.warn(msg); };

})(DoubleX.PROJ.MINESWEEPER.OBJ.MODEL.OMRecord);