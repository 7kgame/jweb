"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Auth(component, options) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.clz, callback, arguments);
}
exports.default = Auth;
const callback = function (annoType, ctor) {
    if (annoType === jbean_1.AnnotationType.clz) {
        jbean_1.BeanFactory.addBeanMeta(jbean_1.AnnotationType.clz, ctor, null, Auth, [arguments[2]]);
    }
    else if (annoType === jbean_1.AnnotationType.method) {
        jbean_1.BeanFactory.addBeanMeta(jbean_1.AnnotationType.method, ctor, arguments[2], Auth, [arguments[4]]);
    }
};
Auth.preCall = function () {
    // console.log('auth.precall')
};
Auth.postCall = function (ret) {
    console.log('auth.postcall');
    return JSON.stringify(ret);
};
