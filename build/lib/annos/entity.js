"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
function Entity(name) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Entity;
const callback = function (annoType, ctor, name) {
    // console.log(name)
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
};
