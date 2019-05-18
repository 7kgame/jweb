"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Validation(entity, mode = ValidationMode.entity) {
    return jbean_1.annotationHelper([entity, mode], callback);
}
exports.default = Validation;
var ValidationMode;
(function (ValidationMode) {
    ValidationMode[ValidationMode["params"] = 0] = "params";
    ValidationMode[ValidationMode["entity"] = 1] = "entity";
    ValidationMode[ValidationMode["intersect"] = 2] = "intersect"; // validation based on the intersection of params and entity
})(ValidationMode = exports.ValidationMode || (exports.ValidationMode = {}));
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
    // return _validateByMode(entity, fields, params, fieldAnnos, fieldType, mode, req)
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
        return;
    }
    else {
        return {
            err: new jbean_1.BusinessException('', -1, err0)
        };
    }
};
function _validateByMode(entity, fields, params, fieldAnnos, fieldType, mode, req) {
    let ret;
    switch (mode) {
        case ValidationMode.entity:
            ret = _validateData(entity, fields, params, fieldAnnos, fieldType);
            break;
        case ValidationMode.params:
            ret = _validateData(entity, Object.keys(params), params, fieldAnnos, fieldType);
            break;
        case ValidationMode.intersect:
            let newFields = fields.filter((val) => {
                return params[val] !== undefined;
            });
            ret = _validateData(entity, newFields, params, fieldAnnos, fieldType);
            break;
        default:
            ret = _validateData(entity, fields, params, fieldAnnos, fieldType);
    }
    if (!ret.err0) {
        req.entity = ret.data;
    }
    return {
        err: ret.err0,
        data: ret.data
    };
}
function _validateData(entity, data, params, fieldAnnos, fieldType) {
    let err0 = null;
    data.forEach(field => {
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
}
