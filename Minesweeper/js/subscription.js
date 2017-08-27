/**
 * Lets some components subscribes some other components upon their creations
 * Idempotent
 * @author DoubleX
 * @returns {Object[String, Function]} The requested function mappings
 * @since v1.0
 * @version v1.0
 */
DoubleX.PROJ.MINESWEEPER.Subscription = function() {

    // Stores the mapping from targets to lists of callbacks
    var _subscriptions = {};
    //

    /**
     * Idempotent
     * @author DoubleX
     * @param {String} target - The name of the module to be subscribed
     * @param {Function} callback - The notifying function to be called
     * @since v1.0
     * @version v1.0
     */
    function subscribe(target, callback) {
        // These codes are easy, simple and small enough to be kept all together
        _subscriptions[target] = _subscriptions[target] || [];
        if (_subscriptions[target].indexOf(callback) >= 0) return;
        _subscriptions[target].push(callback);
        //
    }; // subscribe

    /**
     * @author DoubleX
     * @param {String} target - The name of the module to be subscribed
     * @param {Function/Nullable} contents - The contents of the subscribed one
     * @since v1.0
     * @version v1.0
     */
    function publish(target, contents) {
        var subscribers = _subscriptions[target];
        if (subscribers) subscribers.forEach(_notify(contents));
    }; // publish

    /**
     * @author DoubleX
     * @param {Function/Nullable} contents - The contents of the subscribed one
     * @since v1.0
     * @version v1.0
     */
    function _notify(contents) {
        /**
         * @author DoubleX
         * @param {Function} callback - The notifying func to be called
         * @since v1.0
         * @version v1.0
         */
        return function(callback) { callback(contents); };
    }; // _notify

    // The Subscription API lists
    return { subscribe: subscribe, publish: publish };
    //

}; // DoubleX.PROJ.MINESWEEPER.Subscription