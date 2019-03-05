"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hoek = require("hoek");
const utils_1 = require("../utils");
const PrimaryTypes = ['boolean', 'number', 'string'];
class ReqRes {
    constructor() {
    }
    append(data) {
        if (data === null || data === undefined) {
            return;
        }
        if (this.data === null || this.data === undefined) {
            this.data = data;
        }
        else {
            let dataType = typeof data;
            if (Array.isArray(data)) {
                this.data = this.data.concat(data);
            }
            else if (PrimaryTypes.indexOf(dataType) >= 0) {
                this.data = data;
            }
            else {
                Hoek.merge(this.data, data);
            }
        }
    }
    setData(data) {
        this.data = data;
    }
    getData(key) {
        if (key && utils_1.getObjectType(key) === 'object') {
            return this.data[key];
        }
        else {
            return this.data;
        }
    }
}
exports.default = ReqRes;
