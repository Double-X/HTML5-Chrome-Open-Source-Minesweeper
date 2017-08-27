/**
 * Declares all objects to be used
 * Idempotent
 * @author DoubleX
 * @param {Object} OBJ - The container storing all objects
 * @since v1.0
 * @version v1.0
 */
(function(OBJ) {

    "use strict";

    // Controller objects
    var _OC = OBJ.CONTROLLER;
    _OC.OCClicks = function() { this.initialize.apply(this, arguments); };
    _OC.OCGrids = function() { this.initialize.apply(this, arguments); };
    _OC.OCTopBar = function() { this.initialize.apply(this, arguments); };
    //

    // Container objects
    OBJ.OGrids = function() { this.initialize.apply(this, arguments); };
    //

    // Model objects
    var _OM = OBJ.MODEL;
    _OM.OMGrids = function() { this.initialize.apply(this, arguments); };
    _OM.OMRecord = function() { this.initialize.apply(this, arguments); };
    _OM.OMGrid = function() { this.initialize.apply(this, arguments); };
    _OM.OMMine = function() { this.initialize.apply(this, arguments); };
    _OM.OMNum = function() { this.initialize.apply(this, arguments); };
    _OM.OMSpace = function() { this.initialize.apply(this, arguments); };
    //

    // View objects
    var _OV = OBJ.VIEW;
    _OV.OVDrawnSkin = function() { this.initialize.apply(this, arguments); };
    _OV.OVLayout = function() { this.initialize.apply(this, arguments); };
    _OV.OVTimer = function() { this.initialize.apply(this, arguments); };
    //

})(DoubleX.PROJ.MINESWEEPER.OBJ);