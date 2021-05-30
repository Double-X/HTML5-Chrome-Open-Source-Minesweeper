/**
 * This function should be called exactly once per page load
 * Pure function
 * @author DoubleX
 * @param {Object[String, Function]} FMJSONIO - The FMJSONIO API mapping
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.1
 */
DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMProfile = function(FMJSONIO, PUBLISH) {

    "use strict";

    var _KEYS = Object.keys, $ = DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMProfile;
    $._BOARD_SPEC_W = "W", $._BOARD_SPEC_H = "H";
    $._BOARD_SPEC_MINE_NUM = "M", $._BOARD_SPEC_SKIN = "S";
    $._BOARD_SPEC_IS_FL = "F";
    // All json files to be imported must be placed within this relative path
    $._IMPORT_JSON_PATH = "json/";
    //
    $._LAST_USED_PROFILE = "Last Used Profile";
    $._MSG_ERR_ADD_RECORD = 
            "Failed to add the record. Please try again(FMP_MEAR).";
    $._MSG_ERR_CLEAR = 
            "Failed to clear the profile. Please try again(FMP_MEC).";
    $._MSG_ERR_CLEAR_NO_REGION = 
            "Failed to clear the profile. Please try again(FMP_MECNR).";
    $._MSG_ERR_CREATE_NEW = 
            "Failed to create the profile. Please try again(FMP_MECN).";
    $._MSG_ERR_CREATE_SWITCH = 
            "The profile's created but failed to switch to it(FMP_MECS).";
    $._MSG_ERR_EDIT = 
            "Failed to edit the profile's region. Please try again(FMP_MEE).";
    $._MSG_ERR_LOAD = "Failed to load the profile. Please try again(FMP_MEL).";
    $._MSG_ERR_POST_LOAD = 
            "Failed to load the profile. Please try again(FMP_MEPL).";
    $._MSG_ERR_STORE_NEW_BOARD_SPEC = 
            "Failed to store the last board spec. Please try again(FMP_MESNBS)";
    $._MSG_ERR_STORE_NEW_SKIN = 
            "Failed to store the last used skin. Please try again(FMP_MESNS)";
    $._MSG_ERR_EDIT_SAME_REGION = 
            "The profile's region's the same as this input.";
    $._MSG_ERR_HAS_SUCH_PROFILE = "This profile already exists.";
    $._MSG_ERR_NO_PROFILE_LOADED = "There's no profile loaded.";
    $._MSG_ERR_NO_SUCH_HIGHSCORE = 
            "There's no highscore for the given board specifications";
    $._MSG_ERR_NO_SUCH_PROFILE = "This profile doesn't exist.";
    $._MSG_SUC_ADD_RECORD = "The record's added to the current profile.";
    $._MSG_SUC_CLEAR = "The profile's history's cleared.";
    $._MSG_SUC_CREATE_NEW = "The profile's created.";
    $._MSG_SUC_EDIT = "The profile's region's edited.";
    $._MSG_SUC_LOAD = "The profile's loaded.";
    $._MSG_SUC_STORE_NEW_BOARD_SPEC = 
            "The last board spec of the profile's stored.";
    $._MSG_SUC_STORE_NEW_SKIN = "The last skin of the profile's stored.";
    $._PROFILE_NAME_PREFIX = "(Profile)";

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} timestamp - The timestamp of the record to be added
     * @param {Object} record - The record to be added
     * @param {Function(String, Array[String])} callback - Called with the list
     *                                                      of stats having new
     *                                                      highscores upon suc
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.0
     */
    $.addRecord = function(timestamp, record, callback, errback) {
        var profileName = $._lastUsedProfileName();
        if (!profileName) return errback($._MSG_ERR_NO_PROFILE_LOADED);
        $._addRecord(timestamp, record, callback, errback, profileName);
    }; // $.addRecord

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} profileName - The name of the profile to be cleared
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.0
     */
    $.clear = function(profileName, callback, errback) {
        $._opearteExistingProfile(profileName, callback, errback, "_clear");
    }; // $.clear

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} profileName - The name of the profile to be created
     * @param {String} profileRegion - The region of the profile to be edited
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.1
     */
    $.create = function(profileName, profileRegion, callback, errback) {
        if ($._readJSON(profileName)) {
            errback($._MSG_ERR_HAS_SUCH_PROFILE);
        } else $._create(profileName, profileRegion, callback, errback);
    }; // $.create

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} profileName - The name of the profile to be edited
     * @param {String} profileRegion - The region of the profile to be edited
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.0
     */
    $.edit = function(profileName, profileRegion, callback, errback) {
        var profile = $._readJSON(profileName);
        if (!profile) return errback($._MSG_ERR_NO_SUCH_PROFILE);
        $._edit(profileName, profileRegion, callback, errback, profile);
    }; // $.edit

    /**
     * @author DoubleX
     * @interface
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.0
     */
    $.exportProfile = function(errback) {
        var profileName = $._lastUsedProfileName();
        if (!profileName) return errback($._MSG_ERR_NO_PROFILE_LOADED);
        $._exportProfile(errback, profileName);
    }; // $.exportProfile

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} boardSpec - The board specifications of the highscores
     * @param {Function(Object)} callback - Called with results upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.0
     */
    $.giveHighscores = function(boardSpec, callback, errback) {
        var profileName = $._lastUsedProfileName();
        if (!profileName) return errback($._MSG_ERR_NO_PROFILE_LOADED);
        $._giveHighscores(boardSpec, callback, errback, profileName);
    }; // $.giveHighscores

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} boardSpec - The board specifications of the highscores
     * @param {Function(Object)} callback - Called with results upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.0
     */
    $.giveHistory = function(boardSpec, callback, errback) {
        var profileName = $._lastUsedProfileName();
        if (!profileName) return errback($._MSG_ERR_NO_PROFILE_LOADED);
        $._giveHistory(boardSpec, callback, errback, profileName);
    }; // $.giveHistory

    /**
     * @author DoubleX
     * @interface
     * @param {File} file - The file as the profile to be imported
     * @param {Function(String)} callback - Returns the requested json contents
     * @param {Function(Event)} errback - Returns the failure event
     * @since v1.0
     * @version v1.0
     */
    $.importProfile = function(file, callback, errback) {
        FMJSONIO.importJSON(
                file, $._onPostImportProfileFunc(callback, errback), errback);
    }; // $.importProfile

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} profileName - The name of the profile to be loaded
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.0
     */
    $.load = function(profileName, callback, errback) {
        $._opearteExistingProfile(profileName, callback, errback, "_load");
    }; // $.load

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.0
     */
    $.storeNewBoardSpec = function(w, h, mineNum, callback, errback) {
        var profileName = $._lastUsedProfileName();
        if (!profileName) return errback($._MSG_ERR_NO_PROFILE_LOADED);
        $._storeNewBoardSpec(w, h, mineNum, callback, errback, profileName);
    }; // $.storeNewBoardSpec

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} newSkin - The new skin name
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.0
     */
    $.storeNewSkin = function(newSkin, callback, errback) {
        var profileName = $._lastUsedProfileName();
        if (!profileName) return errback($._MSG_ERR_NO_PROFILE_LOADED);
        $._storeNewSkin(newSkin, callback, errback, profileName);
    }; // $.storeNewSkin

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} timestamp - The timestamp of the record to be added
     * @param {Object} record - The record to be added
     * @param {Function(String, Array[String])} callback - Called with the list
     *                                                      of stats having new
     *                                                      highscores upon suc
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to add record
     * @since v1.0
     * @version v1.0
     */
    $._addRecord = function(timestamp, record, callback, errback, profileName) {
        var profile = $._readJSON(profileName);
        // This situation should never happen but should still be reported
        if (!profile) return errback($._MSG_ERR_NO_SUCH_PROFILE);
        //
        $._onAddRecord(
                timestamp, record, callback, errback, profileName, profile);
    }; // $._addRecord

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} timestamp - The timestamp of the record to be added
     * @param {Object} record - The record to be added
     * @param {Function(String, Array[String])} callback - Called with the list
     *                                                      of stats having new
     *                                                      highscores upon suc
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to add record
     * @param {Object} profile - The profile to have the specified record added
     * @since v1.0
     * @version v1.0
     */
    $._onAddRecord = function(
            timestamp, record, callback, errback, profileName, profile) {
        $._addHisory(timestamp, record, profile);
        var highscore = $._nonNullHighscore($._boardSpec(record), profile);
        var newHighscoresStats = $._newHighscoresStats(record, highscore);
        $._updateHighscores(record, highscore, newHighscoresStats);
        $._writeJSON(profileName, profile);
        // Only timestamp's checked as checking record would be too expensive
        $._onPostAddRecord(
                timestamp, callback, errback, profileName, newHighscoresStats);
        //
    }; // $._onAddRecord

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} timestamp - The timestamp of the record to be added
     * @param {Object} record - The record to be added
     * @param {Object} profile - The profile to have the specified record added
     * @since v1.0
     * @version v1.0
     */
    $._addHisory = function(timestamp, record, profile) {
        profile.history[timestamp] = record;
    }; // $._addHisory

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} boardSpec - The board configuration of the highscores
     * @param {String} profile - The profile to have its highscores returned
     * @returns {Object} The requested highscore
     * @since v1.0
     * @version v1.0
     */
    $._nonNullHighscore = function(boardSpec, profile) {
        if (!$._highscore(boardSpec, profile)) {
            profile.highscores[boardSpec] = {};
        }
        return profile.highscores[boardSpec];
    }; // $._nonNullHighscore

    /**
     * @author DoubleX
     * @param {Object} record - The record to be added
     * @param {Object} highscore - The highscore with the requested boardSpec
     * @returns {Array[String]} The list of stats having new highscores
     * @since v1.0
     * @version v1.1
     */
    $._newHighscoresStats = function(record, highscore) {
        // These codes are easy, simple and small enough to be kept all together
        return _KEYS($._HIGHSCORES_FIELD_RULES).filter(
                $._isNewHighscore.bind($, record, highscore));
        //
    }; // $._newHighscoresStats

    /**
     * Nullipotent
     * @author DoubleX
     * @param {Object} record - The record to be checked against the highscore
     * @param {Object} highscore - The highscore with the requested boardSpec
     * @param {String} field - The field compared between record and highscores
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isNewHighscore = function(record, highscore, field) {
        return record[field] && (!highscore[field] || 
                $._HIGHSCORES_FIELD_RULES[field](record, highscore, field));
    }; // $._isNewHighscore

    /**
     * Pure function
     * @author DoubleX
     * @param {Object} record - The record to be checked against the highscore
     * @param {Object} highscore - The highscore with the requested boardSpec
     * @param {String} field - The field compared between record and highscores
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isLessThan = function(record, highscore, field) {
        return !highscore[field] || record[field] < highscore[field];
    }; // $._isLessThan

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object} record - The record to be added
     * @param {Object} highscore - The highscore with the boardSpec
     * @param {Array[String]} newHighscoresStats - The list of stats having
     *                                              new highscores
     * @since v1.0
     * @version v1.1
     */
    $._updateHighscores = function(record, highscore, newHighscoresStats) {
        newHighscoresStats.forEach(
                $._updateHighscore.bind($, record, highscore));
    }; // $._updateHighscores

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object} record - The record to be added
     * @param {Object} highscore - The highscore with the boardSpec
     * @param {String} field - The field to be updated as new highscores
     * @since v1.0
     * @version v1.0
     */
    $._updateHighscore = function(record, highscore, field) {
        highscore[field] = record[field];
    }; // $._updateHighscore
    /**
     * Idempotent
     * @author DoubleX
     * @param {String} timestamp - The timestamp of the record to be added
     * @param {Function(String, Array[String])} callback - Called with the list
     *                                                      of stats having new
     *                                                      highscores upon suc
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to add record
     * @param {Array[String]} newHighscoresStats - The list of stats having
     *                                              new highscores
     * @since v1.0
     * @version v1.0
     */
    $._onPostAddRecord = function(
            timestamp, callback, errback, profileName, newHighscoresStats) {
        var profile = $._readJSON(profileName);
        // This situation should never happen but should still be reported
        if (!profile) return errback($._MSG_ERR_NO_SUCH_PROFILE);
        //
        $._checkAddedRecord(
                timestamp, callback, errback, profile, newHighscoresStats);
    }; // $._onPostAddRecord

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} timestamp - The timestamp of the record to be added
     * @param {Function(String, Array[String])} callback - Called with the list
     *                                                      of stats having new
     *                                                      highscores upon suc
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {Object} profile - The profile to have the specified record added
     * @param {Array[String]} newHighscoresStats - The list of stats having
     *                                              new highscores
     * @since v1.0
     * @version v1.1
     */
    $._checkAddedRecord = function(
            timestamp, callback, errback, profile, newHighscoresStats) {
        if ($._hasTimestamp(timestamp, profile)) {
            callback($._MSG_SUC_ADD_RECORD, newHighscoresStats);
        } else errback($._MSG_ERR_ADD_RECORD);
    }; // $._checkAddedRecord

    /**
     * Pure function
     * @author DoubleX
     * @param {String} timestamp - The timestamp of the record to be added
     * @param {Object} profile - The profile to have the specified record added
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._hasTimestamp = function(timestamp, profile) {
        return profile.history[timestamp];
    }; // $._hasTimestamp

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be cleared
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {Object} profile - The profile to be cleared
     * @since v1.0
     * @version v1.0
     */
    $._clear = function(profileName, callback, errback, profile) {
        var profileRegion = $._profileRegion(profile);
        if (!profileRegion) return errback($._MSG_ERR_CLEAR_NO_REGION);
        $._clearWithRegion(profileName, profileRegion, callback, errback);
    }; // $._clear

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be cleared
     * @param {String} profileRegion - The region of the profile to be edited
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.1
     */
    $._clearWithRegion = function(
            profileName, profileRegion, callback, errback) {
        $._writeJSON(profileName, $._emptyProfile(profileName, profileRegion));
        if ($._isEmptyProfile($._readJSON(profileName))) {
            callback($._MSG_SUC_CLEAR);
        } else errback($._MSG_ERR_CLEAR);
    }; // $._clearWithRegion

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be created
     * @param {String} profileRegion - The region of the profile to be edited
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @since v1.0
     * @version v1.1
     */
    $._create = function(profileName, profileRegion, callback, errback) {
        $._writeJSON(profileName, $._emptyProfile(profileName, profileRegion));
        if (!$._isEmptyProfile($._readJSON(profileName))) {
            errback($._MSG_ERR_CREATE_NEW);
        } else $._switchProfile(profileName, callback, errback, $._readJSON(
                profileName), "_onCreateSuc", $._MSG_ERR_CREATE_SWITCH);
    }; // $._create

    /**
     * Pure function
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be made
     * @param {String} profileRegion - The region of the profile to be edited
     * @returns {Object} The requested empty profile
     * @since v1.0
     * @version v1.0
     */
    $._emptyProfile = function(profileName, profileRegion) {
        return {
            profileName: profileName,
            profileRegion: profileRegion,
            lastW: 0,
            lastH: 0,
            lastMineNum: 0,
            lastSkin: "",
            highscores: {},
            history: {}
        };
    }; // $._emptyProfile

    /**
     * Pure function
     * @author DoubleX
     * @param {Object/Nullable} profile - The profile to be queried
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isEmptyProfile = function(profile) {
        return profile && profile.profileName && profile.profileRegion && 
                _KEYS(profile.highscores).length <= 0 && 
                _KEYS(profile.history).length <= 0;
    }; // $._isEmptyProfile

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function(String)} callback - Called with message upon success
     * @param {Object} profile - The created profile
     * @since v1.0
     * @version v1.0
     */
    $._onCreateSuc = function(callback, profile) {
        $._onSwitchSuc(profile);
        callback($._MSG_SUC_CREATE_NEW);
    }; // $._onCreateSuc

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be edited
     * @param {String} profileRegion - The region of the profile to be edited
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {Object} profile - The profile to be edited
     * @since v1.0
     * @version v1.0
     */
    $._edit = function(profileName, profileRegion, callback, errback, profile) {
        if ($._isRightProfileRegion(profileRegion, profile)) {
            return errback($._MSG_ERR_EDIT_SAME_REGION);
        }
        $._onPostEdit(profileName, profileRegion, callback, errback, profile);
    }; // $._edit

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be edited
     * @param {String} profileRegion - The region of the profile to be edited
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {Object} profile - The profile to be edited
     * @since v1.0
     * @version v1.1
     */
    $._onPostEdit = function(
            profileName, profileRegion, callback, errback, profile) {
        $._applyEdits(profileName, profileRegion, profile);
        if ($._isRightProfileRegion(profileRegion, $._readJSON(profileName))) {
            $._onEditSuc(callback, profile);
        } else errback($._MSG_ERR_EDIT);
    }; // $._onPostEdit

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be edited
     * @param {String} profileRegion - The region of the profile to be edited
     * @param {Object} profile - The profile to be edited
     * @since v1.0
     * @version v1.0
     */
    $._applyEdits = function(profileName, profileRegion, profile) {
        $._editProfileRegion(profileRegion, profile);
        $._writeJSON(profileName, profile);
    }; // $._applyEdits

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} profileRegion - The region of the profile to be edited
     * @param {Object} profile - The profile to be edited
     * @since v1.0
     * @version v1.0
     */
    $._editProfileRegion = function(profileRegion, profile) {
        profile.profileRegion = profileRegion;
    }; // $._editProfileRegion

    /**
     * Pure function
     * @author DoubleX
     * @param {String} profileRegion - The region of the profile to be edited
     * @param {Object/Nullable} profile - The profile to be queried
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isRightProfileRegion = function(profileRegion, profile) {
        return profileRegion === $._profileRegion(profile);
    }; // $._isRightProfileRegion

    /**
     * Pure function
     * @author DoubleX
     * @param {Object/Nullable} profile - The profile to be queried
     * @returns {String} The requested profile region in the specified profile
     * @since v1.0
     * @version v1.0
     */
    $._profileRegion = function(profile) {
        return profile ? profile.profileRegion : "";
    }; // $._profileRegion

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function(String)} callback - Called with message upon success
     * @param {Object} profile - The created profile
     * @since v1.0
     * @version v1.0
     */
    $._onEditSuc = function(callback, profile) {
        PUBLISH("FMProfile _onEditSuc", profile);
        callback($._MSG_SUC_EDIT);
    }; // $._onEditSuc

    /**
     * @author DoubleX
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to be exported
     * @since v1.0
     * @version v1.0
     */
    $._exportProfile = function(errback, profileName) {
        var profile = $._readJSON(profileName);
        if (!profile) return errback($._MSG_ERR_NO_SUCH_PROFILE);
        $._exportJSON(profileName, profile);
    }; // $._exportProfile

    /**
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be exported
     * @param {Object} profile - The contents of the profile to be exported
     * @since v1.0
     * @version v1.0
     */
    $._exportJSON = function(profileName, profile) {
        FMJSONIO.exportJSON(
                $._formattedProfileName(profileName), JSON.stringify(profile));
    }; // $._exportJSON

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} boardSpec - The board configuration of the highscores
     * @param {Function(Object)} callback - Called with results upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to be operated
     * @since v1.0
     * @version v1.0
     */
    $._giveHighscores = function(boardSpec, callback, errback, profileName) {
        var profile = $._readJSON(profileName);
        if (!profile) return errback($._MSG_ERR_NO_SUCH_PROFILE);
        $._onGiveHighscores(
                callback, errback, $._highscore(boardSpec, profile));
    }; // $._giveHighscores

    /**
     * Pure function
     * @author DoubleX
     * @param {String} boardSpec - The board configuration of the highscores
     * @param {String} profile - The profile to have its highscores returned
     * @returns {Object/Nullable} The requested highscore
     * @since v1.0
     * @version v1.0
     */
    $._highscore = function(boardSpec, profile) {
        return profile.highscores[boardSpec];
    }; // $._highscore

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function(Object)} callback - Called with results upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {Object/Nullable} highscore - The highscore with the boardSpec
     * @since v1.0
     * @version v1.0
     */
    $._onGiveHighscores = function(callback, errback, highscore) {
        highscore ? callback(highscore) : errback($._MSG_ERR_NO_SUCH_HIGHSCORE);
    }; // $._onGiveHighscores

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} boardSpec - The board configuration of the highscores
     * @param {Function(Object)} callback - Called with results upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to be operated
     * @since v1.0
     * @version v1.0
     */
    $._giveHistory = function(boardSpec, callback, errback, profileName) {
        var profile = $._readJSON(profileName);
        if (!profile) return errback($._MSG_ERR_NO_SUCH_PROFILE);
        $._onGiveHistory(boardSpec, callback, errback, profile.history);
    }; // $._giveHistory

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} boardSpec - The board configuration of the highscores
     * @param {Function(Object)} callback - Called with results upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {Object} history - The profile history to be returned
     * @since v1.0
     * @version v1.0
     */
    $._onGiveHistory = function(boardSpec, callback, errback, history) {
        // These codes are easy, simple and small enough to be kept all together
        var records = {};
        Object.keys(history).filter($._isMatchSpecFunc(boardSpec, history)).
                forEach(function(timestamp) {
            records[timestamp] = history[timestamp];
        });
        Object.keys(records).length <= 0 ? errback() : callback(records);
        //
    }; // $._onGiveHistory

    /**
     * Pure function
     * @author DoubleX
     * @param {String} boardSpec - The board configuration of the highscores
     * @param {Object} history - The profile history to be returned
     * @returns {Function{String}} The requested function
     * @since v1.0
     * @version v1.0
     */
    $._isMatchSpecFunc = function(boardSpec, history) {
        /**
         * Pure function
         * @author DoubleX
         * @param {String} timestamp - The timestamp of the history
         * @since v1.0
         * @version v1.0
         */
        return function(timestamp) {
            return $._isMatchSpec(boardSpec, history[timestamp]);
        };
    }; // $._isMatchSpecFunc

    /**
     * Pure function
     * @author DoubleX
     * @param {String} boardSpec - The board configuration of the highscores
     * @param {Object} record - The record of the profile history to be queried
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isMatchSpec = function(boardSpec, record) {
        return boardSpec === $._boardSpec(record);
    }; // $._isMatchSpec

    /**
     * Nullipotent
     * @author DoubleX
     * @param {Object} record - The record to be added
     * @returns {String} The requested board specifications
     * @since v1.0
     * @version v1.0
     */
    $._boardSpec = function(record) {
        // Not making the skins into lower case would mix it up with _BOARD_CFG
        return $._BOARD_SPEC_W + record.w + $._BOARD_SPEC_H + record.h + 
                $._BOARD_SPEC_MINE_NUM + record.mineNum + $._BOARD_SPEC_SKIN + 
                record.skin.toLowerCase() + $._BOARD_SPEC_IS_FL + !record.isNF;
        //
    }; // $._boardSpec

    /**
     * Pure function
     * @author DoubleX
     * @param {Function(String)} callback - Returns the requested json contents
     * @param {Function(Event)} errback - Returns the failure event
     * @returns {Function(String)} The requested function
     * @since v1.0
     * @version v1.0
     */
    $._onPostImportProfileFunc = function(callback, errback) {
        /**
         * Idempotent
         * @author DoubleX
         * @param {String} contents - The contents of the profile
         * @since v1.0
         * @version v1.0
         */
        return function(contents) {
            $._onPostImportProfile(callback, errback, JSON.parse(contents));
        };
    }; // $._onPostImportProfileFunc

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function(String)} callback - Returns the requested json contents
     * @param {Function(Event)} errback - Returns the failure event
     * @param {Object} profile - The profile to be imported
     * @since v1.0
     * @version v1.0
     */
    $._onPostImportProfile = function(callback, errback, profile) {
        var profileName = profile.profileName;
        // Otherwise the local storage wouldn't have the imported profile
        $._writeJSON(profileName, profile);
        //
        $.load(profileName, callback, errback, profile);
    }; // $._onPostImportProfile

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be operated
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} cmd - The command to be executed on the existing profile
     * @since v1.0
     * @version v1.0
     */
    $._opearteExistingProfile = function(profileName, callback, errback, cmd) {
        var profile = $._readJSON(profileName);
        if (!profile) return errback($._MSG_ERR_NO_SUCH_PROFILE);
        $[cmd](profileName, callback, errback, profile);
    }; // $._opearteExistingProfile

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be loaded
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {Object} profile - The loaded profile
     * @since v1.0
     * @version v1.0
     */
    $._load = function(profileName, callback, errback, profile) {
        $._switchProfile(profileName, callback, errback, profile, "_onLoadSuc", 
                $._MSG_ERR_LOAD);
    }; // $._load

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be switched
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {Object} profile - The loaded profile
     * @param {String} cmd - The command to be executed on the switched profile
     * @param {String} errMsg - The message to be shown upon failure
     * @since v1.0
     * @version v1.0
     */
    $._switchProfile = function(
            profileName, callback, errback, profile, cmd, errMsg) {
        $._writeJSON(
                $._LAST_USED_PROFILE, $._lastUsedProfileContents(profileName));
        if ($._isSwitchSuc(profileName)) return $[cmd](callback, profile);
        errback(errMsg);
    }; // $._switchProfile

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be written
     * @param {Object} obj - The contents of the profile to be written
     * @since v1.0
     * @version v1.0
     */
    $._writeJSON = function(profileName, obj) {
        FMJSONIO.writeJSON($._formattedProfileName(profileName), obj);
    }; // $._writeJSON

    /**
     * Pure function
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be checked
     * @returns {Object} The requested contents stored in _LAST_USED_PROFILE
     * @since v1.0
     * @version v1.0
     */
    $._lastUsedProfileContents = function(profileName) {
        return { profileName: profileName };
    }; // $._lastUsedProfileContents

    /**
     * Nullipotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be switched
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isSwitchSuc = function(profileName) {
        return profileName === $._lastUsedProfileName();
    }; // $._isSwitchSuc

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {String} The requested profile contents
     * @since v1.0
     * @version v1.0
     */
    $._lastUsedProfileName = function() {
        return $._profileName($._readLastUsedProfile());
    }; // $._lastUsedProfileName

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Object/Nullable} The requested profile contents
     * @since v1.0
     * @version v1.0
     */
    $._readLastUsedProfile = function() {
        return $._readJSON($._LAST_USED_PROFILE);
    }; // $._readLastUsedProfile

    /**
     * Potential Hotspot/Nullipotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be read
     * @returns {Object/Nullable} The requested profile contents
     * @since v1.0
     * @version v1.0
     */
    $._readJSON = function(profileName) {
        return FMJSONIO.readJSON($._formattedProfileName(profileName));
    }; // $._readJSON

    /**
     * Nullipotent
     * @author DoubleX
     * @param {String} profileName - The name of the profile to be formatted
     * @returns {String} The requested formatted profile name
     * @since v1.0
     * @version v1.0
     */
    $._formattedProfileName = function(profileName) {
        return $._PROFILE_NAME_PREFIX + profileName;
    }; // $._formattedProfileName

    /**
     * Pure function
     * @author DoubleX
     * @param {Object/Nullable} profile - The profile to have its name queried
     * @returns {String} The requested profile name in lastUsedProfile
     * @since v1.0
     * @version v1.0
     */
    $._profileName = function(profile) {
        return profile ? profile.profileName : "";
    }; // $._profileName

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function(String)} callback - Called with message upon success
     * @param {Object} profile - The loaded profile
     * @since v1.0
     * @version v1.0
     */
    $._onLoadSuc = function(callback, profile) {
        $._onSwitchSuc(profile);
        callback($._MSG_SUC_LOAD);
    }; // $._onLoadSuc

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object} profile - The loaded profile
     * @since v1.0
     * @version v1.0
     */
    $._onSwitchSuc = function(profile) {
        PUBLISH("FMProfile _onSwitchSuc", profile);
    }; // $._onSwitchSuc

    /**
     * Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to be stored into
     * @since v1.0
     * @version v1.0
     */
    $._storeNewBoardSpec = function(
            w, h, mineNum, callback, errback, profileName) {
        var profile = $._readJSON(profileName);
        if (!profile) return errback($._MSG_ERR_NO_SUCH_PROFILE);
        $._onStoreNewBoardSpec(
                w, h, mineNum, callback, errback, profileName, profile);
    }; // $._storeNewBoardSpec

    /**
     * Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to be stored into
     * @param {Object} profile - The profile to be stored into
     * @since v1.0
     * @version v1.0
     */
    $._onStoreNewBoardSpec = function(
            w, h, mineNum, callback, errback, profileName, profile) {
        // These codes are easy, simple and small enough to be kept all together
        profile.lastW = w, profile.lastH = h;
        profile.lastMineNum = mineNum;
        $._writeJSON(profileName, profile);
        $._onPostStoreNewBoardSpec(
                w, h, mineNum, callback, errback, profileName);
        //
    }; // $._onStoreNewBoardSpec

    /**
     * Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to be stored into
     * @since v1.0
     * @version v1.0
     */
    $._onPostStoreNewBoardSpec = function(
            w, h, mineNum, callback, errback, profileName) {
        var profile = $._readJSON(profileName);
        // This situation should never happen but should still be reported
        if (!profile) return errback($._MSG_ERR_NO_SUCH_PROFILE);
        //
        $._checkStoredNewBoardSpec(
                w, h, mineNum, callback, errback, profile);
    }; // $._onPostStoreNewBoardSpec

    /**
     * Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profile - The profile to be stored into
     * @since v1.0
     * @version v1.1
     */
    $._checkStoredNewBoardSpec = function(
            w, h, mineNum, callback, errback, profile) {
        if ($._isSameBoardSpec(w, h, mineNum, profile)) {
            callback($._MSG_SUC_STORE_NEW_BOARD_SPEC);
        } else errback($._MSG_ERR_STORE_NEW_BOARD_SPEC);
    }; // $._checkStoredNewBoardSpec

    /**
     * Pure function
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @param {String} profile - The profile to be stored into
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isSameBoardSpec = function(w, h, mineNum, profile) {
        return profile.lastW === w && profile.lastH === h && 
                profile.lastMineNum === mineNum;
    }; // $._isSameBoardSpec

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} newSkin - The new skin name
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to be stored into
     * @since v1.0
     * @version v1.0
     */
    $._storeNewSkin = function(newSkin, callback, errback, profileName) {
        var profile = $._readJSON(profileName);
        if (!profile) return errback($._MSG_ERR_NO_SUCH_PROFILE);
        $._onStoreNewSkin(newSkin, callback, errback, profileName, profile);
    }; // $._storeNewSkin

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} newSkin - The new skin name
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to be stored into
     * @param {Object} profile - The profile to be stored into
     * @since v1.0
     * @version v1.0
     */
    $._onStoreNewSkin = function(
            newSkin, callback, errback, profileName, profile) {
        // These codes are easy, simple and small enough to be kept all together
        profile.lastSkin = newSkin;
        $._writeJSON(profileName, profile);
        $._onPostStoreNewSkin(newSkin, callback, errback, profileName);
        //
    }; // $._onStoreNewSkin

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} newSkin - The new skin name
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profileName - The name of the profile to be stored into
     * @since v1.0
     * @version v1.0
     */
    $._onPostStoreNewSkin = function(newSkin, callback, errback, profileName) {
        var profile = $._readJSON(profileName);
        // This situation should never happen but should still be reported
        if (!profile) return errback($._MSG_ERR_NO_SUCH_PROFILE);
        //
        $._checkStoredNewSkin(newSkin, callback, errback, profile);
    }; // $._onPostStoreNewSkin

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} newSkin - The new skin name
     * @param {Function(String)} callback - Called with message upon success
     * @param {Function(String)} errback - Called with messages upon failure
     * @param {String} profile - The profile to be stored into
     * @since v1.0
     * @version v1.1
     */
    $._checkStoredNewSkin = function(newSkin, callback, errback, profile) {
        if ($._isSameSkin(newSkin, profile)) {
            callback($._MSG_SUC_STORE_NEW_SKIN);
        } else errback($._MSG_ERR_STORE_NEW_SKIN);
    }; // $._checkStoredNewSkin

    /**
     * Pure function
     * @author DoubleX
     * @param {String} newSkin - The new skin name
     * @param {String} profile - The profile to be stored into
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isSameSkin = function(newSkin, profile) {
        return profile.lastSkin === newSkin;
    }; // $._checkStoredNewSkin

    // The mapping from the fields to be recorded to their comparison rules
    $._HIGHSCORES_FIELD_RULES = { timerSecs: $._isLessThan };
    //

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = {
        addRecord: $.addRecord,
        clear: $.clear,
        create: $.create,
        edit: $.edit,
        exportProfile: $.exportProfile,
        giveHighscores: $.giveHighscores,
        giveHistory: $.giveHistory,
        importProfile: $.importProfile,
        load: $.load,
        storeNewBoardSpec: $.storeNewBoardSpec,
        storeNewSkin: $.storeNewSkin
    };
    //
    PUBLISH("FMProfile", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.MODEL.FMProfile