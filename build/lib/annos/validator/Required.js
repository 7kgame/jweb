"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Required(component, options) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Required;
function validate(val) {
    if (val === null || val === undefined) {
        return { valid: false, val: val };
    }
    return { valid: true, val: val };
}
function message(field, mes) {
    if (mes) {
        return () => mes;
    }
    else {
        return () => `"key '${field}' is required"`;
    }
}
Required['validate'] = {};
const callback = function (annoType, ctor, field, mes) {
    // console.log("Required at line 8", arguments)
    // add descriptor info into BeanFactory, using it in Validation
    Required['validate'][field] = {
        validate,
        message: message(field, mes)
    };
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Required);
};
