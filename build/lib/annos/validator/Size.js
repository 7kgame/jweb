"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Size(min, max, message) {
    console.log('size');
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Size;
Size.validate = function (field, val, params, fieldType) {
    let [min, max, message] = params;
    let err = null;
    val += '';
    let len = val.length;
    if (len < min || len > max) {
        err = getMessage(field, val, params);
    }
    return {
        err: err,
        val: val
    };
};
const getMessage = function (field, val, params) {
    let [min, max, message] = params;
    // if (message) {
    //   return () => message
    // } else if (max && typeof max === 'string' ) {
    //   return () => max
    // } else {
    //   return () => {
    //     if (max) {
    //       return `the length of '${field}' must between ${min} and ${max}`
    //     } else {
    //       return `the length of '${field}' must larger than ${min}"`
    //     }
    //   }
    // }
    return message;
};
const callback = function (annoType, ctor, field, min, max, message) {
    if (typeof max === 'string') {
        message = max;
        max = Number.MAX_VALUE;
    }
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Size, [min, max, message]);
};
