/**
 * This function should be called exactly once per page load
 * @author DoubleX
 * @param {Object} MENU - The menu dom UI view mapping
 * @param {Object[String, Function]} FC_PROFILE - The FCProfile API mapping
 * @param {Object[String, Function]} FC_RECORDS - The FCRecords API mapping
 * @param {Object[String, Function]} FM_MENU - The FMMenu API mapping
 * @param {Function(String)} CHANGE_SKIN - Changes the skin to the given one
 * @param {OCGrids} OC_GRIDS - The coordinator of all gen grid UIs
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.FUNC.CONTROLLER.FCMenu = function(
        MENU, FC_PROFILE, FC_RECORDS, FM_MENU, CHANGE_SKIN, OC_GRIDS, PUBLISH) {

    "use strict";

    var _START_NEW_BOARD = OC_GRIDS.onResize.bind(OC_GRIDS);
    var _RESET_BOARD = OC_GRIDS.onReset.bind(OC_GRIDS);

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.CONTROLLER.FCMenu;

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.attachListeners = function() {
        $._attachListener("importProfile", $._onImportProfile);
        $._attachListener("profiles", $._onProfileChange);
        $._attachListener("opts", $._onOptChange);
    }; // $.attachListeners

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} selectId - The id of the dom for selections
     * @param {Function(Event)} listener - The listener to be attached
     * @since v1.0
     * @version v1.0
     */
    $._attachListener = function(selectId, listener) {
        MENU[selectId].addEventListener("change", listener);
    }; // $._attachListener

    /**
     * Idempotent
     * @author DoubleX
     * @param {Event} event - The raw selection event
     * @since v1.0
     * @version v1.0
     */
    $._onProfileChange = function(event) {
        $._onSelectionChange(event.target.value, $._PROFILE_VAL_EVENTS);
    }; // $._onProfileChange

    /**
     * Idempotent
     * @author DoubleX
     * @param {Event} event - The raw selection event
     * @since v1.0
     * @version v1.0
     */
    $._onOptChange = function(event) {
        $._onSelectionChange(event.target.value, $._OPTS_VAL_EVENTS);
    }; // $._onOptChange

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} val - The raw selection event target value
     * @param {Object[String, Array[Function, Array]]} selections - The mapping
     *                                                               from event
     *                                                               name to
     *                                                               args
     * @since v1.0
     * @version v1.0
     */
    $._onSelectionChange = function(val, selections) {
        var func = selections[val];
        if (func) func[0].apply($, func[1]);
    }; // $._onSelectionChange

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._importProfile = function() { MENU.importProfile.click(); };

    /**
     * @author DoubleX
     * @param {Event} event - The raw selection event
     * @since v1.0
     * @version v1.0
     */
    $._onImportProfile = function(event) {
        FC_PROFILE.importProfile(MENU.importProfile.files[0]);
    }; // $._onImportProfile

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._exportProfile = function() {
        // A seam/forwarding function to prevent passing this to the delegate
        FC_PROFILE.exportProfile();
        //
    }; // $._exportProfile

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._openProfileMenu = function() {
        // A seam/forwarding function to prevent passing this to the delegate
        FC_PROFILE.manageProfile();
        //
    }; // $._openProfileMenu

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._viewHighscores = function() {
        // A seam/forwarding function to prevent passing this to the delegate
        FC_RECORDS.viewHighscores();
        //
    }; // $._viewHighscores

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._viewHistory = function() {
        // A seam/forwarding function to prevent passing this to the delegate
        FC_RECORDS.viewHistory();
        //
    }; // $._viewHistory

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._changeBoard = function() {
        // These codes are easy, simple and small enough to be kept all together
        var newWHMineNum = $._newWHMineNum();
        if (newWHMineNum.length >= 3) $._startNewBoard.apply($, newWHMineNum);
        //
    }; // $._changeBoard

    /**
     * Idempotent
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._newWHMineNum = function() {
        // These codes are easy, simple and small enough to be kept all together
        var newWHMineNum = "", func = FM_MENU.msgBoardParamCheckResults;
        do {
            newWHMineNum = this._wHMineNum(prompt(FM_MENU.msgNewWHMineNum()));
        } while (newWHMineNum && !$._isValidBoard(func.apply($, newWHMineNum)))
        return newWHMineNum || [];
        //
    }; // $._newWHMineNum

    /**
     * Pure function
     * @author DoubleX
     * @param {String/Nullable} wHMineNum - The raw board param inputs
     * @returns {Array/Nullable} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._wHMineNum = function(wHMineNum) {
        return wHMineNum ? wHMineNum.split(/\D+/).map($._toNum) : wHMineNum;
    }; // $._wHMineNum

    /**
     * Pure function
     * @author DoubleX
     * @param {String} param - The board param in String
     * @returns {Number} The requested param in Number
     * @since v1.0
     * @version v1.0
     */
    $._toNum = function(param) { return +param; };

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} paramCheckResults - The combined check results
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isValidBoard = function(paramCheckResults) {
        // These codes are easy, simple and small enough to be kept all together
        if (paramCheckResults === "") return true;
        alert(paramCheckResults);
        return false;
        //
    }; // $._isValidBoard

    /**
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @since v1.0
     * @version v1.0
     */
    $._startNewBoard = function(w, h, mineNum) {
        FC_PROFILE.storeNewBoardSpec(w, h, mineNum);
        _START_NEW_BOARD(w, h, mineNum);
    }; // $._startNewBoard

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onChangeSkin = function() {
        var newSkin = $._newSkin();
        // Resetting the board's only needed if the action's confirmed
        if (newSkin) $._changeSkin(newSkin);
        //
    }; // $._onChangeSkin

    /**
     * Idempotent
     * @author DoubleX
     * @returns {String/Nullable} The requested skin name
     * @since v1.0
     * @version v1.0
     */
    $._newSkin = function() {
        // These codes are easy, simple and small enough to be kept all together
        var newSkin = "";
        do {
            newSkin = prompt(FM_MENU.msgAvailableSkins());
        } while (newSkin && !FM_MENU.isAvailableSkin(newSkin))
        return newSkin;
    //
    }; // $._newSkin

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} newSkin - The new skin name
     * @since v1.0
     * @version v1.0
     */
    $._changeSkin = function(newSkin) {
        FC_PROFILE.storeNewSkin(newSkin);
        CHANGE_SKIN(newSkin);
        _RESET_BOARD();
    }; // $._changeSkin

    $._PROFILE_VAL_EVENTS = {
        import: [$._importProfile, []],
        export: [$._exportProfile, []],
        manageProfiles: [$._openProfileMenu, []],
        highscores: [$._viewHighscores, []],
        history: [$._viewHistory, []],
        beg: [$._startNewBoard, [8, 8, 10]],
        int: [$._startNewBoard, [16, 16, 40]],
        exp: [$._startNewBoard, [30, 16, 99]]
    };
    $._OPTS_VAL_EVENTS = {
        board: [$._changeBoard, []],
        skins: [$._onChangeSkin, []]
    };

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = { attachListeners: $.attachListeners };
    //
    PUBLISH("FCMenu", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.CONTROLLER.FCMenu