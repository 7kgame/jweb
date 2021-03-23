"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring = require("querystring");
const reqres_1 = require("./reqres");
exports.HTTP_METHODS = {
    get: 'get',
    head: 'head',
    post: 'post',
    put: 'put',
    delete: 'delete',
    connect: 'connect',
    options: 'options',
    trace: 'trace',
    patch: 'patch'
};
exports.NO_BODY_REQUESTS = [
    exports.HTTP_METHODS.get,
    exports.HTTP_METHODS.head,
    exports.HTTP_METHODS.delete,
    exports.HTTP_METHODS.options
];
class Request extends reqres_1.default {
    constructor(request, response) {
        super();
        this.method = request.method.toLowerCase();
        const url = request.url || '/';
        const queryStartPos = url.indexOf('?');
        let path = url, queryParams = null;
        if (queryStartPos >= 0) {
            path = url.substr(0, queryStartPos);
            queryParams = querystring.decode(url.substr(queryStartPos + 1));
        }
        this.url = request.headers.host + request.url;
        this.path = request.url;
        // this.payload = request.payload
        // this.query = request.query
        // this.params = request.params
        // this.paramsArray = request.paramsArray
        this.headers = request.headers;
        // this.cookies = request.state
        this.request = request;
        this.response = response;
    }
    getParam(key, defaultValue) {
        if (this.params && typeof this.params[key] !== 'undefined') {
            return this.params[key];
        }
        if (this.query && typeof this.query[key] !== 'undefined') {
            return this.query[key];
        }
        if (this.payload && typeof this.payload[key] !== 'undefined') {
            return this.payload[key];
        }
        return defaultValue || null;
    }
    getNum(key, defaultValue) {
        const val = this.getParam(key, defaultValue);
        if (val === null) {
            return defaultValue || null;
        }
        if (!val) {
            return 0;
        }
        return val - 0;
    }
    getString(key, defaultValue) {
        const val = this.getParam(key, defaultValue);
        if (val === null) {
            return defaultValue || null;
        }
        return String(val);
    }
    getBool(key, defaultValue) {
        const val = this.getParam(key, defaultValue);
        if (val === null) {
            return defaultValue || null;
        }
        return Boolean(val);
    }
}
exports.default = Request;
