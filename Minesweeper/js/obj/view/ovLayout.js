/**
 * A prototype for creating objects that coordinates all UI view positions
 * Idempotent
 * @author DoubleX
 * @param {OVLayout} OVLayout - The function of this prototype
 * @since v1.0
 * @version v1.0
 */
(function(OVLayout) {

    "use strict";

    var $ = OVLayout.prototype;
    $.constructor = OVLayout;
    $._CELL_ID_X = "X", $._CELL_ID_Y = "Y";

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Dom} topBar - The top section of the game baord UI view
     * @param {Dom} grids - The grids consisting of individual grid UI
     * @param {Number} topBarHeightRatio - Between 0 and 1
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Number} wRate - The percentage of screen width taken
     * @param {Number} hRate - The percentage of screen height taken
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(topBar, grids, topBarHeightRatio, w, h, wRate, hRate) {
        this._initReadOnlys(topBar, grids, topBarHeightRatio, wRate, hRate);
        this._initCaches(w, h);
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {Dom} topBar - The top section of the game baord UI view
     * @param {Dom} grids - The grids consisting of individual grid UI
     * @param {Number} topBarHeightRatio - Between 0 and 1
     * @param {Number} wRate - The percentage of screen width taken
     * @param {Number} hRate - The percentage of screen height taken
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(topBar, grids, topBarHeightRatio, wRate, hRate) {
        this._TOP_BAR = topBar, this._GRIDS = grids;
        this._TOP_BAR_HEIGHT_RATIO = topBarHeightRatio;
        this._GRID_HEIGHT_RATIO = 1 - topBarHeightRatio;
        this._W_RATE = wRate, this._H_RATE = hRate;
    }; // $._initReadOnlys

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function(w, h) {
        this._setGridWH(w, h);
        this._setTopBarWH(w);
    }; // $._initCaches

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @since v1.0
     * @version v1.0
     */
    $._setGridWH = function(w, h) {
        this._W = w, this._H = h;
        this._gridSize = this._screenFitGridSize(w, h);
        this._GRIDS.innerHTML = this._gridTableContents(w, h);
    }; // $._setGridWH

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @returns {Number} The requested size
     * @since v1.0
     * @version v1.0
     */
    $._screenFitGridSize = function(w, h) {
        return Math.min(Math.floor(this._usedScreenW() / w), 
                Math.floor(this._GRID_HEIGHT_RATIO * this._usedScreenH() / h));
    }; // $._screenFitGridSize

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @returns {Number} The requested width
     * @since v1.0
     * @version v1.0
     */
    $._usedScreenW = function() { return this._screenW() * this._W_RATE; };

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @returns {Number} The requested width
     * @since v1.0
     * @version v1.0
     */
    $._screenW = function() {
        return window.innerWidth || document.documentElement.clientWidth || 
                document.body.clientWidth;
    }; // $._screenW

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @returns {String} The requested contents
     * @since v1.0
     * @version v1.0
     */
    $._gridTableContents = function(w, h) {
        var contents = "";
        for (var rowIndex = 0; rowIndex < h; rowIndex++) {
            contents += this._gridTableRowContents(w, rowIndex);
        }
        return contents;
    }; // $._gridTableContents

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} rowIndex - Must be nonnegative and within h
     * @returns {String} The requested contents
     * @since v1.0
     * @version v1.0
     */
    $._gridTableRowContents = function(w, rowIndex) {
        var contents = "<tr>";
        for (var colIndex = 0; colIndex < w; colIndex++) {
            contents += this._gridTableCellContents(colIndex, rowIndex);
        }
        return contents + "</tr>";
    }; // $._gridTableRowContents

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} x - The grid col index
     * @param {Number} y - The grid row index
     * @returns {String} The requested contents
     * @since v1.0
     * @version v1.0
     */
    $._gridTableCellContents = function(x, y) {
        var contents = "<td><img id='" + this._gridId(x, y) + "' ";
        contents += "draggable='false' src='' hspace='0' vspace='0'";
        contents += " width='" + this._gridSize + "' height='" + this._gridSize;
        return contents + "'></td>";
    }; // $._gridTableCellContents

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @since v1.0
     * @version v1.0
     */
    $._setTopBarWH = function(w) {
        var height = this._TOP_BAR_HEIGHT_RATIO * this._usedScreenH();
        this._setTopBarStyle("width", this._gridSize * w + "px");
        this._setTopBarStyle("height", height + "px");
    }; // $._setTopBarWH

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {String} type - The type of the style to be set
     * @param {String} val - The value of the style to be set
     * @since v1.0
     * @version v1.0
     */
    $._setTopBarStyle = function(type, val) { this._TOP_BAR.style[type] = val; };

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @returns {Number} The requested height
     * @since v1.0
     * @version v1.0
     */
    $._usedScreenH = function() { return this._screenH() * this._H_RATE; };

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @returns {Number} The requested height
     * @since v1.0
     * @version v1.0
     */
    $._screenH = function() {
        return window.innerHeight || document.documentElement.clientHeight || 
                document.body.clientHeight;
    }; // $._screenH

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @since v1.0
     * @version v1.0
     */
    $.onResize = function(w, h) { this._initCaches(w, h); };

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onReset = function() { this._initCaches(this._W, this._H); };

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @interface
     * @param {Number} x - The grid col index
     * @param {Number} y - The grid row index
     * @returns {Dom} The requested grid view 
     * @since v1.0
     * @version v1.0
     */
    $.grid = function(x, y) {
        return document.getElementById(this._gridId(x, y));
    }; // $._grid

    /**
     * Potential Hotspot/Pure function
     * @author DoubleX
     * @param {Number} x - The grid col index
     * @param {Number} y - The grid row index
     * @returns {String} The requested id
     * @since v1.0
     * @version v1.0
     */
    $._gridId = function(x, y) {
        return this._CELL_ID_X + x + this._CELL_ID_Y + y;
    }; // $._gridId

})(DoubleX.PROJ.MINESWEEPER.OBJ.VIEW.OVLayout);