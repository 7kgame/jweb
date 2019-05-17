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
Validation.preCall = function vldPreCall(ret, entityClz, mode, req, res) {
    if (ret && ret.err) {
        return ret;
    }
    const params = Object.assign({}, req.params, req.query, req.payload);
    const entity = new entityClz();
    const fields = Object.getOwnPropertyNames(entity);
    if (!fields) {
        return;
    }
    let beanMeta = jbean_1.BeanFactory.getBeanMeta(entity.constructor);
    let fieldAnnos = beanMeta.fieldAnnos;
    let fieldType = beanMeta.fieldType;
    let err0 = null;
    fields.forEach(field => {
        if (typeof fieldAnnos[field] === 'undefined') {
            entity[field] = params[field];
            return;
        }
        let val0 = params[field];
        let validators = fieldAnnos[field];
        let hasError = false;
        validators.forEach(([validator, validatorParams]) => {
            if (hasError || !validator.validate) {
                return;
            }
            let { err, val } = validator.validate(field, val0, validatorParams, fieldType[field]);
            if (err) {
                err0 = err0 || {};
                err0[field] = err;
                hasError = true;
            }
            else {
                entity[field] = val;
            }
        });
    });
    if (!err0) {
        req.entity = entity;
    }
    return {
        err: err0,
        data: entity
    };
};
