"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Min(minVal, mes) {
    return jbean_1.annotationHelper([minVal, mes], callback);
}
exports.default = Min;
function validate(minVal) {
    return (val) => {
        if (val >= minVal) {
            return { valid: true, val: val };
        }
        else {
            return { valid: false, val: null };
        }
    };
}
function message(field, minVal, mes) {
    if (mes) {
        return () => mes;
    }
    else {
        return () => `the value of ${field} must larger than ${minVal}`;
    }
}
Min['validate'] = {};
const callback = function (annoType, ctor, field, minVal, mes) {
    // add descriptor info into BeanFactory, using it in Validation
    Min['validate'][field] = {
        validate: validate(minVal),
        message: message(field, minVal, mes)
    };
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Min);
};
