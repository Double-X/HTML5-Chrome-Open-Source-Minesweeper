(function(namespace) {

    "use strict";

    namespace.STAT = {
        neededPlugins: {
            // They're not strictly necessary but this plugin would be crippled
            CL: namespace.CL,
            CORR: namespace.CORR,
            ISIS: namespace.ISIS,
            OPS: namespace.OPS,
            PATH: namespace.PATH,
            THREE_BV: namespace.THREE_BV
            //
        },
        configuration: {},
        unitTest: { orig: {}, new: {} },
        compatibility: {}
    };

})(DoubleX.PROJ.MINESWEEPER.PLUGINS);