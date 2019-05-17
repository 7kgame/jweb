"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Required(component, options) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Required;
Required.validate = function (field, val, params, fieldType) {
    let [message] = params;
    return {
        err: null,
        val: val
    };
};
const getMessage = function (field, val, params) {
    let [message] = params;
    return message;
};
// function validate(val: any): {valid: boolean, val: any} {
//   if (val === null || val === undefined) {
//     return {valid: false, val: val}
//   }
//   return {valid: true, val: val}
// }
// function message(field: string, mes?: string) {
//   if (mes) {
//     return () => mes
//   } else {
//     return () => `"key '${field}' is required"`
//   }
// }
const callback = function (annoType, ctor, field, message) {
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Required, [message]);
};
