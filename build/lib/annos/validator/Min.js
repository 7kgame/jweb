"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Min(min, message) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Min;
Min.validate = function (field, val, params, fieldType) {
    let [min, message] = params;
    let err = null;
    if (val < min) {
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
const callback = function (annoType, ctor, field, min, message) {
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Min, [min, message]);
};
