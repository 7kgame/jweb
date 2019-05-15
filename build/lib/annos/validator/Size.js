"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Size(min, max, mes) {
    return jbean_1.annotationHelper([min, max, mes], callback);
}
exports.default = Size;
function validate(min, max) {
    return (val) => {
        if (val.length && val.length < min) {
            return { valid: false, val: val };
        }
        if (typeof max === 'number' && val.length && val.length > max) {
            return { valid: false, val: val };
        }
        return { valid: true, val: val };
    };
}
function message(field, min, max, mes) {
    if (mes) {
        return () => mes;
    }
    else if (max && typeof max === 'string') {
        return () => max;
    }
    else {
        return () => {
            if (max) {
                return `the length of '${field}' must between ${min} and ${max}`;
            }
            else {
                return `the length of '${field}' must larger than ${min}"`;
            }
        };
    }
}
Size['validate'] = {};
const callback = function (annoType, ctor, field, min, max, mes) {
    // add descriptor info into BeanFactory, using it in Validation
    Size['validate'][field] = {
        validate: validate(min, max),
        message: message(field, min, max, mes)
    };
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Size);
};
