/**
 * This function should be called exactly once per page load
 * @author DoubleX
 * @param {Object[String, Function]} FMProfile - The FMProfile API mapping
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.FUNC.CONTROLLER.FCRecords = function(
        FMProfile, PUBLISH) {

    "use strict";

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.CONTROLLER.FCRecords;

    $._MSG_BOARD_SPEC = "Please input the width, height, number of mines, skin name(the choices written in lower cases from the Skins Options) and whether flags are used(true/false) as the board specifications, each separated by comma to get the corresponding highscores.\n\
E.g.: W30H16M99SnnFfalse means the width, height, number of mines, skin name and whether flags are used are 30, 16, 99, nn and false respectively.";

    /**
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.1
     */
    $.viewHighscores = function() {
        var boardSpec = $._boardSpec();
        if (boardSpec) FMProfile.giveHighscores(
                boardSpec, $._viewHighscoresSuc, $._viewHighscoresFail);
    }; // $.viewHighscores

    /**
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.viewHistory = function() {
        var boardSpec = $._boardSpec();
        if (!boardSpec) return;
        FMProfile.giveHistory(boardSpec, $._viewHistorySuc, $._viewHistoryFail);
    }; // $.viewHistory

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object} highscore - The highscore with the requested boardSpec
     * @since v1.0
     * @version v1.0
     */
    $._viewHighscoresSuc = function(highscore) {
        alert(JSON.stringify(highscore));
        console.info(JSON.stringify(highscore));
    }; // $._viewHighscoresSuc

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation failure
     * @since v1.0
     * @version v1.0
     */
    $._viewHighscoresFail = function(msg) {
        alert(msg);
        console.warn(msg);
    }; // $._viewHighscoresFail

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object} highscore - The highscore with the requested boardSpec
     * @since v1.0
     * @version v1.0
     */
    $._viewHistorySuc = function(highscore) {
        alert(JSON.stringify(highscore));
        console.info(JSON.stringify(highscore));
    }; // $._viewHistorySuc

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation failure
     * @since v1.0
     * @version v1.0
     */
    $._viewHistoryFail = function(msg) {
        alert(msg);
        console.warn(msg);
    }; // $._viewHistoryFail

    /**
     * Idempotent
     * @author DoubleX
     * @returns {String/Nullable} The requested board specifications
     * @since v1.0
     * @version v1.0
     */
    $._boardSpec = function() { return prompt($._MSG_BOARD_SPEC); };

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = { viewHighscores: $.viewHighscores, viewHistory: $.viewHistory };
    //
    PUBLISH("FCRecords", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.CONTROLLER.FCRecords