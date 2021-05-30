/**
 * Setups the subscriptions to let this plugin listen to the stat sources
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    namespace.PLUGINS.DEMO.Subscription = namespace.Subscription();

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Loads the new class implementing the plugin in the factory
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.1
 */
(function(namespace) {

    "use strict";

    var $ = namespace.Factory, _PLUGINS = namespace.PLUGINS;
    var _PLUGIN = _PLUGINS.DEMO, _SUBSCRIPTION = _PLUGIN.Subscription;
    var _SUBSCRIBE = _SUBSCRIPTION.subscribe, _PUBLISH = _SUBSCRIPTION.publish;
    var _FACTORY = _PLUGIN.Factory = { orig: {}, new: {} };
    var $$ = _FACTORY.orig, $$$ = _FACTORY.new;

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._build = $._build;
    $._build = function() {
        // Added to edit the internal of the functions right after it's created
        $$$._subscribeFuncs();
        //
        $$._build();
        $$$._makeNewObjs(); // Added to load the new classes to the used as well
    }; // $._build

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._subscribeFuncs = function() {
        $._SUBSCRIBE("FCMenu", $$$._editFCMenu);
        $._SUBSCRIBE("FMNewMines", $$$._editFMNewMines);
        $._SUBSCRIBE("FMProfile", $$$._editFMProfile);
    }; // $$$._subscribeFuncs

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object[String, Function]} fcMenu - The FCMenu API mapping
     * @since v1.0
     * @version v1.0
     */
    $$$._editFCMenu = function(fcMenu) {
        // These codes are easy, simple and small enough to be kept all together
        var menu = $._CFG.doms.menu.menu, profiles = $._CFG.doms.menu.profiles;
        fcMenu._DEMO_FILE_ID_NAME = ["loadDemo", "Load Demo"];
        fcMenu._DEMO_OPTIONS_TEXTS = {
            loadDemo: "Load Demo",
            saveDemo: "Save Demo"
        };
        fcMenu.addDemoSelections = function() {
            fcMenu._addDemoFileUI();
            Object.keys(fcMenu._DEMO_OPTIONS_TEXTS).forEach(
                    fcMenu._addDemoSelection);
        };
        fcMenu._addDemoFileUI = function() {
            var demoFileUI = fcMenu._demoFileUI();
            menu.appendChild(demoFileUI);
            // Otherwise fcMenu._attachListener won't find the newly added dom
            $._CFG.doms.menu[fcMenu._DEMO_FILE_ID_NAME[0]] = demoFileUI;
            setTimeout(fcMenu._attachDemoFileUIListener);
            //
        };
        fcMenu._demoFileUI = function() {
            var demoFileUI = document.createElement('input');
            demoFileUI.id = fcMenu._DEMO_FILE_ID_NAME[0];
            demoFileUI.type = 'file', demoFileUI.style = 'display: none;';
            demoFileUI.name = fcMenu._DEMO_FILE_ID_NAME[1];
            return demoFileUI;
        };
        fcMenu._attachDemoFileUIListener = function() {
            fcMenu._attachListener("loadDemo", fcMenu._onLoadDemo);
        };
        fcMenu._addDemoSelection = function(option) {
            profiles.appendChild(fcMenu._demoSelection(option));
        };
        fcMenu._demoSelection = function(option) {
            var demoSelection = document.createElement('option');
            demoSelection.value = option, demoSelection.contentEditable = false;
            demoSelection.textContent = fcMenu._DEMO_OPTIONS_TEXTS[option];
            return demoSelection;
        };
        fcMenu._loadDemo = function() { fcMenu._demoFileDom().click(); };
        fcMenu._onLoadDemo = function(event) {
            _PUBLISH("FCMenu demo _onLoadDemo", fcMenu._demoFileDom().files[0]);
        };
        fcMenu._demoFileDom = function() {
            return $._CFG.doms.menu[fcMenu._DEMO_FILE_ID_NAME[0]];
        };
        fcMenu._onSaveDemo = function() {
            _PUBLISH("FCMenu demo _onSaveDemo", null);
        };
        var profileValEvents = fcMenu._PROFILE_VAL_EVENTS;
        profileValEvents.loadDemo = [fcMenu._loadDemo, []];
        profileValEvents.saveDemo = [fcMenu._onSaveDemo, []];
        fcMenu.APIS.addDemoSelections = fcMenu.addDemoSelections;
        //
    }; // $$$._editFCMenu

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object[String, Function]} fmNewMines - The FMNewMines API
     *                                                 mapping
     * @since v1.0
     * @version v1.0
     */
    $$$._editFMNewMines = function(fmNewMines) {
        // These codes are easy, simple and small enough to be kept all together
        var _FM_NEW_MINES = _PLUGIN.FMNewMines = { orig: {}, new: {} };
        var orig = _FM_NEW_MINES.orig;
        orig._newMinePosList = fmNewMines._newMinePosList;
        fmNewMines._newMinePosList = function(w, h, mineNum, sx, sy) {
            if (fmNewMines._isPlayingDemo) return fmNewMines._demoMinePosList;
            var newMinePosList = orig._newMinePosList(w, h, mineNum, sx, sy);
            _PUBLISH("FMNewMines demo _newMinePosList", newMinePosList);
            return newMinePosList;
        };
        fmNewMines._setIsPlayingDemo = function(isPlayingDemo) {
            /** @todo: Rethink of why a function needs to encapsulate states */
            fmNewMines._isPlayingDemo = isPlayingDemo;
            if (!fmNewMines._isPlayingDemo) fmNewMines._setNewMinePosList([]);
            //
        };
        fmNewMines._setNewMinePosList = function(newMinePosList) {
            /** @todo: Rethink of why a function needs to encapsulate states */
            fmNewMines._demoMinePosList = newMinePosList;
            //
        };
        _SUBSCRIBE(
                "OMDemo demo _setContents", fmNewMines._setNewMinePosList);
        _SUBSCRIBE(
                "OMDemo demo _setIsPlayingDemo", fmNewMines._setIsPlayingDemo);
        //
    }; // $$$._editFMNewMines

    /**
     * Idempotent
     * @author DoubleX
     * @param {Object[String, Function]} fmProfile - The FMProfile API mapping
     * @since v1.0
     * @version v1.1
     */
    $$$._editFMProfile = function(fmProfile) {
        // These codes are easy, simple and small enough to be kept all together
        fmProfile._DEMO_NAME_PARTS_KEY_VAL_SEPARATOR = "=";
        fmProfile._DEMO_NAME_PARTS_SEPARATOR = "&";
        fmProfile._DEMO_NAME_PREFIX = "(Demo)";
        fmProfile._HIGHSCORE_DEMO_NAME_PREFIX = "(Highscore Demo)";
        fmProfile.loadDemo = function(file, callback, errback) {
            $._FM_JSON_IO.importJSON(file, callback, errback);
        };
        fmProfile.saveDemo = function(contents) {
            var profileName = fmProfile._lastUsedProfileName();
            var profileRegion = 
                    fmProfile._profileRegion(fmProfile._readJSON(profileName));
            $._FM_JSON_IO.exportJSON(fmProfile._demoName(
                    contents.hasHighscores, contents.stats, profileName, 
                    profileRegion), fmProfile._demoContents(contents, 
                    profileName, profileRegion));
        };
        fmProfile._demoName = function(
                hasHighscores, stats, profileName, profileRegion) {
            return fmProfile._demoNamePrefix(hasHighscores) + 
                    fmProfile._demoNameParts(fmProfile._demoProfileNameRegion(
                    profileName, profileRegion)) + 
                    fmProfile._DEMO_NAME_PARTS_SEPARATOR + 
                    fmProfile._demoNameParts(stats);
        };
        fmProfile._demoNamePrefix = function(hasHighscores) {
            return hasHighscores ? fmProfile._HIGHSCORE_DEMO_NAME_PREFIX : 
                    fmProfile._DEMO_NAME_PREFIX;
        };
        fmProfile._demoProfileNameRegion = function(
                profileName, profileRegion) {
            return { profileName: profileName, profileRegion: profileRegion };
        };
        fmProfile._demoNameParts = function(stats) {
            return Object.keys(stats).map(
                    fmProfile._demoNamePart.bind(fmProfile, stats)).join(
                    fmProfile._DEMO_NAME_PARTS_SEPARATOR);
        };
        fmProfile._demoNamePart = function(stats, stat) {
            return stat + fmProfile._DEMO_NAME_PARTS_KEY_VAL_SEPARATOR + 
                    fmProfile._demoNameStat(stats[stat]);
        };
        fmProfile._demoNameStat = function(val) {
            // Not coverting val to String then Number would cause isNaN to fail
            var name = val.toString();
            return isNaN(+name) || !name.split(".")[1] ? val : val.toFixed(2);
            //
        };
        fmProfile._demoContents = function(
                contents, profileName, profileRegion) {
            contents.profileName = profileName;
            contents.profileRegion = profileRegion;
            return JSON.stringify(contents);
        };
        var api = fmProfile.APIS;
        api.loadDemo = fmProfile.loadDemo, api.saveDemo = fmProfile.saveDemo;
        //
    }; // $$$._editFMProfile

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._makeNewObjs = function() {
        $$$._OM_DEMO = 
                new _PLUGIN.OMDemo($._SUBSCRIBE, $._PUBLISH, $._FM_PROFILE);
        var _DOMS = $._CFG.doms;
        $$$._FC_DEMO = _PLUGIN.FCDemo(_DOMS.topBar.topBar, 
                _DOMS.grids.parentNode, _DOMS.bottomBar, $._OV_LAYOUT, 
                _SUBSCRIBE, _PUBLISH);
        $._FC_MENU.addDemoSelections();
    }; // $$$._makeNewObjs

})(DoubleX.PROJ.MINESWEEPER);

