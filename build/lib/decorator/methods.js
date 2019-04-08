"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
const callback = function (target, method, descriptor, anno, requestMethod, path) {
    // console.log(anno)
    // console.log(requestMethod, path)
    jbean_1.BeanFactory.addAnnotation(jbean_1.AnnotationType.method, target, method, anno, [requestMethod, path]);
    // console.log("method", method, target['__ctorId'], target.constructor['__ctorId'])
    // target.constructor._id = 'a123'
    // console.log('method', prop, target.constructor._id)
    // console.log(target)
    // console.log('method1 ---- ', typeof target)
    // console.log(target.constructor)
    // console.log(path, prop, target)
    // console.log(typeof target)
    // redefineProperty(target, prop, {
    //   get: function () {
    //     return BeanFactory.getBean(name)
    //   }
    // })
};
function All(path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.method, callback, [All, '*', path]);
}
exports.All = All;
function Get(path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.method, callback, [Get, 'GET', path]);
}
exports.Get = Get;
function Post(path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.method, callback, [Post, 'POST', path]);
}
exports.Post = Post;
function Put(path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.method, callback, [Put, 'PUT', path]);
}
exports.Put = Put;
function Patch(path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.method, callback, [Patch, 'PATCH', path]);
}
exports.Patch = Patch;
function Options(path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.method, callback, [Options, 'OPTIONS', path]);
}
exports.Options = Options;
