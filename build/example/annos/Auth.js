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
Auth.preCall = function authPreCall(ret, param, req, res) {
    if (param === 'ignore') {
        return {
            err: "ignore",
            data: null
        };
    }
    console.log('Auth preCall', ret);
    return ret;
};
Auth.postCall = function authPostCall(ret) {
    console.log('Auth postCall', ret);
    return ret;
};
