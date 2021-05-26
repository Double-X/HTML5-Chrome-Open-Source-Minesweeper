/**
 * This function should be called exactly once per page load
 * Hotspot/Pure function
 * @author DoubleX
 * @param {Number} NEAR_RA - The coordinate range regarded as near
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @since v1.0
 * @version v1.1
 */
DoubleX.PROJ.MINESWEEPER.FUNC.FNearGrids = function(NEAR_RA, PUBLISH) {

    "use strict";

    var $ = DoubleX.PROJ.MINESWEEPER.FUNC.FNearGrids;

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @interface
     * @param {Number} x - The col index of the current grid
     * @param {Number} y - The row index of the current grid
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @param {Array[Array[OGrid]]} oGrids - The list of list of grids
     * @returns {Array[OGrid]} The requested list of grids
     * @since v1.0
     * @version v1.0
     */
    $.nearGrids = function(x, y, w, h, oGrids) {
        var nearGridRas = $._nearGridBounds(x, y, w, h);
        var xBounds = nearGridRas.x, yBounds = nearGridRas.y;
        var maxX = x + xBounds.max, maxY = y + yBounds.max, nearGrids = [];
        for (var rowIndex = y + yBounds.min; rowIndex <= maxY; rowIndex++) {
            for (var colIndex = x + xBounds.min; colIndex <= maxX; colIndex++) {
                if ($._isCurGrid(x, y, colIndex, rowIndex)) continue;
                nearGrids.push($._nearGrid(oGrids, colIndex, rowIndex));
            }
        }
        return nearGrids;
    }; // $.nearGrids

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {Number} x - The col index of the current grid
     * @param {Number} y - The row index of the current grid
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @returns {Object[String, Object[String, Number]]} The requested mapping
     *                                                  of nearby coordinates
     * @since v1.0
     * @version v1.1
     */
    $._nearGridBounds = function(x, y, w, h) {
        var isTop = y <= 0, isBottom = y >= h - NEAR_RA;
        var isMostLeft = x <= 0, isMostRight = x >= w - NEAR_RA;
        if (isTop) {
            if (isMostLeft) return $._newNearGridBounds(0, NEAR_RA, 0, NEAR_RA);
            if (isMostRight) {
                return $._newNearGridBounds(-NEAR_RA, 0, 0, NEAR_RA);
            }
            return $._newNearGridBounds(-NEAR_RA, NEAR_RA, 0, NEAR_RA);
        } else if (isBottom) {
            if (isMostLeft) {
                return $._newNearGridBounds(0, NEAR_RA, -NEAR_RA, 0);
            } else if (isMostRight) {
                return $._newNearGridBounds(-NEAR_RA, 0, -NEAR_RA, 0);
            }
            return $._newNearGridBounds(-NEAR_RA, NEAR_RA, -NEAR_RA, 0);
        } else if (isMostLeft) {
            return $._newNearGridBounds(0, NEAR_RA, -NEAR_RA, NEAR_RA);
        } else if (isMostRight) {
            return $._newNearGridBounds(-NEAR_RA, 0, -NEAR_RA, NEAR_RA);
        }
        return $._newNearGridBounds(-NEAR_RA, NEAR_RA, -NEAR_RA, NEAR_RA);
    }; // $._nearGridBounds

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {Number} minX - The min col index to be regarded as near
     * @param {Number} maxX - The max col index to be regarded as near
     * @param {Number} minY - The min row index to be regarded as near
     * @param {Number} maxY - The max row index to be regarded as near
     * @returns {Object[String, Object[String, Number]]} The requested mapping
     *                                                  of nearby coordinates
     * @since v1.0
     * @version v1.0
     */
    $._newNearGridBounds = function(minX, maxX, minY, maxY) {
        return { x: { min: minX, max: maxX }, y: { min: minY, max: maxY } };
    }; // $._newNearGridBounds

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {Number} x - The col index of the current grid
     * @param {Number} y - The row index of the current grid
     * @param {Number} colIndex - The currently check col index
     * @param {Number} rowIndex - The currently check row index
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isCurGrid = function(x, y, colIndex, rowIndex) {
        return x === colIndex && y === rowIndex;
    }; // $._isCurGrid

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {Array[Array[OGrid]]} oGrids - The list of list of grids
     * @param {Number} colIndex - The currently check col index
     * @param {Number} rowIndex - The currently check row index
     * @returns {OGrid/Nullable} The requested grid
     * @since v1.0
     * @version v1.0
     */
    $._nearGrid = function(oGrids, colIndex, rowIndex) {
        return oGrids[rowIndex] ? oGrids[rowIndex][colIndex] : undefined;
    }; // $._nearGrid

    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = { nearGrids: $.nearGrids };
    //
    PUBLISH("FNearGrids", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.FUNC.FNearGrids