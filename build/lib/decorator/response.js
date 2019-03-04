"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../bean/controller");
function ResponseFactory(type, target, handler = '') {
    controller_1.default.addResponseFormat(target, handler, type);
}
function ResponseXML(target, handler) {
    ResponseFactory('xml', target, handler);
}
exports.ResponseXML = ResponseXML;
function ResponseJSON(target, handler) {
    ResponseFactory('json', target, handler);
}
exports.ResponseJSON = ResponseJSON;
