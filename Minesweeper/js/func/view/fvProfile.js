/**
 * This function should be called exactly once per page load
 * Idempotent
 * @author DoubleX
 * @param {Dom} PROFILE_NAME_REGION - The dom showing the profile name/region
 * @param {Function} SUBSCRIBE - Subscribes to a component
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @param {String} LAST_PROFILE_NAME - The profile name to be shown
 * @param {String} LAST_PROFILE_REGION - The profile region to be shown
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.FUNC.VIEW.FVProfile = function(PROFILE_NAME_REGION, 
        SUBSCRIBE, PUBLISH, LAST_PROFILE_NAME, LAST_PROFILE_REGION) {

    "use strict";

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.VIEW.FVProfile;

    $._PROFILE_NAME_REGION_SEPARATOR_PRE = "(";
    $._PROFILE_NAME_REGION_SEPARATOR_POST = ")";

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {String} profileName - The name of ther current profile
     * @param {String} profileRegion - The region of the current profile
     * @since v1.0
     * @version v1.0
     */
    $.showProfileNameRegion = function(profileName, profileRegion) {
        PROFILE_NAME_REGION.textContent = 
                $._shownProfileNameRegion(profileName, profileRegion);
    }; // $.showProfileNameRegion

    /**
     * Pure function
     * @author DoubleX
     * @param {String} profileName - The name of ther current profile
     * @param {String} profileRegion - The region of the current profile
     * @returns {String} The requested formatted profile name and region
     * @since v1.0
     * @version v1.0
     */
    $._shownProfileNameRegion = function(profileName, profileRegion) {
        return profileName + $._PROFILE_NAME_REGION_SEPARATOR_PRE + 
                profileRegion + $._PROFILE_NAME_REGION_SEPARATOR_POST;
    }; // $._shownProfileNameRegion

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object} profile - The profile to be shown
     * @since v1.0
     * @version v1.0
     */
    $._showProfile = function(profile) {
        $.showProfileNameRegion(profile.profileName, profile.profileRegion);
    }; // $._showProfile

    $.showProfileNameRegion(LAST_PROFILE_NAME, LAST_PROFILE_REGION);

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = { showProfileNameRegion: $.showProfileNameRegion };
    //
    SUBSCRIBE("FMProfile _onSwitchSuc", $._showProfile);
    PUBLISH("FVProfile", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.VIEW.FVProfile