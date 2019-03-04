"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../bean/repository");
function default_1(name) {
    if (typeof name === 'string') {
        return (target) => {
            repository_1.default.addBean(name || target, target);
        };
    }
    else {
        repository_1.default.addBean(name, name);
        return name;
    }
}
exports.default = default_1;
