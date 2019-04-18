"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Auth(component, options) {
    return jbean_1.annotationHelper(arguments, callback);
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
Auth.preCall = function (param) {
    if (param === 'ignore') {
        console.log('return login data');
        return null;
    }
};
Auth.postCall = function (ret) {
    return ret;
};
