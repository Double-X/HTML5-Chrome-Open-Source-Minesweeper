/**
 * This function should be called exactly once per page load
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {Dom} NEW_GAME_BTN - The new game button img tag
 * @param {Function(Dom, String)} ON_DRAW - The callback of the object drawing
 *                                           views
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mappings
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.FUNC.VIEW.FVNewGameBtn = function(
        NEW_GAME_BTN, ON_DRAW, PUBLISH) {

    "use strict";

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.VIEW.FVNewGameBtn;

    $._PATH_PRE = "/newGameBtn/newGameBtn", $._PATH_POST = ".png";
    $._CLICKED_GRID_IMG_MID = "ClickedGrid";
    $._IMG_HELD_MID = "Held", $._IMG_UNHELD_MID = "Unheld";
    $._IMG_LOST_MID = "Lost", $._IMG_WON_MID = "Won";

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onUnhold = function() {
        ON_DRAW(NEW_GAME_BTN, $._imgPath($._IMG_UNHELD_MID));
    }; // $.onUnhold

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onHold = function() {
        ON_DRAW(NEW_GAME_BTN, $._imgPath($._IMG_HELD_MID));
    }; // $.onHold

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onclickGrid = function() {
        ON_DRAW(NEW_GAME_BTN, $._imgPath($._CLICKED_GRID_IMG_MID));
    }; // $.onclickGrid

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onLose = function() {
        ON_DRAW(NEW_GAME_BTN, $._imgPath($._IMG_LOST_MID));
    }; // $.onLose

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onWin = function() {
        ON_DRAW(NEW_GAME_BTN, $._imgPath($._IMG_WON_MID));
    }; // $.onWin

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {String} path - The displayed img name suffix
     * @returns {String} The requested full img path
     * @since v1.0
     * @version v1.0
     */
    $._imgPath = function(path) { return $._PATH_PRE + path + $._PATH_POST; };

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = {
        onUnhold: $.onUnhold,
        onHold: $.onHold,
        onclickGrid: $.onclickGrid,
        onLose: $.onLose,
        onWin: $.onWin
    };
    //
    PUBLISH("FVNewGameBtn", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.VIEW.FVNewGameBtn