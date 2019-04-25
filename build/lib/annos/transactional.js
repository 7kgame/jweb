"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Transactional(component, type) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Transactional;
const callback = function (annoType, ctor) {
    if (annoType === jbean_1.AnnotationType.clz) {
        // BeanFactory.addBeanMeta(AnnotationType.clz, ctor, null, Transactional, [arguments[2]])
    }
    else if (annoType === jbean_1.AnnotationType.method) {
        // BeanFactory.addBeanMeta(AnnotationType.method, ctor, arguments[2], Transactional, [arguments[4]])
    }
};
