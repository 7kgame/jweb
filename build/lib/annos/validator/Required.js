"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Required(component, options) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Required;
Required.validate = function (field, val, params, fieldType) {
    let err = null;
    if (val === null || val === undefined) {
        err = getMessage(field, val, params);
    }
    return {
        err,
        val: val
    };
};
const getMessage = function (field, val, params) {
    let [message] = params;
    if (message) {
        return message;
    }
    else {
        return `key '${field}' is required`;
    }
};
const callback = function (annoType, ctor, field, message) {
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Required, [message]);
};
