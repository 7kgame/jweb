"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reqres_1 = require("./reqres");
class Request extends reqres_1.default {
    constructor(request, response, resolve, reject) {
        super();
        this.url = request.url;
        this.path = request.path;
        this.payload = request.payload;
        this.query = request.query;
        this.params = request.params;
        this.paramsArray = request.paramsArray;
        this.headers = request.headers;
        this.cookies = request.state;
        this.resolve = resolve;
        this.reject = reject;
    }
}
exports.default = Request;
