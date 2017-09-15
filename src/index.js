/**
 * Construtor function to make the instance of Updatable type
 * @param {object} [value] - Optional value to initiate the object with
 * @param {function} [cb] - Optional callback function to add default listener
 * @returns {Updatable} - An instance of the Updatable object type
 */
function Updatable(value, cb) {
    this.value = null;
    if (value != null) {
        this.value = value;
    }
    this.listeners = [];
    if (cb && isFunction(cb)) {
        this.listeners.push(cb);
    }
}

/**
 * Adds a listener function to be called upon update
 * @param {function} cb - Listener function to be called upon update
 */
Updatable.prototype.addListener = function (cb) {
    if (cb && isFunction(cb)) {
        this.listeners.push(cb);
    }
}

/**
 * Update the value for the instance and call all the listeners
 * @param {object} newValue - Listener function to be called upon update
 */
Updatable.prototype.update = function (newValue) {
    this.value = newValue;
    for (var i = 0; i < this.listeners.length; i++) {
        this.listeners[i](newValue);
    }
}

/**
 * Remove all previous listeners and add one listener
 * @param {function} cb - Listener function to be called upon update
 */
Updatable.prototype.setListener = function (cb) {
    if (cb === null) {
        this.listeners = [];
    } else if (cb && isFunction(cb)) {
        this.listeners = [cb];
    }
}

/**
 * Get the value for the instance
 * @returns {object} - The current value for the Updatable instance
 */
Updatable.prototype.getValue = function () {
    return this.value;
}

/**
 * Check if an object is a function
 * @param {object} fn 
 * @returns {boolean} - true if fn is a function, false if fn is not a function
 */
function isFunction(fn) {
    var getType = {};
    return fn && getType.toString.call(fn) === '[object Function]';
}

module.exports = Updatable;