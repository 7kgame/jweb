"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Max(max, message) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Max;
Max.validate = function (field, val, params, fieldType) {
    let [max, message] = params;
    let err = null;
    if (val > max) {
        err = getMessage(field, val, params);
    }
    return {
        err,
        val: val
    };
};
const getMessage = function (field, val, params) {
    let [max, message] = params;
    if (message) {
        return message;
    }
    else {
        return `the value of ${field} must smaller than ${max}`;
    }
};
const callback = function (annoType, ctor, field, max, message) {
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Max, [max, message]);
};
