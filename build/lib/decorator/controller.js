"use strict";
// import Controller from '../bean/controller'
// import IMiddleware from '../base/middleware'
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
const callback = function (ctor, path) {
    jbean_1.BeanFactory.addAnnotation(jbean_1.AnnotationType.clz, ctor, null, Controller, [path]);
    console.log(ctor.name, ctor['__ctorId']);
};
function Controller(component, path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.clz, callback, arguments);
}
exports.default = Controller;
// export default function (path?: string, middlewares?: any) {
//   console.log('controller: ', path)
//   return (target): void => {
//     Controller.addBean(target, {
//       path: path,
//       middlewares: middlewares
//     })
//   }
// }
