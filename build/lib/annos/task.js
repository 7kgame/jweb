"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Task(target) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Task;
const callback = function (annoType, ctor) {
};
Task.checkTransactional = function (ctor, ins, method) {
    if (jbean_1.checkSupportTransition(ctor, method)) {
        jbean_1.BeanFactory.genRequestId(ins);
    }
};
