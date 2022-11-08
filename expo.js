"use strict";

class Expo {

    /**
     * Check value is object or not
     */
    isObject(object) {
        return (
            object &&
            typeof object === "object" &&
            object.constructor === Object
        );
    };

    /**
     * Check is key is exist in object
     */
    isKeyExistsInObject(object, key) {
        if (!expo.isObject(object)) return false;
        return typeof object[key] != typeof undefined;
    };

    stripTrailingSlash(url) {
        return url.replace(/\/$/, '');
    }
}
// Create expo object
const expo = new Expo();