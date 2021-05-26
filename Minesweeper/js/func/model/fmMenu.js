/**
 * This function should be called exactly once per page load
 * Pure function
 * @author DoubleX
 * @param {Object[String, Function(Number, Number, Number)]}
 *          IS_INVALID_BOARD_PARAMS - The Invalid parameters mapping
 * @param {Array[String]} SKINS - The list of available skin names
 * @param {Object[String, Function]} FMJSONIO - The FMJSONIO API mapping
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.1
 */
DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMMenu = function(
        IS_INVALID_BOARD_PARAMS, SKINS, FMJSONIO, PUBLISH) {

    "use strict";

    var _INVALID_BOARD_MSGS = Object.keys(IS_INVALID_BOARD_PARAMS);

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMMenu;

    $._MSG_AVAIL_SKINS_PRE = "Please choose among ";
    $._MSG_AVAIL_SKINS_SEPARATOR = ", ", $._MSG_AVAIL_SKINS_POST = " :";
    $._MSG_BOARD_PARAM_PRE = "Please enter the width, height and number of mines of the board, each separated by nonnumbers.For instance, 30 16 99 means the board with width 30 and height 16 will have 99 mines.\n";
    $._MSG_BOARD_PARAM_CHECK_RESULT_SEPARATOR = "\n";

    /**
     * Pure function
     * @author DoubleX
     * @interface
     * @param {String} skin - The skin name to be checked
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isAvailableSkin = function(skin) { return SKINS.indexOf(skin) >= 0; };

    /**
     * Pure function
     * @author DoubleX
     * @interface
     * @returns {String} The requested message
     * @since v1.0
     * @version v1.0
     */
    $.msgAvailableSkins = function() {
        return $._MSG_AVAIL_SKINS_PRE + SKINS.join(
                $._MSG_AVAIL_SKINS_SEPARATOR) + $._MSG_AVAIL_SKINS_POST;
    }; // $.msgAvailableSkins

    /**
     * Pure function
     * @author DoubleX
     * @interface
     * @returns {String} The requested message
     * @since v1.0
     * @version v1.0
     */
    $.msgNewWHMineNum = function() {
        // Passes obviously invalid arguments to get all validation messages
        return $._MSG_BOARD_PARAM_PRE + $.msgBoardParamCheckResults(0, 0, 0);
        //
    }; // $.msgNewWHMineNum

    /**
     * Pure function
     * @author DoubleX
     * @interface
     * @param {Number/Nullable} w - The number of cols constituting the grids
     * @param {Number/Nullable} h - The number of rows constituting the grids
     * @param {Number/Nullable} mineNum - The number of mines in the grids
     * @returns {String} The list of board param check result messages
     * @since v1.0
     * @version v1.1
     */
    $.msgBoardParamCheckResults = function(w, h, mineNum) {
        return _INVALID_BOARD_MSGS.filter($._isInvalidBoardParam.bind($, +w, +h, 
                +mineNum)).join($._MSG_BOARD_PARAM_CHECK_RESULT_SEPARATOR);
    }; // $.msgBoardParamCheckResults

    /**
     * Pure function
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @param {String} invalidBoardMsg - The invalidity description
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isInvalidBoardParam = function(w, h, mineNum, invalidBoardMsg) {
        return IS_INVALID_BOARD_PARAMS[invalidBoardMsg](w, h, mineNum);
    }; // $._isInvalidBoardParam

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = {
        isAvailableSkin: $.isAvailableSkin,
        msgAvailableSkins: $.msgAvailableSkins,
        msgNewWHMineNum: $.msgNewWHMineNum,
        msgBoardParamCheckResults: $.msgBoardParamCheckResults
    };
    //
    PUBLISH("FMMenu", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMMenu