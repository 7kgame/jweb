"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Type(type, autoTrans) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Type;
function validate(type, autoTrans) {
    return (val) => {
        switch (type) {
            case 'integer':
                if (autoTrans) {
                    val = Number.parseInt(val, 10);
                }
                let isInt = Number.isInteger(val);
                return { valid: isInt, val: val };
            case 'number':
                if (autoTrans) {
                    val = Number(val);
                }
                let isNum = typeof val === 'number';
                return { valid: isNum, val: val };
            case 'string':
                if (autoTrans) {
                    val = String(val);
                }
                let isStr = typeof val === 'string';
                return { valid: isStr, val: val };
        }
    };
}
function message(field, type, autoTrans, mes) {
    if (mes) {
        return () => mes;
    }
    else if (autoTrans && typeof autoTrans === 'string') {
        return () => autoTrans;
    }
    else {
        return (val) => {
            return `${field}: can't assign type ${typeof val} to ${type}`;
        };
    }
}
Type['validate'] = {};
const callback = function (annoType, ctor, field, type, autoTrans, mes) {
    // console.log("Required at line 8", arguments)
    // add descriptor info into BeanFactory, using it in Validation
    Type['validate'][field] = {
        validate: validate(type, autoTrans),
        message: message(field, type, autoTrans, mes)
    };
    jbean_1.BeanFactory.addBeanMeta(annoType, ctor, field, Type);
};
