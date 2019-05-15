"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Max(maxVal, mes) {
    return jbean_1.annotationHelper([maxVal, mes], callback);
}
exports.default = Max;
function validate(maxVal) {
    return (val) => {
        if (val <= maxVal) {
            return { valid: true, val: val };
        }
        else {
            return { valid: false, val: null };
        }
    };
}
function message(field, maxVal, mes) {
    if (mes) {
        return () => mes;
    }
    else {
        return () => `the value of ${field} must smaller than ${maxVal}`;
    }
}
Max['validate'] = {};
const callback = function (annoType, ctor, field, maxVal, mes) {
    // add descriptor info into BeanFactory, using it in Validation
    Max['validate'][field] = {
        validate: validate(maxVal),
        message: message(field, maxVal, mes)
    };
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Max);
};
