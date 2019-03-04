"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hoek = require("hoek");
const Boom = require("boom");
class Response {
    constructor(request, response, resolve, reject) {
        this.request = request;
        this.response = response;
        this.resolve = resolve;
        this.reject = reject;
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
            else if (Response.primaryTypes.indexOf(dataType) >= 0) {
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
    getData() {
        return this.data;
    }
    write(data) {
        if (data === null || data === undefined) {
            return;
        }
        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }
        this.request.raw.res.write(data);
    }
    flush() {
        this.data = null;
        this.request.raw.res.end();
    }
    writeAndFlush(data) {
        this.write(data);
        this.flush();
    }
    setHeader(name, value) {
        this.request.raw.res.setHeader(name, value);
    }
    type(mimeType) {
        this.setHeader('Content-Type', mimeType);
    }
    setCookie(name, value, options) {
        this.response.response().state(name, value, options);
    }
    delCookie(name, options) {
        this.response.response().unstate(name, options);
    }
    error(message) {
        this.reject(Boom.badGateway(message));
    }
}
Response.primaryTypes = ['boolean', 'number', 'string'];
exports.default = Response;