/**
 * This function should be called exactly once per page load
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {Dom} TOP_BAR - The UI view of the game board top section
 * @param {Dom} BOARD - The div tag as the game board container
 * @param {Dom} BOTTOM_BAR - The div tag placed at the bottom of the body
 * @param {OVLayout} OV_LAYOUT - The UI view layout coordinator
 * @param {Function} SUBSCRIBE - Subscribes to a component
 * @param {Function} PUBLISH - Publishes itself to its subscribers
 * @returns {Object[String, Function]} The requested function mapping
 * @todo: Implements the fastforward and skip to any timing of the demo features
 * @since v1.0
 * @version v1.1
 */
DoubleX.PROJ.MINESWEEPER.PLUGINS.DEMO.FCDemo = function(
        TOP_BAR, BOARD, BOTTOM_BAR, OV_LAYOUT, SUBSCRIBE, PUBLISH) {

    "use strict";

    var _PATH = DoubleX.PROJ.MINESWEEPER.PLUGINS.PATH;
    var _PATH_CFG = _PATH ? _PATH.configuration : null;
    var $ = DoubleX.PROJ.MINESWEEPER.PLUGINS.DEMO.FCDemo;
    $._DEMO_PLAYER_SLIDER_MAX = 100;
    $._DEMO_PLAYER_BUTTON_SRCS = {
        tenPercent: "demo/0.1x.png",
        twentyPercent: "demo/0.2x.png",
        fiftyPercent: "demo/0.5x.png",
        oneHundredPercent: "demo/1x.png",
        twoHundredPercent: "demo/2x.png",
        fiveHundredPercent: "demo/5x.png",
        oneThousandPercent: "demo/10x.png",
        pause: "demo/pause.png",
        play: "demo/play.png",
        stop: "demo/stop.png"
    };
    $._DEMO_PATH_COOR_UNIT = "px";
    $._DEMO_PATH_CURSOR_ID = "demoPathCursor";
    $._DEMO_PATH_CURSOR_SRC = "demo/cursor.png";
    $._DEMO_PLAYER_BAR_ID = "demoPlayerBar";
    $._DEMO_PLAYER_SLIDER_ID = "demoPlayerSlider";
    $._DEMO_PLAYER_TEXT_CONTENT = "Please keep the cursor away from the board when playing the demo and stop playing it before doing anything else!";
    $._DEMO_PLAYER_TEXT_ID = "demoPlayerText";

    /**
     * Idempotent
     * @author DoubleX
     * @param {Number} multiplier - The demo playing speed multiplier
     * @since v1.0
     * @version v1.0
     */
    $.changeSpeed = function(multiplier) {
        PUBLISH("FCDemo demo changeSpeed", multiplier);
    }; // $.changeSpeed

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $.pause = function() { PUBLISH("FCDemo demo pause", null); };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $.play = function() { PUBLISH("FCDemo demo play", null); };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $.stop = function() {
        // Not reloading the whole page would have to clean way too much mess
        document.location.reload(false);
        //
    }; // $.stop

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._createDoms = function() {
        // Makes this crucial text more noticeable by placing it above the bar
        $._createDemoPlayerText();
        $._createDemoPlayerBar();
        $._createDemoPlayerSlider();
        //
        $._createDemoPathCursor();
    }; // $._createDoms

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._createDemoPlayerText = function() {
        BOTTOM_BAR.appendChild($._newDemoPlayerText());
    }; // $._createDemoPlayerText

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Dom} The requested demo player text
     * @since v1.0
     * @version v1.0
     */
    $._newDemoPlayerText = function() {
        var demoPlayerText = document.createElement('div');
        demoPlayerText.id = $._DEMO_PLAYER_TEXT_ID;
        demoPlayerText.contentEditable = false;
        demoPlayerText.style.visibility = "hidden";
        demoPlayerText.textContent = $._DEMO_PLAYER_TEXT_CONTENT;
        return demoPlayerText;
    }; // $._newDemoPlayerText

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._createDemoPlayerBar = function() {
        BOTTOM_BAR.appendChild($._newDemoPlayerBar());
    }; // $._createDemoPlayerBar

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Dom} The requested demo player bar
     * @since v1.0
     * @version v1.0
     */
    $._newDemoPlayerBar = function() {
        var demoPlayerBar = document.createElement('table');
        demoPlayerBar.id = $._DEMO_PLAYER_BAR_ID;
        demoPlayerBar.style.visibility = "hidden";
        demoPlayerBar.appendChild($._newDemoPlayerBarBody());
        return demoPlayerBar;
    }; // $._newDemoPlayerBar

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Dom} The requested demo player bar body
     * @since v1.0
     * @version v1.0
     */
    $._newDemoPlayerBarBody = function() {
        var demoPlayerBarBody = document.createElement('tbody');
        demoPlayerBarBody.appendChild($._newDemoPlayerBarRow());
        return demoPlayerBarBody;
    }; // $._newDemoPlayerBarBody

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Dom} The requested demo player bar row
     * @since v1.0
     * @version v1.1
     */
    $._newDemoPlayerBarRow = function() {
        var demoPlayerBarRow = document.createElement('tr');
        $._newDemoPlayerBarButtons().forEach(
                $._addDemoPlayerBarButton.bind($, demoPlayerBarRow));
        return demoPlayerBarRow;
    }; // $._newDemoPlayerBarRow

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Array[Dom]} The requested list of demo player buttons
     * @since v1.0
     * @version v1.0
     */
    $._newDemoPlayerBarButtons = function() {
        return Object.keys($._DEMO_PLAYER_BUTTON_SRCS).map(
                $._newDemoPlayerBarButton);
    }; // $._newDemoPlayerBarButtons

    /**
     * Nullipotent
     * @author DoubleX
     * @param {String} domId - The id of the requested demo player button
     * @returns {Dom} The requested demo player button
     * @since v1.0
     * @version v1.0
     */
    $._newDemoPlayerBarButton = function(domId) {
        var buttonContainer = document.createElement('td');
        buttonContainer.appendChild($._newDemoPlayerBarButtonImg(domId));
        return buttonContainer;
    }; // $._newDemoPlayerBarButton

    /**
     * Nullipotent
     * @author DoubleX
     * @param {String} domId - The id of the requested demo player button
     * @returns {Dom} The requested demo player button image
     * @since v1.0
     * @version v1.0
     */
    $._newDemoPlayerBarButtonImg = function(domId) {
        var button = document.createElement('img');
        button.id = domId, button.src = $._DEMO_PLAYER_BUTTON_SRCS[domId];
        button.onclick = $._DEMO_PLAYER_BUTTON_LISTENERS[domId];
        return button;
    }; // $._newDemoPlayerBarButtonImg

    /**
     * @author DoubleX
     * @param {Dom} demoPlayerBarBody - The body containing demo player buttons
     * @param {Dom} demoPlayerButton - A button in the demo player bar
     * @since v1.0
     * @version v1.0
     */
    $._addDemoPlayerBarButton = function(demoPlayerBarBody, demoPlayerButton) {
        demoPlayerBarBody.appendChild(demoPlayerButton);
    }; // $._addDemoPlayerBarButton

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._createDemoPlayerSlider = function() {
        BOTTOM_BAR.appendChild($._newDemoPlayerSlider());
    }; // $._createDemoPlayerBar

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Dom} The requested demo player progress slider
     * @since v1.0
     * @version v1.0
     */
    $._newDemoPlayerSlider = function() {
        var demoPlayerSlider = document.createElement('input');
        demoPlayerSlider.id = $._DEMO_PLAYER_SLIDER_ID;
        demoPlayerSlider.type = "range";
        demoPlayerSlider.max = $._DEMO_PLAYER_SLIDER_MAX;
        demoPlayerSlider.min = demoPlayerSlider.value = 0;
        demoPlayerSlider.onchange = $._onSlideDemoPlayerProgressBar;
        demoPlayerSlider.step = $._demoPlayerSliderStep(demoPlayerSlider);
        var style = demoPlayerSlider.style;
        style.visibility = "hidden", style.width = "100%";
        return demoPlayerSlider;
    }; // $._newDemoPlayerSlider

    /**
     * Nullipotent
     * @author DoubleX
     * @param {Dom} demoPlayerSlider The demo player progress slider
     * @returns {Number} The requested slider input range step
     * @since v1.0
     * @version v1.0
     */
    $._demoPlayerSliderStep = function(demoPlayerSlider) {
        var ovTimer = DoubleX.PROJ.MINESWEEPER.OBJ.VIEW.OVTimer.prototype;
        return demoPlayerSlider.max / (ovTimer._ELAPSED_SECS_CAP * 1000);
    }; // $._demoPlayerSliderStep

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onSlideDemoPlayerProgressBar = function() {
        PUBLISH("FCDemo demo _onSlideDemoPlayerProgressBar", 
                $._demoPlayerTimeProgress());
    }; // $._onSlideDemoPlayerProgressBar

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested ratio between elapsed and max time
     * @since v1.0
     * @version v1.0
     */
    $._demoPlayerTimeProgress = function() {
        var demoPlayerSlider = $._demoUI($._DEMO_PLAYER_SLIDER_ID);
        return demoPlayerSlider.value / demoPlayerSlider.max;
    }; // $._demoPlayerSliderVal

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._createDemoPathCursor = function() {
        BOARD.appendChild($._newDemoPathCursor());
    }; // $._createDemoPathCursor

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Dom} The requested new demo path cursor
     * @since v1.0
     * @version v1.0
     */
    $._newDemoPathCursor = function() {
        var demoPathCursor = document.createElement('img');
        demoPathCursor.hspace = demoPathCursor.vspace = 0;
        demoPathCursor.id = $._DEMO_PATH_CURSOR_ID;
        demoPathCursor.src = $._DEMO_PATH_CURSOR_SRC;
        var style = demoPathCursor.style;
        style.display = "block", style.position = "absolute", 
        style.margin = style.padding = "0" + $._DEMO_PATH_COOR_UNIT;
        style.visibility = "hidden", style.zIndex = "999";
        return demoPathCursor;
    }; // $._newDemoPathCursor

    /**
     * Idempotent
     * @author DoubleX
     * @param {Number} size - The raw size of the cursor showing the path
     * @since v1.0
     * @version v1.0
     */
    $._onSetDemoUISize = function(size) {
        $._resizableDemoUIs().forEach($._setDemoUISize.bind($, size));
    }; // $._onSetDemoUISize

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Array[Dom]} The requested list of demo UIs to be resized
     * @since v1.0
     * @version v1.0
     */
    $._resizableDemoUIs = function() {
        return [$._demoPathCursor()].concat(
                Object.keys($._DEMO_PLAYER_BUTTON_SRCS).map($._demoUI));
    }; // $._resizableDemoUIs

    /**
     * Idempotent
     * @author DoubleX
     * @param {Number} size - The raw size of the cursor showing the path
     * @param {Dom} demoUI - The demo UI that are supposed to be resized
     * @since v1.0
     * @version v1.0
     */
    $._setDemoUISize = function(size, demoUI) {
        demoUI.width = demoUI.height = size;
    }; // $._setDemoUISize

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onPlayDemo = function() { $._makeDemoUIsVisible(); };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._makeDemoUIsVisible = function() {
        $._demoUIs().forEach($._makeDemoUIVisible);
    }; // $._makeDemoUIsVisible

    /**
     * Nullipotent
     * @author DoubleX
     * @since v1.0
     * @returns {Array[Dom]} - The requested list of demo UIs
     * @version v1.0
     */
    $._demoUIs = function() {
        return [
            $._demoPathCursor(),
            $._demoUI($._DEMO_PLAYER_BAR_ID),
            $._demoUI($._DEMO_PLAYER_SLIDER_ID),
            $._demoUI($._DEMO_PLAYER_TEXT_ID)
        ];
    }; // $._demoUIs

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Dom} The requested demo path cursor
     * @since v1.0
     * @version v1.0
     */
    $._demoPathCursor = function() {
        return $._demoUI($._DEMO_PATH_CURSOR_ID);
    }; // $._demoPathCursor

    /**
     * Idempotent
     * @author DoubleX
     * @param {Dom} demoUI - The UI for playing demos
     * @since v1.0
     * @version v1.0
     */
    $._makeDemoUIVisible = function(demoUI) {
        demoUI.style.visibility = "visible";
    }; // $._makeDemoUIVisible

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Object[String, Number]} pathXY - The board path x/y components
     * @since v1.0
     * @version v1.0
     */
    $._onExecPath = function(pathXY) {
        if (_PATH_CFG) $._execPath(pathXY, $._demoPathCursor());
    }; // $._onExecPath

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Object[String, Number]} pathXY - The board path x/y components
     * @param {Dom} demoPathCursor - The cursor showing the recorded path
     * @since v1.0
     * @version v1.0
     */
    $._execPath = function(pathXY, demoPathCursor) {
        /** @todo: Improve the accuracy of the cursor for showing the path */
        var style = demoPathCursor.style;
        style.left = $._demoPathCursorCoor($._demoPathCursorX(pathXY.x));
        style.top = $._demoPathCursorCoor($._demoPathCursorY(pathXY.y));
        //
    }; // $._execPath

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} pathX - The path x component in the board
     * @returns {Number} The requested raw left coordinate on the board
     * @since v1.0
     * @version v1.0
     */
    $._demoPathCursorX = function(pathX) {
        /** @todo: Use another way instead of accessing private variables */
        return pathX * OV_LAYOUT._gridSize / _PATH_CFG.gridSize;
        //
    }; // $._demoPathCursorX

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} pathY - The path y component in the board
     * @returns {Number} The requested raw top coordinate on the board
     * @since v1.0
     * @version v1.0
     */
    $._demoPathCursorY = function(pathY) {
        /** @todo: Use another way instead of accessing private variables */
        return pathY * OV_LAYOUT._gridSize / _PATH_CFG.gridSize + 
                $._demoPathCursorYOffset();
        //
    }; // $._demoPathCursorY

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested raw top coordinate offset on the board
     * @since v1.0
     * @version v1.0
     */
    $._demoPathCursorYOffset = function() {
        return +(TOP_BAR.style.height.replace($._DEMO_PATH_COOR_UNIT, ""));
    }; // $._demoPathCursorYOffset

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} coor - The raw coordinate on the board
     * @returns {String} The requested coor in the requested format
     * @since v1.0
     * @version v1.0
     */
    $._demoPathCursorCoor = function(coor) {
        return Math.ceil(coor) + $._DEMO_PATH_COOR_UNIT;
    }; // $._demoPathCursorCoor

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} timeProgress - The ratio between elapsed and max time
     * @since v1.0
     * @version v1.0
     */
    $._onUpdateTimeProgress = function(timeProgress) {
        $._demoUI($._DEMO_PLAYER_SLIDER_ID).value = 
                $._demoPlayerSliderVal(timeProgress);
    }; // $._onUpdateTimeProgress

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} timeProgress - The ratio between elapsed and max time
     * @returns {Number} The requested input range value
     * @since v1.0
     * @version v1.0
     */
    $._demoPlayerSliderVal = function(timeProgress) {
        return timeProgress * $._demoUI($._DEMO_PLAYER_SLIDER_ID).max;
    }; // $._demoPlayerSliderVal

    /**
     * Nullipotent
     * @author DoubleX
     * @param {String} domId - The id of the requested demo UI
     * @returns {Dom} The requested demo UI
     * @since v1.0
     * @version v1.0
     */
    $._demoUI = function(domId) { return document.getElementById(domId); };

    $._DEMO_PLAYER_BUTTON_LISTENERS = {
        tenPercent: $.changeSpeed.bind($, 0.1),
        twentyPercent: $.changeSpeed.bind($, 0.2),
        fiftyPercent: $.changeSpeed.bind($, 0.5),
        oneHundredPercent: $.changeSpeed.bind($, 1),
        twoHundredPercent: $.changeSpeed.bind($, 2),
        fiveHundredPercent: $.changeSpeed.bind($, 5),
        oneThousandPercent: $.changeSpeed.bind($, 10),
        pause: $.pause,
        play: $.play,
        stop: $.stop
    };
    // Plugins can simply attach new APIs into this object to be exposed
    $.APIS = {
        changeSpeed: $.changeSpeed,
        pause: $.pause,
        play: $.play,
        stop: $.stop
    };
    //

    $._createDoms();

    SUBSCRIBE("OVLayout demo $._setGridWH", $._onSetDemoUISize);
    SUBSCRIBE("OMDemo demo _setIsPlayingDemo", $._onPlayDemo);
    SUBSCRIBE("OMDemo demo _execPath", $._onExecPath);
    SUBSCRIBE("OMDemo demo _updateTimeProgress", $._onUpdateTimeProgress);
    PUBLISH("FCDemo demo", $); // Lets the subsribers access this function
    return $.APIS;

}; // DoubleX.PROJ.MINESWEEPER.PLUGINS.DEMO.FCDemo

