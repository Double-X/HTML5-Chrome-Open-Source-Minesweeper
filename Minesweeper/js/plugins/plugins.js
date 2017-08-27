/*
 * This file's supposed to be edited by users to activate/deactivate plugins
 * Plugin developers should provide instructions on which modules are needed
 */
(function(namespace) {

    "use strict";

    namespace.PLUGIN_LIST = {

        // The list of the declaration module from all plugins to be loaded
        declarations: [
            // Enter the declaration js file name without file extension here
            "cl",
            "corr",
            "isIs",
            "ops",
            "path",
            "threeBV",
            "stat",
            "demo"
            //
        ],
        //

        // The list of the configuration module from all plugins to be loaded
        configurations: [
            // Enter the configuration js file name without file extension here
            "isIs",
            "ops",
            "path",
            "threeBV",
            "stat"
            //
        ],
        //

        // The list of the implementation module from all plugins to be loaded
        implementations: [
            // Enter the implementation js file name without file extension here
            "cl",
            "corr",
            "isIs",
            "ops",
            "path",
            "threeBV",
            "stat",
            "demo"
            //
        ],
        //

        // The list of the unit test module from all plugins to be loaded
        unitTests: [
            // Enter the unit test js file name without file extension here
            "cl",
            "corr",
            "isIs",
            "ops",
            "path",
            "threeBV",
            "stat",
            "demo"
            //
        ],
        //

        // The list of the compatibility module from all plugins to be loaded
        compatibilities: [
            // Enter the compatibility js file name without file extension here
            //
        ]
        //

    };

})(DoubleX.PROJ.MINESWEEPER);