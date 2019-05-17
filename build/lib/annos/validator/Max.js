"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Max(max, message) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Max;
Max.validate = function (field, val, params, fieldType) {
    let [max, message] = params;
    return {
        err: null,
        val: val
    };
};
const getMessage = function (field, val, params) {
    let [max, message] = params;
    return message;
};
// function validate(maxVal: number) {
//   return (val):{valid: boolean, val: any} => {
//     if (val <= maxVal) {
//       return {valid: true, val: val}
//     } else {
//       return { valid: false, val: null}
//     }
//   }
// }
// function message(field: string, maxVal:number, mes?: string) {
//   if (mes) {
//     return () => mes
//   } else {
//     return () => `the value of ${field} must smaller than ${maxVal}`
//   }
// }
const callback = function (annoType, ctor, field, max, message) {
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Max, [max, message]);
};