/**
 * Implements the demo event recording features in OCClicks
 * Hotspot/Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCClicks.prototype;
    var _PLUGINS = namespace.PLUGINS, _PLUGIN = _PLUGINS.DEMO;
    var _SUBSCRIPTION = _PLUGIN.Subscription;
    var _SUBSCRIBE = _SUBSCRIPTION.subscribe, _PUBLISH = _SUBSCRIPTION.publish;
    var _OC_CLICKS = _PLUGIN.OCClicks = { orig: {}, new: {} };
    var $$ = _OC_CLICKS.orig, $$$ = _OC_CLICKS.new;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Dom} board - The dom receiving raw input events
     * @since v1.0
     * @version v1.0
     */
    $$.initialize = $.initialize;
    $.initialize = function(board) {
        $$.initialize.call(this, board);
        // Added to dispatch the events belonging here in the demo
        _SUBSCRIBE(_PLUGIN.OMDemo.prototype._PUBLISH_KEY_OC_CLICKS, 
                $$$._onEvent.bind(this));
        //
    }; // $.initialize

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $$._onmousedown = $._onmousedown;
    $._onmousedown = function(event) {
        // Added to publish the raw mouse down event
        _PUBLISH("OCClicks demo _onmousedown", event);
        //
        $$._onmousedown.call(this, event);
    }; // $._onmousedown

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $$._onmouseup = $._onmouseup;
    $._onmouseup = function(event) {
        // Added to publish the raw mouse up event
        _PUBLISH("OCClicks demo _onmouseup", event);
        //
        $$._onmouseup.call(this, event);
    }; // $._onmouseup

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Array[String, Event]} funcEvent - The function name event pair
     * @since v1.0
     * @version v1.0
     */
    $$$._onEvent = function(funcEvent) { this[funcEvent[0]](funcEvent[1]); };

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the demo path recording features in OCGrids
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCGrids.prototype;
    var _PLUGIN = namespace.PLUGINS.DEMO, _SUBSCRIPTION = _PLUGIN.Subscription;
    var _SUBSCRIBE = _SUBSCRIPTION.subscribe, _PUBLISH = _SUBSCRIPTION.publish;
    var _OC_GRIDS = _PLUGIN.OCGrids = { orig: {}, new: {} };
    var $$ = _OC_GRIDS.orig, $$$ = _OC_GRIDS.new;

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} subscribe - Subscribes to a component
     * @since v1.0
     * @version v1.0
     */
    $$._subscribe = $._subscribe;
    $._subscribe = function(subscribe) {
        $$._subscribe.call(this, subscribe);
        // Added to play the demo when it's loaded and about to be played
        $$$._subscribe.call(this);
        //
    }; // $._subscribe

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
    $$.onResize = $.onResize;
    $.onResize = function(w, h, mineNum) {
        // Added to notify that the board has been changed
        _PUBLISH("OCGrids demo onResize", null);
        //
        $$.onResize.call(this, w, h, mineNum);
    }; // $.onResize

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._onRecordStat = $._onRecordStat;
    $._onRecordStat = function() {
        // Added to let OMPath be notified on this timing
        _PUBLISH("OCGrids demo _onPreRecordStat", null);
        //
        $$._onRecordStat.call(this);
    }; // $._onRecordStat

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._subscribe = function() {
        _SUBSCRIBE(
                "OCGrids demo _onPreRecordStat", this._recordStat.bind(this));
        _SUBSCRIBE("OMDemo demo _onLoadDemoSuc", $$$._onLoadDemo.bind(this));
    }; // $$$._subscribe

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} contents - The contents of the demo to be loaded
     * @since v1.0
     * @version v1.0
     */
    $$$._onLoadDemo = function(contents) {
        var stats = contents.stats;
        this.onResize(stats.w, stats.h, stats.mineNum);
    }; // $$$._onLoadDemo

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the demo path recording features in OCTopBar
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.CONTROLLER.OCTopBar.prototype;
    var _PLUGIN = namespace.PLUGINS.DEMO;
    var _PUBLISH = _PLUGIN.Subscription.publish;
    var _OC_TOP_BAR = _PLUGIN.OCTopBar = { orig: {}, new: {} };
    var $$ =  _OC_TOP_BAR.orig, $$$ =  _OC_TOP_BAR.new;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $$._onReset = $._onReset;
    $._onReset = function(event) {
        $$$._onReset.call(this, event); // Added to notify about the reset event
        $$._onReset.call(this, event);
    }; // $._onReset

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $$$._onReset = function(event) {
        if (!this._isMouseLeft(event.which)) return;
        _PUBLISH("OCTopBar demo _onReset", null);
    }; // $$$._onReset

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Ensures the old boards(due to memory leak) won't intefere with the demo board
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @todo: Fixes the memory leak instead of implementing this hacky workaround
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _OBJ = namespace.OBJ;
    var _PARENT = _OBJ.OGrids.prototype, $ = _OBJ.MODEL.OMGrids.prototype;
    var _PLUGINS = namespace.PLUGINS, _PLUGIN = _PLUGINS.DEMO;
    var _OM_GRIDS = _PLUGIN.OMGrids = { orig: {}, new: {} };
    var $$$ = _OM_GRIDS.new;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @since v1.0
     * @version v1.0
     */
    $$$._resetGrids = function(w, h) {
        // This ordering must be preserved to disable the old but not new grids
        $$$._disableAllGrids.call(this);
        _PARENT._resetGrids.call(this, w, h);
        //
    }; // $._resetGrids
    $._resetGrids = $$$._resetGrids;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._disableAllGrids = function() {
        if (!this._grids) return;
        this._grids.forEach($$$._disableAllRowGrids.bind(this));
    }; // $$$._disableAllGrids

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Array[OGrid]} row - A row of grid data in the board
     * @since v1.0
     * @version v1.0
     */
    $$$._disableAllRowGrids = function(row) {
        row.forEach($$$._disableGrid.bind(this));
    }; // $$$._disableAllRowGrids

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {OGrid/Nullable} oGrid - The grid to be forceably revealed to be
     *                                  disabled
     * @since v1.0
     * @version v1.0
     */
    $$$._disableGrid = function(oGrid) { if (oGrid) oGrid.disable(); };

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the demo event recording features in OMGrid
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.MODEL.OMGrid.prototype;
    var _PLUGINS = namespace.PLUGINS, _PLUGIN = _PLUGINS.DEMO;
    var _SUBSCRIPTION = _PLUGIN.Subscription;
    var _SUBSCRIBE = _SUBSCRIPTION.subscribe, _PUBLISH = _SUBSCRIPTION.publish;
    var _OM_GRID = _PLUGIN.OMGrid = { orig: {}, new: {} };
    var $$ = _OM_GRID.orig, $$$ = _OM_GRID.new;

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {OCClicks} ocClicks - The object storing click statuses
     * @param {Function(Number, Number)} grid - Returns the grid of the given
     *                                           coordinates
     * @param {Function} callback - The function of grid data owner
     * @param {Number} x - Must be nonnegative and within w
     * @param {Number} y - Must be nonnegative and within h
     * @since v1.0
     * @version v1.0
     */
    $$.initialize = $.initialize;
    $.initialize = function(ocClicks, grid, callback, x, y) {
        $$.initialize.call(this, ocClicks, grid, callback, x, y);
        // Added to dispatch the events belonging here in the demo
        _SUBSCRIBE(_PLUGIN.OMDemo.prototype._PUBLISH_KEY_OM_GRID, 
                $$$._onEvent.bind(this));
        //
    }; // $.initialize

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $$._onmousedown = $._onmousedown;
    $._onmousedown = function(event) {
        // Added to publish the grid mouse down event only for the current grids
        if (this._isDisabled) return;
        _PUBLISH("OMGrid demo _onmousedown", [event, this._onEventBaseArgs()]);
        //
        $$._onmousedown.call(this, event);
    }; // $._onmousedown

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $$._onmouseenter = $._onmouseenter;
    $._onmouseenter = function(event) {
        // Added to publish the grid mouse enter event only for the current grid
        if (this._isDisabled) return;
        _PUBLISH("OMGrid demo _onmouseenter", [event, this._onEventBaseArgs()]);
        //
        $$._onmouseenter.call(this, event);
    }; // $._onmouseenter

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $$._onmouseleave = $._onmouseleave;
    $._onmouseleave = function(event) {
        // Added to publish the grid mouse leave event only for the current grid
        if (this._isDisabled) return;
        _PUBLISH("OMGrid demo _onmouseleave", [event, this._onEventBaseArgs()]);
        //
        $$._onmouseleave.call(this, event);
    }; // $._onmouseleave

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Event/Nullable} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $$._onmouseup = $._onmouseup;
    $._onmouseup = function(event) {
        // Added to publish the grid mouse up event only for the current grids
        if (this._isDisabled) return;
        _PUBLISH("OMGrid demo _onmouseup", [event, this._onEventBaseArgs()]);
        //
        $$._onmouseup.call(this, event);
    }; // $._onmouseup

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$.disable = function() { this._isDisabled = true; };
    $.disable = $$$.disable;

    /**
     * Hotspot/Idempotent
     * @author DoubleX
     * @param {Object} funcEventArgs - The function name event args container
     * @since v1.0
     * @version v1.0
     */
    $$$._onEvent = function(funcEventArgs) {
        if (!$$$._isThisGridEvent.call(this, funcEventArgs.args)) return;
        this[funcEventArgs.eventName](funcEventArgs.event);
    }; // $$$._onEvent

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Array[Number](2)} args - The event arguments
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $$$._isThisGridEvent = function(args) {
        return args[0] === this._X && args[1] === this._Y;
    }; // $$$._isThisGridEvent

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Stops updating the board stats to the profile in OMRecord when playing demo
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.MODEL.OMRecord.prototype;
    var _PLUGINS = namespace.PLUGINS, _PLUGIN = _PLUGINS.DEMO;
    var _SUBSCRIPTION = _PLUGIN.Subscription;
    var _SUBSCRIBE = _SUBSCRIPTION.subscribe, _PUBLISH = _SUBSCRIPTION.publish;
    var _OM_RECORD = _PLUGIN.OMRecord = { orig: {}, new: {} };
    var $$ = _OM_RECORD.orig, $$$ = _OM_RECORD.new;

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} subscribe - Subscribes to a component
     * @since v1.0
     * @version v1.0
     */
    $$._subscribe = $._subscribe;
    $._subscribe = function(subscribe) {
        $$._subscribe.call(this, subscribe);
        // Added to stop adding the record to the profile when playing demo
        _SUBSCRIBE("OMDemo demo _setIsPlayingDemo", 
                $$$._setIsPlayingDemo.bind(this));
        //
    }; // $._subscribe

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._addRecord = $._addRecord;
    $._addRecord = function() {
        // Edited to stop adding the record to the profile when playing demo
        if (!this._isPlayingDemo) $$._addRecord.call(this);
        //
    }; // $._addRecord

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array[String]} newHighscoresStats - The list of stats having
     *                                              new highscores
     * @since v1.0
     * @version v1.0
     */
    $$._showNewHighscoresStats = $._showNewHighscoresStats;
    $._showNewHighscoresStats = function(newHighscoresStats) {
        // Added to notify that the recorded game has highscores
        _PUBLISH("OMRecord demo _showNewHighscoresStats", null);
        //
        $$._showNewHighscoresStats.call(this, newHighscoresStats);
    }; // $._showNewHighscoresStats

    /**
     * Idempotent
     * @author DoubleX
     * @param {Boolean} isPlayingDemo - Whether the demo's already playing
     * @since v1.0
     * @version v1.0
     */
    $$$._setIsPlayingDemo = function(isPlayingDemo) {
        this._isPlayingDemo = isPlayingDemo;
    }; // $$$._setIsPlayingDemo

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the demo playing features in OVDrawnSkin
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.VIEW.OVDrawnSkin.prototype;
    var _PLUGIN = namespace.PLUGINS.DEMO;
    var _SUBSCRIBE = _PLUGIN.Subscription.subscribe;
    var _OV_DRAWN_SKIN = _PLUGIN.OVDrawnSkin = { orig: {}, new: {} };
    var $$ = _OV_DRAWN_SKIN.orig, $$$ = _OV_DRAWN_SKIN.new;

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} subscribe - Subscribes to a component
     * @since v1.0
     * @version v1.0
     */
    $$._subscribe = $._subscribe;
    $._subscribe = function(subscribe) {
        $$._subscribe.call(this, subscribe);
        // Added to change the skin to be the one in the demo to be played
        _SUBSCRIBE("OMDemo demo _onLoadDemoSuc", $$$._onLoadDemo.bind(this));
        //
    }; // $._subscribe

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} contents - The contents of the demo to be loaded
     * @since v1.0
     * @version v1.0
     */
    $$$._onLoadDemo = function(contents) {
        this.changeSkin(contents.stats.skin);
    }; // $$$._onLoadDemo

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Corrects the size of the cursor for showing the recorded path in OVLayout
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.VIEW.OVLayout.prototype;
    var _PLUGIN = namespace.PLUGINS.DEMO;
    var _PUBLISH = _PLUGIN.Subscription.publish;
    var _OV_LAYOUT = _PLUGIN.OVLayout = { orig: {}, new: {} };
    var $$ = _OV_LAYOUT.orig, $$$ = _OV_LAYOUT.new;

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Number} w - The number of cols constituting the grids
     * @param {Number} h - The number of rows constituting the grids
     * @since v1.0
     * @version v1.0
     */
    $$._setGridWH = $._setGridWH;
    $._setGridWH = function(w, h) {
        $$._setGridWH.call(this, w, h);
        _PUBLISH("OVLayout demo $._setGridWH", this._gridSize);
    }; // $._setGridWH

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the demo timing recording features in OVTimer
 * Idempotent
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var $ = namespace.OBJ.VIEW.OVTimer.prototype;
    var _PLUGIN = namespace.PLUGINS.DEMO, _SUBSCRIPTION = _PLUGIN.Subscription;
    var _SUBSCRIBE = _SUBSCRIPTION.subscribe, _PUBLISH = _SUBSCRIPTION.publish;
    var _OV_TIMER = _PLUGIN.OVTimer = { orig: {}, new: {} };
    var $$ = _OV_TIMER.orig, $$$ = _OV_TIMER.new;
    $$$._UPDATE_MS_INTERVAL = $._UPDATE_MS_INTERVAL;

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._initCaches = $._initCaches;
    $._initCaches = function() {
        $$._initCaches.call(this);
        $$$._initCaches.call(this);
    }; // $._initCaches

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} subscribe - Subscribes to a component
     * @since v1.0
     * @version v1.0
     */
    $$._subscribe = $._subscribe;
    $._subscribe = function(subscribe) {
        $$._subscribe.call(this, subscribe);
        // Added to subscribe for events needing to be paired with the timing
        $$$._subscribe.call(this);
        //
    }; // $._subscribe

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._updateElapsedTime = $._updateElapsedTime;
    $._updateElapsedTime = function() {
        // Added to cap the elapsed time by the recorded time
        $$$._updateElapsedTime.call(this);
        $$._updateElapsedTime.call(this);
        // Added to notify the change of the elapsed time
        _PUBLISH("OVTimer demo _updateElapsedTime", this._elapsedMs);
        //
    }; // $._updateElapsedTime

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._initCaches = function() {
        // Otherwise the elasped ms would be capped when not playing demo
        this._recordedMs = this._recordedMs || this._ELAPSED_SECS_CAP * 1000;
        //
        // Otherwise pausing without first changing speed would get NaN on play
        this._updateMSIntervalMultiplier = 1;
        //
    }; // $$$._initCaches

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._subscribe = function() {
        _SUBSCRIBE("OCClicks demo _onmousedown", 
                $$$._publishOCClicksOnmousedownEvent.bind(this));
        _SUBSCRIBE("OCClicks demo _onmouseup", 
                $$$._publishOCClicksOnmouseupEvent.bind(this));
        _SUBSCRIBE("OMGrid demo _onmousedown", 
                $$$._publishOMGridOnmousedownEvent.bind(this));
        _SUBSCRIBE("OMGrid demo _onmouseenter", 
                $$$._publishOMGridOnmouseenterEvent.bind(this));
        _SUBSCRIBE("OMGrid demo _onmouseleave", 
                $$$._publishOMGridOnmouseleaveEvent.bind(this));
        _SUBSCRIBE("OMGrid demo _onmouseup", 
                $$$._publishOMGridOnmouseupEvent.bind(this));
        _SUBSCRIBE("FCDemo demo changeSpeed", $$$._changeSpeed.bind(this));
        _SUBSCRIBE("FCDemo demo pause", $$$._pause.bind(this));
        _SUBSCRIBE("FCDemo demo play", $$$._play.bind(this));
        _SUBSCRIBE("FCDemo demo _onSlideDemoPlayerProgressBar", 
                $$$._setTimeProgress.bind(this));
        _SUBSCRIBE("OMDemo demo _onLoadDemoSuc", 
                $$$._storeRecordedMs.bind(this));
    }; // $$$._subscribe

    /**
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $$$._publishOCClicksOnmousedownEvent = function(event) {
        _PUBLISH("OVTimer demo _publishOCClicksOnmousedownEvent", 
                [this._elapsedMs, event]);
    }; // $$$._publishOCClicksOnmousedownEvent

    /**
     * @author DoubleX
     * @param {Event} event - The raw input event
     * @since v1.0
     * @version v1.0
     */
    $$$._publishOCClicksOnmouseupEvent = function(event) {
        _PUBLISH("OVTimer demo _publishOCClicksOnmouseupEvent", 
                [this._elapsedMs, event]);
    }; // $$$._publishOCClicksOnmouseupEvent

    /**
     * @author DoubleX
     * @param {Array[Event, Array]} eventArgs - The event with its arguments
     * @since v1.0
     * @version v1.0
     */
    $$$._publishOMGridOnmousedownEvent = function(eventArgs) {
        _PUBLISH("OVTimer demo _publishOMGridOnmousedownEvent", 
                [this._elapsedMs, eventArgs]);
    }; // $$$._publishOMGridOnmousedownEvent

    /**
     * @author DoubleX
     * @param {Array[Event, Array]} eventArgs - The event with its arguments
     * @since v1.0
     * @version v1.0
     */
    $$$._publishOMGridOnmouseenterEvent = function(eventArgs) {
        _PUBLISH("OVTimer demo _publishOMGridOnmouseenterEvent", 
                [this._elapsedMs, eventArgs]);
    }; // $$$._publishOMGridOnmouseenterEvent

    /**
     * @author DoubleX
     * @param {Array[Event, Array]} eventArgs - The event with its arguments
     * @since v1.0
     * @version v1.0
     */
    $$$._publishOMGridOnmouseleaveEvent = function(eventArgs) {
        _PUBLISH("OVTimer demo _publishOMGridOnmouseleaveEvent", 
                [this._elapsedMs, eventArgs]);
    }; // $$$._publishOMGridOnmouseleaveEvent

    /**
     * @author DoubleX
     * @param {Array[Event, Array]} eventArgs - The event with its arguments
     * @since v1.0
     * @version v1.0
     */
    $$$._publishOMGridOnmouseupEvent = function(eventArgs) {
        _PUBLISH("OVTimer demo _publishOMGridOnmouseupEvent", 
                [this._elapsedMs, eventArgs]);
    }; // $$$._publishOMGridOnmouseupEvent

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._pause = function() { this._UPDATE_MS_INTERVAL = 0; };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._play = function() {
        $$$._changeSpeed.call(this, this._updateMSIntervalMultiplier);
    }; // $$$._play

    /**
     * Idempotent
     * @author DoubleX
     * @param {Number} multiplier - The demo playing speed multiplier
     * @since v1.0
     * @version v1.0
     */
    $$$._changeSpeed = function(multiplier) {
        this._updateMSIntervalMultiplier = multiplier;
        this._UPDATE_MS_INTERVAL = $$$._UPDATE_MS_INTERVAL * multiplier;
    }; // $$$._changeSpeed

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} timeProgress - The ratio between elapsed and max time
     * @since v1.0
     * @version v1.0
     */
    $$$._setTimeProgress = function(timeProgress) {
        this._elapsedMs = $$$._timeProgress.call(this, timeProgress);
        _PUBLISH("OVTimer demo _updateElapsedTime", this._elapsedMs);
        //
    }; // $$$._setTimeProgress

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} timeProgress - The ratio between elapsed and max time
     * @since v1.0
     * @version v1.0
     */
    $$$._timeProgress = function(timeProgress) {
        // Otherwise some future events/path points might be skipped
        return Math.ceil(timeProgress * this._recordedMs);
        //
    }; // $$$._timeProgress

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} contents - The contents of the demo to be loaded
     * @since v1.0
     * @version v1.0
     */
    $$$._storeRecordedMs = function(contents) {
        // Otherwise fast forward might lead to going beyond the recorded time
        this._recordedMs = contents.stats.timerSecs * 1000;
        //
    }; // $$$._storeRecordedMs

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._updateElapsedTime = function() {
        // Otherwise fast forward might lead to going beyond the recorded time
        this._UPDATE_MS_INTERVAL = Math.min(
                this._UPDATE_MS_INTERVAL, this._recordedMs - this._elapsedMs);
        //
    }; // $$$._updateElapsedTime

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the stat gathering features in OMPath
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _PLUGINS = namespace.PLUGINS, _PATH = _PLUGINS.PATH;

    if (!_PATH) return;

    var $ = _PATH.OMPath.prototype;
    var _PLUGIN = _PLUGINS.DEMO, _SUBSCRIPTION = _PLUGIN.Subscription;
    var _SUBSCRIBE = _SUBSCRIPTION.subscribe, _PUBLISH = _SUBSCRIPTION.publish;
    var _OM_PATH = _PLUGIN.OMPath = { orig: {}, new: {} };
    var $$ = _OM_PATH.orig, $$$ = _OM_PATH.new;

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._subscribe = $._subscribe;
    $._subscribe = function() {
        $$._subscribe.call(this);
        // Added to record the path contents as parts of those of the demo
        $$$._subscribe.call(this);
        //
    }; // $._subscribe

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._subscribe = function() {
        _SUBSCRIBE("OCGrids demo _onPreRecordStat", 
                $$$._onRecordPath.bind(this));
        _SUBSCRIBE("OMDemo demo _execPath", $$$._onUpdatePath.bind(this));
    }; // $$$._subscribe

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._onRecordPath = function() {
        _PUBLISH("OMPath demo _onRecordPath", [this._pathTimes, this._pathPts]);
    }; // $$$._onRecordPath

    /**
     * @author DoubleX
     * @param {Object[String, Number]} pathXY - The board path x/y components
     * @since v1.0
     * @version v1.0
     */
    $$$._onUpdatePath = function(pathXY) {
        // This ordering must be preserved as the latter needs the former state
        this._storeTimePts(pathXY.x, pathXY.y);
        this._updatePath();
        //
    }; // $$$._onUpdatePath

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Always shows all stats when playing demo in OVStat
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.0
 */
