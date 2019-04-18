"use strict";
// import Controller from "../bean/controller"
Object.defineProperty(exports, "__esModule", { value: true });
function ResponseFactory(type, target, handler = '') {
    // Controller.addResponseFormat(target, handler, type)
}
function ResponseXML(target, handler) {
    ResponseFactory('xml', target, handler);
}
exports.ResponseXML = ResponseXML;
function ResponseJSON(target, handler) {
    ResponseFactory('json', target, handler);
}
exports.ResponseJSON = ResponseJSON;
