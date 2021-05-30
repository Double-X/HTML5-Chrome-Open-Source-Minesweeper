/**
 * This function should be called exactly once per page load
 * @author DoubleX
 * @param {Object[String, Function]} FMProfile - The FMProfile API mapping
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.1
 */
DoubleX.PROJ.MINESWEEPER.FUNC.CONTROLLER.FCProfile = function(
        FMProfile, PUBLISH) {

    "use strict";

    var _KEYS = Object.keys;
    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.CONTROLLER.FCProfile;

    $._MSG_PROFILE_CMDS_PRE = "Please choose among ";
    $._MSG_PROFILE_CMDS_SEPARATOR = ", ", $._MSG_PROFILE_CMDS_POST = " :";
    $._MSG_PROFILE_NAME = "Please enter the profile name:";
    $._MSG_PROFILE_REGION = "Please enter the profile region:";

    /**
     * @author DoubleX
     * @interface
     * @param {File} file - The file as the profile to be imported
     * @since v1.0
     * @version v1.0
     */
    $.importProfile = function(file) {
        FMProfile.importProfile(
                file, $._importProfileSuc, $._importProfileFail);
    }; // $.importProfile

    /**
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.exportProfile = function() {
        FMProfile.exportProfile($._exportProfileFail);
    }; // $.exportProfile

    /**
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.manageProfile = function() {
        var profileCmd = $._profileCmd();
        if (profileCmd) $._PROFILE_CMDS[profileCmd](profileCmd);
    }; // $.manageProfile

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} mineNum - The number of mines in the grids
     * @since v1.0
     * @version v1.0
     */
    $.storeNewBoardSpec = function(w, h, mineNum) {
        FMProfile.storeNewBoardSpec(w, h, mineNum, $._storeNewBoardSpecSuc, 
                $._storeNewBoardSpecFail);
    }; // $.storeNewBoardSpec

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} newSkin - The new skin name
     * @since v1.0
     * @version v1.0
     */
    $.storeNewSkin = function(newSkin) {
        FMProfile.storeNewSkin(
                newSkin, $._storeNewSkinSuc, $._storeNewSkinFail);
    }; // $.storeNewSkin

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation success
     * @since v1.0
     * @version v1.0
     */
    $._importProfileSuc = function(msg) {
        alert(msg);
        console.info(msg);
    }; // $._importProfileSuc

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation failure
     * @since v1.0
     * @version v1.0
     */
    $._importProfileFail = function(msg) {
        alert(msg);
        console.warn(msg);
    }; // $._importProfileFail

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation failure
     * @since v1.0
     * @version v1.0
     */
    $._exportProfileFail = function(msg) {
        alert(msg);
        console.warn(msg);
    }; // $._exportProfileFail

    /**
     * Idempotent
     * @author DoubleX
     * @returns {String/Nullable} The requested command name
     * @since v1.0
     * @version v1.1
     */
    $._profileCmd = function() {
        var profileCmd = "";
        do {
            profileCmd = prompt($._msgProfileCmds());
        } while (profileCmd && !$._isValidCmd(profileCmd));
        return profileCmd;
    }; // $._profileCmd

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {String} The requested command list messages
     * @since v1.0
     * @version v1.0
     */
    $._msgProfileCmds = function() {
        return $._MSG_PROFILE_CMDS_PRE + _KEYS($._PROFILE_CMDS).join(
                $._MSG_PROFILE_CMDS_SEPARATOR) + $._MSG_PROFILE_CMDS_POST;
    }; // $._msgProfileCmds

    /**
     * Nullipotent
     * @author DoubleX
     * @param {String} profileCmd - The inputted profile command name
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isValidCmd = function(profileCmd) {
        return _KEYS($._PROFILE_CMDS).indexOf(profileCmd) >= 0;
    }; // $._isValidCmd

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} cmd - The name of the profile command to be executed
     * @since v1.0
     * @version v1.0
     */
    $._operateProfileWithName = function(cmd) {
        var profileName = $._profileName();
        if (!profileName) return;
        FMProfile[cmd](profileName, $._cmdExecSuc, $._cmdExecFail);
    }; // $._operateProfileWithName

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} cmd - The name of the profile command to be executed
     * @since v1.0
     * @version v1.1
     */
    $._operateProfileWithNameAndRegion = function(cmd) {
        var profileName = $._profileName();
        if (!profileName) return;
        var profileRegion = $._profileRegion();
        if (profileRegion) FMProfile[cmd](
                profileName, profileRegion, $._cmdExecSuc, $._cmdExecFail);
    }; // $._operateProfileWithNameAndRegion

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation success
     * @since v1.0
     * @version v1.0
     */
    $._cmdExecSuc = function(msg) {
        alert(msg);
        console.info(msg);
    }; // $._cmdExecSuc

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation failure
     * @since v1.0
     * @version v1.0
     */
    $._cmdExecFail = function(msg) {
        alert(msg);
        console.warn(msg);
    }; // $._cmdExecFail

    /**
     * Idempotent
     * @author DoubleX
     * @returns {String} The requested command name
     * @since v1.0
     * @version v1.0
     */
    $._profileName = function() {
        return $._profileDetails($._MSG_PROFILE_NAME);
    }; // $._profileName

    /**
     * Idempotent
     * @author DoubleX
     * @returns {String} The requested command name
     * @since v1.0
     * @version v1.0
     */
    $._profileRegion = function() {
        return $._profileDetails($._MSG_PROFILE_REGION);
    }; // $._profileRegion

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} detailsMsg - The messages for inputting the details
     * @returns {String} The requested command name
     * @since v1.0
     * @version v1.0
     */
    $._profileDetails = function(detailsMsg) { return prompt(detailsMsg); };

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation success
     * @since v1.0
     * @version v1.0
     */
    $._storeNewBoardSpecSuc = function(msg) { console.info(msg); };
    
    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation failure
     * @since v1.0
     * @version v1.0
     */
    $._storeNewBoardSpecFail = function(msg) { console.warn(msg); };

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation success
     * @since v1.0
     * @version v1.0
     */
    $._storeNewSkinSuc = function(msg) { console.info(msg); };
    
    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation failure
     * @since v1.0
     * @version v1.0
     */
    $._storeNewSkinFail = function(msg) { console.warn(msg); };

    $._PROFILE_CMDS = {
        clear: $._operateProfileWithName,
        create: $._operateProfileWithNameAndRegion,
        edit: $._operateProfileWithNameAndRegion,
        load: $._operateProfileWithName
    };

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = {
        importProfile: $.importProfile,
        exportProfile: $.exportProfile,
        manageProfile: $.manageProfile,
        storeNewBoardSpec: $.storeNewBoardSpec,
        storeNewSkin: $.storeNewSkin
    };
    //
    PUBLISH("FCProfile", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.CONTROLLER.FCProfile