(function(namespace) {

    "use strict";

    var _PLUGINS = namespace.PLUGINS, _STAT = _PLUGINS.STAT;

    if (!_STAT) return;

    var $ = _STAT.OVStat.prototype;
    var _PLUGIN = _PLUGINS.DEMO, _SUBSCRIBE = _PLUGIN.Subscription.subscribe;
    var _OV_STAT = _PLUGIN.OVStat = { orig: {}, new: {} };
    var $$ = _OV_STAT.orig, $$$ = _OV_STAT.new;

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$._subscribe = $._subscribe;
    $._subscribe = function() {
        $$._subscribe.call(this);
        // Added to always show all stats when playing demo
        $$$._subscribe.call(this);
        //
    }; // $._subscribe

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $$$._subscribe = function() {
        _SUBSCRIBE("OMDemo demo _onLoadDemoSuc", 
                this._makeUPKStatVisible.bind(this));
    }; // $$$._subscribe

})(DoubleX.PROJ.MINESWEEPER);

/**
 * Implements the demo recording feature by making a new class
 * Hotspot
 * @author DoubleX
 * @param {Object} namespace - The namespace of the whole codebase
 * @since v1.0
 * @version v1.1
 */
(function(namespace) {

    "use strict";

    var _PLUGINS = namespace.PLUGINS, _PLUGIN = _PLUGINS.DEMO;
    var _SUBSCRIPTION = _PLUGIN.Subscription;
    var _SUBSCRIBE = _SUBSCRIPTION.subscribe, _PUBLISH = _SUBSCRIPTION.publish;
    _PLUGIN.OMDemo = function() { this.initialize.apply(this, arguments); };
    var OMDemo = _PLUGIN.OMDemo, $ = OMDemo.prototype;
    $.constructor = OMDemo;
    $._PUBLISH_KEY_OC_CLICKS = "OMDemo demo _oCClicksEvent";
    $._PUBLISH_KEY_OM_GRID = "OMDemo demo _omGridEvent";

    /**
     * Idempotent
     * @author DoubleX
     * @constructor
     * @param {Function} subscribe - Subscribes to a component
     * @param {Function} publish - Publishes contents to subscribers
     * @param {Object[String, Function]} fmProfile - The FMProfile API mapping
     * @since v1.0
     * @version v1.0
     */
    $.initialize = function(subscribe, publish, fmProfile) {
        this._initReadOnlys(publish, fmProfile);
        this._initCaches();
        this._subscribe(subscribe);
    }; // $.initialize

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} publish - Publishes contents to subscribers
     * @param {Object[String, Function]} fmProfile - The FMProfile API mapping
     * @since v1.0
     * @version v1.0
     */
    $._initReadOnlys = function(publish, fmProfile) {
        this._PUBLISH = publish, this._FM_PROFILE = fmProfile;
    }; // $._initReadOnlys

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._initCaches = function() {
        this._setupCaches(this._emptyContents(), false);
    }; // $._initCaches

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Object} contents - The contents of the demo to be loaded
     * @param {Boolean} isPlayingDemo - Whether the demo's already playing
     * @since v1.0
     * @version v1.0
     */
    $._setupCaches = function(contents, isPlayingDemo) {
        this._resetLastElapsedMs();
        this._setContents(contents);
        this._setIsPlayingDemo(isPlayingDemo);
    }; // $._setupCaches

    /**
     * Pure function
     * @author DoubleX
     * @returns {Object} The requested demo contents
     * @since v1.0
     * @version v1.0
     */
    $._emptyContents = function() {
        return {
            events: [],
            hasHighscores: false,
            newMinePosList: [],
            pathPts: [],
            pathTimes: [],
            profileName: "",
            profileRegion: "",
            stats: {}
        };
    }; // $._emptyContents

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._resetLastElapsedMs = function() {
        // Not setting it as negative would cause the demo to cease to play
        this._lastEventElapsedMs = this._lastPathElapsedMs = -10;
        //
    }; // $._resetLastElapsedMs

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Object} contents - The contents of the demo to be loaded
     * @since v1.0
     * @version v1.0
     */
    $._setContents = function(contents) {
        // These codes are easy, simple and small enough to be kept all together
        this._contents = contents;
        _PUBLISH("OMDemo demo _setContents", contents.newMinePosList);
        //
    }; // $._setContents

    /**
     * Potential Hotspot/Idempotent
     * @author DoubleX
     * @param {Boolean} isPlayingDemo - Whether the demo's already playing
     * @since v1.0
     * @version v1.0
     */
    $._setIsPlayingDemo = function(isPlayingDemo) {
        // These codes are easy, simple and small enough to be kept all together
        this._isPlayingDemo = isPlayingDemo;
        _PUBLISH("OMDemo demo _setIsPlayingDemo", this._isPlayingDemo);
        //
    }; // $._setIsPlayingDemo

    /**
     * Idempotent
     * @author DoubleX
     * @param {Function} subscribe - Subscribes to a component
     * @since v1.0
     * @version v1.0
     */
    $._subscribe = function(subscribe) {
        subscribe("OCGrids _recordStat", this._onRecordStat.bind(this));
        subscribe("OCGrids _onPostRecordStat", this.onSaveDemo.bind(this));
        subscribe("OVDrawnSkin _onRecordStat", 
                this._onRecordStat.bind(this));
        subscribe("OVTimer _onRecordStat", this._onRecordStat.bind(this));
        _SUBSCRIBE("FCMenu demo _onLoadDemo", this.onLoadDemo.bind(this));
        _SUBSCRIBE("FCMenu demo _onSaveDemo", this.onManualSaveDemo.bind(this));
        _SUBSCRIBE("FMNewMines demo _newMinePosList", 
                this._onRecordNewMinePosList.bind(this));
        _SUBSCRIBE("OCGrids demo onResize", this._onClearContents.bind(this));
        _SUBSCRIBE("OCTopBar demo _onReset", this._onClearContents.bind(this));
        _SUBSCRIBE("OMRecord demo _showNewHighscoresStats", 
                this._onRecordHasHighscores.bind(this));
        _SUBSCRIBE("OVTimer demo _publishOCClicksOnmousedownEvent", 
                this._onRecordOCClicksOnmousedownEvent.bind(this));
        _SUBSCRIBE("OVTimer demo _publishOCClicksOnmouseupEvent", 
                this._onRecordOCClicksOnmouseupEvent.bind(this));
        _SUBSCRIBE("OVTimer demo _publishOMGridOnmousedownEvent", 
                this._onRecordOMGridOnmousedownEvent.bind(this));
        _SUBSCRIBE("OVTimer demo _publishOMGridOnmouseenterEvent", 
                this._onRecordOMGridOnmouseenterEvent.bind(this));
        _SUBSCRIBE("OVTimer demo _publishOMGridOnmouseleaveEvent", 
                this._onRecordOMGridOnmouseleaveEvent.bind(this));
        _SUBSCRIBE("OVTimer demo _publishOMGridOnmouseupEvent", 
                this._onRecordOMGridOnmouseupEvent.bind(this));
        _SUBSCRIBE("OVTimer demo _updateElapsedTime", 
                this._onUpdateElapsedTime.bind(this));
        _SUBSCRIBE("OMPath demo _onRecordPath", this._onRecordPath.bind(this));
    }; // $._subscribe

    /**
     * Nullipotent
     * @author DoubleX
     * @interface
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $.isPlayingDemo = function() { return this._isPlayingDemo; };

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onManualSaveDemo = function() {
        // Otherwise demo saved before the board's won would miss tons of stats
        this._PUBLISH("OCGrids _onPreRecordStat", null);
        _PUBLISH("OCGrids demo _onPreRecordStat", null);
        //
        this.onSaveDemo();
    }; // $.onManualSaveDemo

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $.onSaveDemo = function() { if (!this.isPlayingDemo()) this._saveDemo(); };

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @param {File} file - The file as the demo to be imported
     * @since v1.0
     * @version v1.0
     */
    $.onLoadDemo = function(file) {
        if (this.isPlayingDemo()) return;
        this._loadDemo(file, this._onLoadDemoSuc.bind(this));
    }; // $.onLoadDemo

    /**
     * Idempotent
     * @author DoubleX
     * @interface
     * @since v1.0
     * @version v1.0
     */
    $._saveDemo = function() { this._FM_PROFILE.saveDemo(this._contents); };

    /**
     * Idempotent
     * @author DoubleX
     * @param {File} file - The file as the demo to be imported
     * @param {Function(String)} callback - Called with the demo upon success
     * @since v1.0
     * @version v1.0
     */
    $._loadDemo = function(file, callback) {
        // Otherwise it'd be extremely hard to reload the demo automatically
        this._file = file;
        //
        this._FM_PROFILE.loadDemo(
                this._file, callback, this._onLoadDemoFail.bind(this));
    }; // $._loadDemo

    /**
     * Potential Hotspot
     * @author DoubleX
     * @param {String} contents - The contents of the demo to be loaded
     * @since v1.0
     * @version v1.0
     */
    $._onLoadDemoSuc = function(contents) {
        var demoContents = JSON.parse(contents);
        this._setupCaches(demoContents, true);
        _PUBLISH("FMProfile _onSwitchSuc", demoContents);
        _PUBLISH("OMDemo demo _onLoadDemoSuc", demoContents);
        // Not calling this right after setting up the board would not start
        this._onUpdateElapsedTime(0);
        //
    }; // $._onLoadDemoSuc

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} msg - The message to be shown upon operation failure
     * @since v1.0
     * @version v1.0
     */
    $._onLoadDemoFail = function(msg) {
        // These view codes are easy, simple and small enough to be in model
        alert(msg);
        console.warn(msg);
        //
    }; // $._onLoadDemoFail

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array(2)} keyVal - The array containing the key-value pair
     * @since v1.0
     * @version v1.0
     */
    $._onRecordStat = function(keyVal) {
        if (!this.isPlayingDemo()) this._recordStat(keyVal);
    }; // $._onRecordStat

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array(2)} keyVal - The array containing the key-value pair
     * @since v1.0
     * @version v1.0
     */
    $._recordStat = function(keyVal) { this._stats()[keyVal[0]] = keyVal[1]; };

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array[Number]} newMinePosList - The board mine layout
     * @since v1.0
     * @version v1.0
     */
    $._onRecordNewMinePosList = function(newMinePosList) {
        if (!this.isPlayingDemo()) this._recordNewMinePosList(newMinePosList);
    }; // $._onRecordNewMinePosList

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array[Number]} newMinePosList - The board mine layout
     * @since v1.0
     * @version v1.0
     */
    $._recordNewMinePosList = function(newMinePosList) {
        // Making a shallow copy's enough to preserve the board mine layout
        this._contents.newMinePosList = newMinePosList.slice(0);
        //
    }; // $._recordNewMinePosList

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onClearContents = function() {
        if (!this.isPlayingDemo()) this._clearContents();
    }; // $._onClearContents

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._clearContents = function() { this._setContents(this._emptyContents()); };

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onRecordHasHighscores = function() {
        if (!this.isPlayingDemo()) this._recordHasHighscores();
    }; // $._onRecordHasHighscores

    /**
     * Idempotent
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._recordHasHighscores = function() { this._contents.hasHighscores = true; };

    /**
     * @author DoubleX
     * @param {Array[Number, Event]} timeEvent - The time-event pair
     * @since v1.0
     * @version v1.0
     */
    $._onRecordOCClicksOnmousedownEvent = function(timeEvent) {
        if (this.isPlayingDemo()) return;
        this._recordOCClicksEvent("_onmousedown", timeEvent);
    }; // $._onRecordOCClicksOnmousedownEvent

    /**
     * @author DoubleX
     * @param {Array[Number, Event]} timeEvent - The time-event pair
     * @since v1.0
     * @version v1.0
     */
    $._onRecordOCClicksOnmouseupEvent = function(timeEvent) {
        if (this.isPlayingDemo()) return;
        this._recordOCClicksEvent("_onmouseup", timeEvent);
    }; // $._onRecordOCClicksOnmouseupEvent

    /**
     * @author DoubleX
     * @param {String} event - The event name
     * @param {Array[Number, Event]} timeEvent - The time-event pair
     * @since v1.0
     * @version v1.0
     */
    $._recordOCClicksEvent = function(event, timeEvent) {
        this._events().push(this._ocClicksEvent(event, timeEvent));
    }; // $._recordOCClicksEvent

    /**
     * Nullipotent
     * @author DoubleX
     * @param {String} event - The event name
     * @param {Array[Number, Event]} timeEvent - The time-event pair
     * @returns {[Array[Number, Array[String, Object]]]} The requested event
     * @since v1.0
     * @version v1.0
     */
    $._ocClicksEvent = function(event, timeEvent) {
        return [timeEvent[0], this._PUBLISH_KEY_OC_CLICKS, 
                [event, this._recordedEvent(timeEvent[1])]];
    }; // $._ocClicksEvent

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array[Number, Array[Event, Array]]} timeEventArgs - The time
     *                                                              event args
     *                                                              pair pair
     * @since v1.0
     * @version v1.0
     */
    $._onRecordOMGridOnmousedownEvent = function(timeEventArgs) {
        if (this.isPlayingDemo()) return;
        this._recordOMGridEvent("_onmousedown", timeEventArgs);
    }; // $._onRecordOMGridOnmousedownEvent

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array[Number, Array[Event, Array]]} timeEventArgs - The time
     *                                                              event args
     *                                                              pair pair
     * @since v1.0
     * @version v1.0
     */
    $._onRecordOMGridOnmouseenterEvent = function(timeEventArgs) {
        if (this.isPlayingDemo()) return;
        this._recordOMGridEvent("_onmouseenter", timeEventArgs);
    }; // $._onRecordOMGridOnmouseenterEvent

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array[Number, Array[Event, Array]]} timeEventArgs - The time
     *                                                              event args
     *                                                              pair pair
     * @since v1.0
     * @version v1.0
     */
    $._onRecordOMGridOnmouseleaveEvent = function(timeEventArgs) {
        if (this.isPlayingDemo()) return;
        this._recordOMGridEvent("_onmouseleave", timeEventArgs);
    }; // $._onRecordOMGridOnmouseleaveEvent

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array[Number, Array[Event, Array]]} timeEventArgs - The time
     *                                                              event args
     *                                                              pair pair
     * @since v1.0
     * @version v1.0
     */
    $._onRecordOMGridOnmouseupEvent = function(timeEventArgs) {
        if (this.isPlayingDemo()) return;
        this._recordOMGridEvent("_onmouseup", timeEventArgs);
    }; // $._onRecordOMGridOnmouseupEvent

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} event - The event name
     * @param {Array[Number, Array[Event, Array]]} timeEventArgs - The time
     *                                                              event args
     *                                                              pair pair
     * @since v1.0
     * @version v1.0
     */
    $._recordOMGridEvent = function(event, timeEventArgs) {
        this._events().push(this._omGridEvent(event, timeEventArgs));
    }; // $._recordOMGridEvent

    /**
     * Pure function
     * @author DoubleX
     * @param {String} event - The event name
     * @param {Array[Number, Array[Event, Array]]} timeEventArgs - The time
     *                                                              event args
     *                                                              pair pair
     * @returns {Array[Number, Object]} The requested event info
     * @since v1.0
     * @version v1.0
     */
    $._omGridEvent = function(event, timeEventArgs) {
        var eventArgs = timeEventArgs[1];
        return [timeEventArgs[0], this._PUBLISH_KEY_OM_GRID, {
            eventName: event,
            event: this._recordedEvent(eventArgs[0]),
            args: eventArgs[1]
        }];
    }; // $._omGridEvent

    /**
     * Pure function
     * @author DoubleX
     * @param {Event} event - The event to be recorded
     * @returns {Object[String, Number]} The requested event to be recorded
     * @since v1.0
     * @version v1.0
     */
    $._recordedEvent = function(event) {
        // Returns a new object having everything of interest to be stringified
        return { which: event.which  };
        //
    }; // $._recordedEvent

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array[Array](2)} pathTimesPts - The list of path pts with time
     * @since v1.0
     * @version v1.0
     */
    $._onRecordPath = function(pathTimesPts) {
        if (!this.isPlayingDemo()) this._recordPath(pathTimesPts);
    }; // $._onRecordPath

    /**
     * Idempotent
     * @author DoubleX
     * @param {Array[Array](2)} pathTimesPts - The list of path pts with time
     * @since v1.0
     * @version v1.0
     */
    $._recordPath = function(pathTimesPts) {
        this._contents.pathPts = pathTimesPts[1];
        this._contents.pathTimes = pathTimesPts[0];
    }; // $._recordPath

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @since v1.0
     * @version v1.0
     */
    $._onUpdateElapsedTime = function(elapsedMs) {
        if (this.isPlayingDemo()) this._updateElapsedTime(elapsedMs);
    }; // $._onUpdateElapsedTime

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @since v1.0
     * @version v1.0
     */
    $._updateElapsedTime = function(elapsedMs) {
        if (this._isPastTime(elapsedMs)) {
            this._updatePastElapsedTime(elapsedMs);
        } else if (this._isFutureTime(elapsedMs)) {
            this._updateFutureElapsedTime(elapsedMs);
        }
        if (this._isDemoEnd(elapsedMs)) this._onDemoEnd();
    }; // $._updateElapsedTime

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isPastTime = function(elapsedMs) {
        return elapsedMs < this._lastEventElapsedMs || 
                elapsedMs < this._lastPathElapsedMs;
    }; // $._isPastTime

    /**
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @since v1.0
     * @version v1.1
     */
    $._updatePastElapsedTime = function(elapsedMs) {
        // Not reloading the whole demo would have to clean way too much mess
        this._loadDemo(this._file, this._onReloadDemoSuc.bind(this, elapsedMs));
        //
    }; // $._updatePastElapsedTime

    /**
     * Potential Hotspot
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @param {String} contents - The contents of the demo to be loaded
     * @since v1.0
     * @version v1.0
     */
    $._onReloadDemoSuc = function(elapsedMs, contents) {
        this._onLoadDemoSuc(contents);
        _PUBLISH("FCDemo demo _onSlideDemoPlayerProgressBar", 
                this._timeProgress(elapsedMs));
    }; // $._onReloadDemoSuc

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isFutureTime = function(elapsedMs) {
        return elapsedMs > this._lastEventElapsedMs || 
                elapsedMs > this._lastPathElapsedMs;
    }; // $._isFutureTime

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @since v1.0
     * @version v1.0
     */
    $._updateFutureElapsedTime = function(elapsedMs) {
        this._execEvents(elapsedMs);
        this._execPaths(elapsedMs);
        this._updateTimeProgress(elapsedMs);
    }; // $._updateFutureElapsedTime

    /**
     * These codes are optimized due to it being very resource demanding
     * Hotspot
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @since v1.0
     * @todo: Improve the code quality without losing performance significantly
     * @version v1.0
     */
    $._execEvents = function(elapsedMs) {
        // Makes use of the fact that events are ascendingly sorted by time
        var events = this._events(), pastIndex;
        for (var index = 0, length = events.length; index < length; index++) {
            var event = events[index], time = event[0];
            if (this._isPastEvent(this._lastEventElapsedMs, time)) {
                pastIndex = index;
                continue;
            }
            if (this._isFutureEvent(elapsedMs, time)) break;
            this._execEvent(event);
        }
        this._lastEventElapsedMs = elapsedMs;
        if (pastIndex) events.splice(0, pastIndex + 1);
        //
    }; // $._execEvents

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Object[String, Array]} The requested event list container
     * @since v1.0
     * @version v1.0
     */
    $._events = function() { return this._contents.events; };

    /**
     * Hotspot
     * @author DoubleX
     * @param {Array[2]} timeEvent - The timing-event pair
     * @since v1.0
     * @version v1.0
     */
    $._execEvent = function(timeEvent) { _PUBLISH(timeEvent[1], timeEvent[2]); };

    /**
     * These codes are optimized due to it being very resource demanding
     * Hotspot
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @since v1.0
     * @todo: Improve the code quality without losing performance significantly
     * @version v1.0
     */
    $._execPaths = function(elapsedMs) {
        // Makes use of the fact that path points are ascendingly sorted by time
        var pathTimes = this._contents.pathTimes, length = pathTimes.length;
        var pathPts = this._contents.pathPts, pastIndex;
        for (var index = 0; index < length; index++) {
            var pathTime = pathTimes[index];
            if (this._isPastEvent(this._lastPathElapsedMs, pathTime)) {
                pastIndex = index;
                continue;
            }
            if (this._isFutureEvent(elapsedMs, pathTime)) break;
            this._execPath(pathPts[index]);
        }
        this._lastPathElapsedMs = elapsedMs;
        if (!pastIndex) return;
        pathTimes.splice(0, pastIndex + 1);
        pathPts.splice(0, pastIndex + 1);
        //
    }; // $._execPaths

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @param {Number} time - The timing of the event to be checked
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isPastEvent = function(elapsedMs, time) {
        // The original base unit of time is 10ms
        return this._formattedElapsedMs(elapsedMs) >= time;
        //
    }; // $._isPastEvent

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @param {Number} time - The timing of the event to be checked
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isFutureEvent = function(elapsedMs, time) {
        // The original base unit of time is 10ms
        return this._formattedElapsedMs(elapsedMs) < time;
        //
    }; // $._isFutureEvent

    /**
     * Hotspot/Pure function
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @returns {Number} The requested formatted ms
     * @since v1.0
     * @version v1.0
     */
    $._formattedElapsedMs = function(elapsedMs) {
        // The original base unit of time is 10ms
        return elapsedMs - elapsedMs % 10;
        //
    }; // $._formattedElapsedMs

    /**
     * Hotspot
     * @author DoubleX
     * @param {Object[String, Number]} pathXY - The board path x/y components
     * @since v1.0
     * @version v1.0
     */
    $._execPath = function(pathXY) {
        _PUBLISH("OMDemo demo _execPath", pathXY);
    }; // $._execPath

    /**
     * Hotspot
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @since v1.0
     * @version v1.0
     */
    $._updateTimeProgress = function(elapsedMs) {
        _PUBLISH("OMDemo demo _updateTimeProgress", 
                this._timeProgress(elapsedMs));
    }; // $._updateTimeProgress

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @returns {Number} The requested progress
     * @since v1.0
     * @version v1.0
     */
    $._timeProgress = function(elapsedMs) {
        return elapsedMs / this._recordedMs();
    }; // $._timeProgress

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Object} The requested stat mapping
     * @since v1.0
     * @version v1.0
     */
    $._stats = function() { return this._contents.stats; };

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @returns {Boolean} The check result
     * @since v1.0
     * @version v1.0
     */
    $._isDemoEnd = function(elapsedMs) {
        return elapsedMs >= this._recordedMs();
    }; // $._isDemoEnd

    /**
     * Hotspot/Nullipotent
     * @author DoubleX
     * @returns {Number} The requested recorded time in ms
     * @since v1.0
     * @version v1.0
     */
    $._recordedMs = function() { return this._stats().timerSecs * 1000; };

    /**
     * @author DoubleX
     * @since v1.0
     * @version v1.0
     */
    $._onDemoEnd = function() {
        // Lets unit tests/other plugins to hook this timing
        //
    }; // $._onDemoEnd

})(DoubleX.PROJ.MINESWEEPER);