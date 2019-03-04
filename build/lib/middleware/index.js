"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseJSON_1 = require("./ResponseJSON");
const ResponseXML_1 = require("./ResponseXML");
function getInnerMiddleware(type) {
    switch (type) {
        case 'json':
            return ResponseJSON_1.default;
        case 'xml':
            return ResponseXML_1.default;
        default:
            return null;
    }
}
exports.default = getInnerMiddleware;
