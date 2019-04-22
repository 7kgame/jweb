"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Validation(entity, mode) {
    return jbean_1.annotationHelper([entity, mode], callback);
}
exports.default = Validation;
const callback = function (annoType, target, method, descriptor, entityClz, mode) {
    jbean_1.BeanFactory.addBeanMeta(jbean_1.AnnotationType.method, target, method, Validation, [entityClz, mode]);
};
Validation.preCall = function (entityClz, mode, req, res) {
    const params = Object.assign({}, req.params, req.query);
    if (!params || Object.keys(params).length < 1) {
        return;
    }
    const entity = new entityClz();
    const fields = Object.getOwnPropertyNames(entity);
    if (fields && fields.length > 0) {
        fields.forEach(field => {
            if (typeof params[field] !== 'undefined') {
                entity[field] = params[field];
            }
        });
        req.entity = entity;
    }
    // TODO validate
};
