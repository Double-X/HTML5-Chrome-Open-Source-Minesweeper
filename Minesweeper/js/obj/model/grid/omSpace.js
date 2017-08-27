/**
 * A prototype for creating objects that stores all mine data
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {Function} Parent - The function of the parent prototype
 * @param {OMSpace} OMSpace - The function of this prototype
 * @since v1.0
 * @version v1.0
 */
(function(Parent, OMSpace) {

    "use strict";

    var PARENT = Parent.prototype;
    var $ = OMSpace.prototype = Object.create(PARENT);
    $.constructor = OMSpace;
    $._IMG_REVEALED = "/grid/space.png";

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {String} The requested event name for the grid owner
     * @since v1.0
     * @version v1.0
     */
    $._onclickUpEvent = function() { return "onHitSpace"; };

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @returns {Array} The requested argument list
     * @since v1.0
     * @version v1.0
     */
    $._onclickUpArgs = function() {
        return PARENT._onclickUpArgs.call(this).concat([this._IMG_REVEALED]);
    }; // $._onclickUpArgs

})(DoubleX.PROJ.MINESWEEPER.OBJ.MODEL.OMGrid, 
        DoubleX.PROJ.MINESWEEPER.OBJ.MODEL.OMSpace);