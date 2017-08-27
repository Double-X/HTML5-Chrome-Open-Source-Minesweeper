/**
 * A prototype for creating objects that draws all UI views with the used skin
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {OVDrawnSkin} OVDrawnSkin - The function of this prototype
 * @since v1.0
 * @version v1.0
 */
(function(OVDrawnSkin) {

    "use strict";

    var $ = OVDrawnSkin.prototype;
    $.constructor = OVDrawnSkin;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Function} subscribe - Subscribes to a component
     * @param {Function} publish - Publishes itself to its subscribers
     * @param {String} skinPre - The path storing the skin folder
     * @param {String} skin - The name of the used skin folder
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(subscribe, publish, skinPre, skin) {
        this._initReadOnlys(publish, skinPre);
        this._initCaches(skin);
        this._subscribe(subscribe);
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} publish - Publishes itself to its subscribers
     * @param {String} skinPre - The path storing the skin folder
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(publish, skinPre) {
        this._PUBLISH = publish, this._SKIN_PRE = skinPre;
    }; // $._initReadOnlys

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {String} skin - The path storing the used skin
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function(skin) { this.changeSkin(skin); };

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} subscribe - Subscribes to a component
     * @since v1.0
     * @version v1.0
     */
    $._subscribe = function(subscribe) {
        subscribe("FMProfile _onSwitchSuc", this._onChangeSkin.bind(this));
        subscribe("OCGrids _onPreRecordStat", this._onRecordStat.bind(this));
    }; // $._subscribe

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {String} skin - The path storing the used skin
     * @since v1.0
     * @version v1.0
     */
    $.changeSkin = function(skin) { this._skin = skin; };

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Dom} img - The img tag UI view to be drawn
     * @param {String} path - The path for the img to be displayed
     * @since v1.0
     * @version v1.0
     */
    $.onDraw = function(img, path) {
        var imgPath = this._imgPath(path);
        // No img file content should change before the page's killed
        if (img.src !== imgPath) img.src = imgPath;
        //
    }; // $.onDraw

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {String} path - The displayed img with its path
     * @returns {String} The requested full img path
     * @since v1.0
     * @version v1.0
     */
    $._imgPath = function(path) { return this._SKIN_PRE + this._skin + path; };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Object} profile - The profile to be its skin updated
     * @since v1.0
     * @version v1.0
     */
    $._onChangeSkin = function(profile) { this.changeSkin(profile.lastSkin); };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onRecordStat = function() {
        this._PUBLISH("OVDrawnSkin _onRecordStat", ["skin", this._skin]);
    }; // $._onRecordStat

})(DoubleX.PROJ.MINESWEEPER.OBJ.VIEW.OVDrawnSkin);