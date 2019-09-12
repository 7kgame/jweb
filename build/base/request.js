"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reqres_1 = require("./reqres");
class Request extends reqres_1.default {
    // constructor (request: Hapi.Request, response: Hapi.ResponseToolkit, resolve: any, reject: any) {
    constructor(request, response) {
        super();
        this.url = request.url;
        this.path = request.path;
        this.payload = request.payload;
        this.query = request.query;
        this.params = request.params;
        this.paramsArray = request.paramsArray;
        this.headers = request.headers;
        this.cookies = request.state;
        this.request = request;
        this.response = response;
    }
}
exports.default = Request;
