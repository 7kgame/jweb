"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../bean/middleware");
function default_1(name) {
    if (typeof name === 'string') {
        return (target) => {
            middleware_1.default.addBean(name || target, target);
        };
    }
    else {
        middleware_1.default.addBean(name, name);
        return name;
    }
}
exports.default = default_1;
