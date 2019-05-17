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
// function validate(minVal: number) {
//   return (val):{valid: boolean, val: any} => {
//     if (val >= minVal) {
//       return {valid: true, val: val}
//     } else {
//       return { valid: false, val: null}
//     }
//   }
// }
// function message(field: string, minVal:number, mes?: string) {
//   if (mes) {
//     return () => mes
//   } else {
//     return () => `the value of ${field} must larger than ${minVal}`
//   }
// }
const callback = function (annoType, ctor, field, min, message) {
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Min, [min, message]);
};
