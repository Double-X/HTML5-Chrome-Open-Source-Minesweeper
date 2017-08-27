(function(namespace) {

    "use strict";

    namespace.DEMO = {
        neededPlugins: {
            PATH: namespace.PATH,
            // It isn't necessary but this plugin would then be crippled
            STAT: namespace.STAT
            //
        },
        configuration: {},
        unitTest: { orig: {}, new: {} },
        compatibility: {}
    };

})(DoubleX.PROJ.MINESWEEPER.PLUGINS);