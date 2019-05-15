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
    if (ret.err) {
        return ret;
    }
    const params = Object.assign({}, req.params, req.query, req.payload);
    if (!params || Object.keys(params).length < 1) {
        return;
    }
    const entity = new entityClz();
    // get BeanMeta and validate
    let beanMeta = jbean_1.BeanFactory.getBeanMeta(entity.constructor);
    let metaFields = beanMeta.fieldAnnos;
    const fields = Object.getOwnPropertyNames(entity);
    let err = null;
    if (fields && fields.length > 0) {
        fields.forEach(field => {
            let validators = metaFields[field];
            if (!validators) { // no validator, copy
                if (typeof params[field] !== 'undefined') {
                    entity[field] = params[field];
                }
                return;
            }
            let validVal = params[field];
            for (let i = 0; i < validators.length; i++) {
                let validate = validators[i][0].validate[field].validate;
                let message = validators[i][0].validate[field].message;
                if (typeof validate !== 'function') {
                    console.log('\x1B[33m%s\x1b[0m', `the typeof validate of ${validators[i][0].name} is not Function`);
                    continue;
                }
                if (typeof message !== 'function') {
                    console.log('\x1B[33m%s\x1b[0m', `the typeof message of ${validators[i][0].name} is not Function`);
                    continue;
                }
                let validation = validate(validVal);
                if (!validation.valid) {
                    let mes = message(validVal);
                    if (err === null) {
                        err = {};
                    }
                    err[field] = mes;
                    break;
                }
                validVal = validation.val;
            }
            entity[field] = validVal;
        });
        req.entity = entity;
    }
    return {
        err,
        data: entity,
    };
};
