/**
 * Nullipotent
 * @author DoubleX
 * @returns {Function() => Object} The requested function
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.Cfg = function() {

    "use strict";

    // The menu UI views
    var _MENU = {
        menu: document.getElementById("menu"),
        importProfile: document.getElementById("importProfile"),
        profiles: document.getElementById("profiles"),
        opts: document.getElementById("opts"),
        debug: document.getElementById("debug"),
        help: document.getElementById("help")
    };
    //
    // The top section UI views
    var _TOP_BAR = {
        topBar: document.getElementById("topBar"),
        heightRatio: 0.1, // 10% of the used board screen height
        remainMineNum: document.getElementById("remainMineNum"),
        newGameBtn: document.getElementById("newGameBtn"),
        timer: document.getElementById("timer")
    };
    //
    var _MSG_INVALID_W = "The minimum width is 3";
    var _MSG_INVALID_H = "The minimum height is 3";
    var _MSG_INVALID_MINE_NUM = "The number of mines must be positive and not exceed (width - 1)(height - 1)";
    var _SKIN_PRE = "skins/"; // The path storing all skins
    var $ = DoubleX.PROJ.MINESWEEPER.Cfg;

    // The UI views
    $._DOMS = {
        board: document.getElementsByTagName("BODY")[0],
        boardWRate: 0.8, // Can be up to 100% of the entire screen width
        boardHRate: 0.8, // Can be up to 100% of the entire screen height
        menu: _MENU,
        topBar: _TOP_BAR,
        grids: document.getElementById("grids"),
        bottomBar: document.getElementById("bottomBar"),
        profileNameRegion: document.getElementById("profileNameRegion")
    };
    //
    $._SKINS = ["default", "nn"]; // The list of available skin names
    $._IS_INVALID_BOARD_PARAMS = {};

    /**
     * Pure function
     * @author DoubleX
     * @interface
     * @returns {Object} The requested configuration mapping
     * @since v1.0
     * @version v1.0
     */
    $.cfg = function() {
        return {
            doms: $._DOMS,
            isInvalidBoardParams: $._IS_INVALID_BOARD_PARAMS,
            lastW: $._lastW(),
            lastH: $._lastH(),
            lastMineNum: $._lastMineNum(),
            lastNearRa: $._lastNearRa(),
            lastProfileName: $._lastProfileName(),
            lastProfileRegion: $._lastProfileRegion(),
            lastSkin: $._lastSkin(),
            skinPre: _SKIN_PRE,
            skins: $._SKINS
        };
    }; // cfg

    /**
     * Pure function
     * @author DoubleX
     * @interface
     * @param {Number} w - The number of cols constituting the grids
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isInvalidW = function(w) { return isNaN(w) || w < 5; };

    /**
     * Pure function
     * @author DoubleX
     * @interface
     * @param {Number} h - The number of rows constituting the grids
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isInvalidH = function(h) { return isNaN(h) || h < 5; };

    /**
     * Pure function
     * @author DoubleX
     * @interface
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isInvalidMineNum = function(w, h, mineNum) {
        if (isNaN(w) || isNaN(h) || isNaN(mineNum)) return true;
        return mineNum <= 0 || mineNum > (w - 1) * (h - 1);
    }; // isInvalidMineNum

    /**
     * Pure function
     * @author DoubleX
     * @returns {Number} The requested width
     * @since v1.0
     * @version v1.0
     */
    $._defaultW = function() { return 30; };

    /**
     * Pure function
     * @author DoubleX
     * @returns {Number} The requested height
     * @since v1.0
     * @version v1.0
     */
    $._defaultH = function() { return 16; };

    /**
     * Pure function
     * @author DoubleX
     * @returns {Number} The requested mine num
     * @since v1.0
     * @version v1.0
     */
    $._defaultMineNum = function() { return 99; };

    /**
     * Pure function
     * @author DoubleX
     * @returns {Number} The requested distance regarded as nearby
     * @since v1.0
     * @version v1.0
     */
    $._defaultNearRa = function() {
        // Don't change this unless you really know what you're truly doing
        return 1;
        //
    }; // $._defaultNearRa

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {String} The requested profile name to be shown
     * @since v1.0
     * @version v1.0
     */
    $._defaultProfileName = function() { return "No Profile"; };

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {String} The requested profile region to be shown
     * @since v1.0
     * @version v1.0
     */
    $._defaultProfileRegion = function() { return "No Region"; };

    /**
     * Pure function
     * @author DoubleX
     * @returns {String} The requested name of the folder of the skin
     * @since v1.0
     * @version v1.0
     */
    $._defaultSkin = function() { return "default"; };

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Number} The requested width
     * @since v1.0
     * @version v1.0
     */
    $._lastW = function() {
        // Don't change this unless you really know what you're truly doing
        return $._lastCfg("lastW") || $._defaultW();
        //
    }; // $._lastW

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Number} The requested height
     * @since v1.0
     * @version v1.0
     */
    $._lastH = function() {
        // Don't change this unless you really know what you're truly doing
        return $._lastCfg("lastH") || $._defaultH();
        //
    }; // $._lastH

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Number} The requested mine num
     * @since v1.0
     * @version v1.0
     */
    $._lastMineNum = function() {
        // Don't change this unless you really know what you're truly doing
        return $._lastCfg("lastMineNum") || $._defaultMineNum();
        //
    }; // $._lastMineNum

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Number} The requested distance regarded as nearby
     * @since v1.0
     * @version v1.0
     */
    $._lastNearRa = function() {
        // Don't change this unless you really know what you're truly doing
        return $._lastCfg("lastNearRa") || $._defaultNearRa();
        //
    }; // $._lastNearRa

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {String} The requested profile name to be shown
     * @since v1.0
     * @version v1.0
     */
    $._lastProfileName = function() {
        // Don't change this unless you really know what you're truly doing
        return $._lastCfg("profileName") || $._defaultProfileName();
        //
    }; // $._lastProfileName

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {String} The requested profile region to be shown
     * @since v1.0
     * @version v1.0
     */
    $._lastProfileRegion = function() {
        // Don't change this unless you really know what you're truly doing
        return $._lastCfg("profileRegion") || $._defaultProfileRegion();
        //
    }; // $._lastProfileRegion

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {String} The requested name of the folder of the skin
     * @since v1.0
     * @version v1.0
     */
    $._lastSkin = function() {
        // Don't change this unless you really know what you're truly doing
        return $._lastCfg("lastSkin") || $._defaultSkin();
        //
    }; // $._lastSkin

    /**
     * Nullipotent
     * @author DoubleX
     * @param {String} cfg - The name of the configuration to have its last val
     * @returns {Number/Nullable} The requested width
     * @since v1.0
     * @version v1.0
     */
    $._lastCfg = function(cfg) {
        // Don't change this unless you really know what you're truly doing
        var lastUsedProfile = 
                localStorage.getItem("(Profile)Last Used Profile");
        if (!lastUsedProfile) return null;
        var profile = localStorage.getItem(
                "(Profile)" + JSON.parse(lastUsedProfile).profileName);
        return profile ? JSON.parse(profile)[cfg] : null;
        //
    }; // $._lastCfg

    $._IS_INVALID_BOARD_PARAMS[_MSG_INVALID_W] = $.isInvalidW;
    $._IS_INVALID_BOARD_PARAMS[_MSG_INVALID_H] = $.isInvalidH;
    $._IS_INVALID_BOARD_PARAMS[_MSG_INVALID_MINE_NUM] = $.isInvalidMineNum;

    return $.cfg; // The Cfg API

}; // DoubleX.PROJ.MINESWEEPER.Cfg