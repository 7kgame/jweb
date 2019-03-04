"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../bean/service");
function default_1(name) {
    if (typeof name === 'string') {
        return (target) => {
            service_1.default.addBean(name || target, target);
        };
    }
    else {
        service_1.default.addBean(name, name);
        return name;
    }
}
exports.default = default_1;
