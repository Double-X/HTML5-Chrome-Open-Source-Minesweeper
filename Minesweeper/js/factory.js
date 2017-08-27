(function(namespace) {

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object} CFG - The returned configuration mapping
     * @param {Function} SUBSCRIBE - Subscribes to a component
     * @param {Function} PUBLISH - Publishes contents to subscribers
     * @param {Function} CALLBACK - Called when all components are run
     * @returns {Function()} The requested function
     * @since v1.0
     * @version v1.0
     */
    namespace.Factory = function(CFG, SUBSCRIBE, PUBLISH, CALLBACK) {

        "use strict";

        var $ = namespace.Factory;

        $._SUBSCRIBE = SUBSCRIBE, $._PUBLISH = PUBLISH;

        // Configurations
        $._CFG = CFG;

        var _DOMS = $._CFG.doms, _TOP_BAR = _DOMS.topBar;
        var _LAST_W = $._CFG.lastW, _LAST_H = $._CFG.lastH;
        var _LAST_MINE_NUM = $._CFG.lastMineNum;
        //

        // Containers
        var _FUNC = namespace.FUNC, _OBJ = namespace.OBJ;
        var _FC = _FUNC.CONTROLLER, _FM = _FUNC.MODEL, _FV = _FUNC.VIEW;
        var _OC = _OBJ.CONTROLLER, _OM = _OBJ.MODEL, _OV = _OBJ.VIEW;
        //

        /**
         * Idempotent
         * @author DoubleX
         * @since v1.0
         * @version v1.0
         */
        $._build = function() {
            // Entities being depended by something else
            $._F_ALL_OTHER_GRIDS = _FUNC.FAllOtherGrids($._PUBLISH);
            $._F_NEAR_GRIDS = _FUNC.FNearGrids($._CFG.lastNearRa, $._PUBLISH);
            $._FM_JSON_IO = _FM.FMJSONIO($._PUBLISH);
            $._FM_PROFILE = _FM.FMProfile($._FM_JSON_IO, $._PUBLISH);
            $._FC_PROFILE = _FC.FCProfile($._FM_PROFILE, $._PUBLISH);
            $._FC_RECORDS = _FC.FCRecords($._FM_PROFILE, $._PUBLISH);
            $._FM_MENU = _FM.FMMenu($._CFG.isInvalidBoardParams, $._CFG.skins, 
                    $._FM_JSON_IO, $._PUBLISH);
            $._FV_PROFILE = _FV.FVProfile(_DOMS.profileNameRegion, 
                    $._SUBSCRIBE, $._PUBLISH, $._CFG.lastProfileName, 
                    $._CFG.lastProfileRegion);
            $._FV_REMAIN_MINE_NUM = 
                    _FV.FVRemainMineNum(_TOP_BAR.remainMineNum, $._PUBLISH);
            $._OV_DRAWN_SKIN = new _OV.OVDrawnSkin(
                    $._SUBSCRIBE, $._PUBLISH, $._CFG.skinPre, $._CFG.lastSkin);
            var _CHANGE_SKIN = 
                    $._OV_DRAWN_SKIN.changeSkin.bind($._OV_DRAWN_SKIN);
            var _ON_DRAW = $._OV_DRAWN_SKIN.onDraw.bind($._OV_DRAWN_SKIN);
            $._NEW_GAME_BTN = 
                    _FV.FVNewGameBtn(_TOP_BAR.newGameBtn, _ON_DRAW, $._PUBLISH);
            $._OC_CLICKS = new _OC.OCClicks(_DOMS.board);
            $._OV_LAYOUT = new _OV.OVLayout(_TOP_BAR.topBar, _DOMS.grids, 
                    _TOP_BAR.heightRatio, _LAST_W, _LAST_H, _DOMS.boardWRate, 
                    _DOMS.boardHRate);
            var _GRID = $._OV_LAYOUT.grid.bind($._OV_LAYOUT);
            $._FM_NEW_MINES = 
                    _FM.FMNewMines(_OM.OMMine, $._OC_CLICKS, _GRID, $._PUBLISH);
            $._FM_NEW_NUMS = _FM.FMNewNums($._F_NEAR_GRIDS, _OM.OMNum, 
                    $._OC_CLICKS, _GRID, $._PUBLISH);
            $._FM_NEW_SPACES = _FM.FMNewSpaces(
                    _OM.OMSpace, $._OC_CLICKS, _GRID, $._PUBLISH);
            $._OM_GRIDS = new _OM.OMGrids($._F_NEAR_GRIDS, 
                    $._F_ALL_OTHER_GRIDS, _LAST_W, _LAST_H, $._FM_NEW_MINES, 
                    $._FM_NEW_NUMS, $._FM_NEW_SPACES);
            $._OM_RECORD = new _OM.OMRecord($._SUBSCRIBE, $._FM_PROFILE);
            $._OV_TIMER = 
                    new _OV.OVTimer(_TOP_BAR.timer, $._SUBSCRIBE, $._PUBLISH);
            $._OC_GRIDS = new _OC.OCGrids($._SUBSCRIBE, $._PUBLISH, _ON_DRAW, 
                    $._NEW_GAME_BTN, $._FV_REMAIN_MINE_NUM, $._OM_GRIDS, 
                    $._OV_LAYOUT, $._OV_TIMER, _LAST_W, _LAST_H, 
                    _LAST_MINE_NUM);
            var _ON_RESET = $._OC_GRIDS.onReset.bind($._OC_GRIDS);
            //
            // Entities not being depended by anything else
            $._FC_MENU = _FC.FCMenu(_DOMS.menu, $._FC_PROFILE, $._FC_RECORDS, 
                    $._FM_MENU, _CHANGE_SKIN, $._OC_GRIDS, $._PUBLISH);
            $._OC_TOP_BAR = new _OC.OCTopBar(
                    _TOP_BAR.topBar, $._NEW_GAME_BTN, _ON_RESET);
            //
        }; // $._build

        /**
         * @author DoubleX
         * @interface
         * @since v1.0
         * @version v1.0
         */
        $.run = function() {
            $._build();
            $._FC_MENU.attachListeners();
            $._NEW_GAME_BTN.onUnhold(); // Initializes its UI view
            $._OC_GRIDS.onResize(_LAST_W, _LAST_H, _LAST_MINE_NUM);
            CALLBACK();
        }; // run

        return $.run; // The Factory API

    }; // DoubleX.PROJ.MINESWEEPER.Factory

})(DoubleX.PROJ.MINESWEEPER);