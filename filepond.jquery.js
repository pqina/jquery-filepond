/*
 * jQuery FilePond 1.0.0
 * Licensed under MIT, https://opensource.org/licenses/MIT
 * Please visit https://pqina.nl/filepond for details.
 */
(function ($, FilePond) {
    'use strict';

    // No jQuery No Go
    if (!$ || !FilePond) {
        return;
    }

    // Test if FilePond is supported
    if (!FilePond.supported()) {
        // add stub
        $.fn.filepond = function () { };
        return;
    }

    // Helpers
    function argsToArray(args) {
        return Array.prototype.slice.call(args);
    }

    function isFactory(args) {
        return !args.length || typeof args[0] === 'object';
    }

    function isGetter(obj, key) {
        var descriptor = Object.getOwnPropertyDescriptor(obj, key);
        return descriptor ? typeof descriptor.get !== 'undefined' : false;
    }

    function isSetter(obj, key) {
        var descriptor = Object.getOwnPropertyDescriptor(obj, key);
        return descriptor ? typeof descriptor.set !== 'undefined' : false;
    }

    function isMethod(obj, key) {
        return typeof obj[key] === 'function';
    }

    // Setup plugin
    $.fn.filepond = function () {

        // get arguments as array
        var args = argsToArray(arguments);

        // method results array
        var results = [];

        // Execute for every item in the list
        var items = this.each(function () {

            // test if is create call
            if (isFactory(args)) {
                FilePond.create(this, args[0])
                return;
            }

            // get a reference to the pond instance based on the element
            var pond = FilePond.find(this);

            // if no pond found, exit here
            if (!pond) {
                return;
            }

            // get property name or method name
            var key = args[0];

            // get params to pass
            var params = args.concat().slice(1);

            // run method
            if (isMethod(pond, key)) {
                results.push(pond[key].apply(pond, params));
                return;
            }

            // set setter
            if (isSetter(pond, key) && params.length) {
                pond[key] = params[0];
                return;
            }

            // get getter
            if (isGetter(pond, key)) {
                results.push(pond[key]);
                return;
            }

            console.warn('$().filepond("' + key + '") is an unknown property or method.');
        });

        // returns a jQuery object if no results returned
        return results.length ? this.length === 1 ? results[0] : results : items;
    };

    // Static API
    Object.keys(FilePond).forEach(function (key) {
        $.fn.filepond[key] = FilePond[key];
    });

    // Redirect setDefaults to setOptions
    $.fn.filepond.setDefaults = FilePond.setOptions;

}(jQuery, FilePond));
