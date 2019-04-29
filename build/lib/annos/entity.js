"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Entity(name) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Entity;
Entity.underline = 0;
const callback = function (annoType, ctor, name) {
    // TODO
    ctor.prototype.toObject = function () {
        const fields = Object.getOwnPropertyNames(this);
        const obj = {};
        fields.forEach(field => {
            if (this[field] !== undefined) {
                obj[field] = this[field];
            }
        });
        return obj;
    };
    ctor['clone'] = function (data) {
        if (!data) {
            return null;
        }
        const clz = ctor;
        const entity = new clz();
        const fields = Object.getOwnPropertyNames(entity);
        fields.forEach(field => {
            if (typeof data[field] !== 'undefined') {
                entity[field] = data[field];
            }
        });
        return entity;
    };
    if (name && typeof name === 'string') {
        ctor['$tableName'] = name;
    }
    else if (!name || (name && typeof name === 'number' && name === Entity.underline)) {
        let reg = /([A-Z][0-9a-z]*[^A-Z])/g;
        let ret = '';
        ctor.name.replace(reg, function (match) {
            ret += match.toLowerCase() + '_';
            return ctor.name;
        });
        ret = ret.slice(0, -1);
        console.log('entity.js line 45 ' + ret);
        ctor['$tableName'] = ret;
    }
    else {
        throw new Error('wrong arguments of @entity');
    }
};
