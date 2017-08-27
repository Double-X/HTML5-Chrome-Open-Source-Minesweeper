/**
 * This function should be called exactly once per page load
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {Dom} REMAIN_MINE_NUM - Remain mine num UI view placeholder
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.FUNC.VIEW.FVRemainMineNum = function(
        REMAIN_MINE_NUM, PUBLISH) {

    "use strict";

    var _ABS = Math.abs;

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.VIEW.FVRemainMineNum;

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} mineNum - The number of mines to be shown
     * @since v1.0
     * @version v1.0
     */
    $.setNum = function(mineNum) {
        var formattedMineNum = $._formattedMineNum(mineNum);
        // Ensures no redundant drawings could take place
        if (REMAIN_MINE_NUM.textContent === formattedMineNum) return;
        //
        REMAIN_MINE_NUM.textContent = formattedMineNum;
    }; // $.setNum

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {Number} mineNum - The number of mines to be shown
     * @returns {String} The requested formatted mine num
     * @since v1.0
     * @version v1.0
     */
    $._formattedMineNum = function(mineNum) {
        if (mineNum >= 0 && mineNum < 10) return "00" + mineNum;
        if (mineNum <= -10 || mineNum >= 100) return "" + mineNum;
        return mineNum < 0 ? "-0" + _ABS(mineNum) : "0" + mineNum;
    }; // $._formattedMineNum

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = { setNum: $.setNum };
    //
    PUBLISH("FVRemainMineNum", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.VIEW.FVRemainMineNum