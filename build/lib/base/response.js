"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const reqres_1 = require("./reqres");
class Response extends reqres_1.default {
    constructor(request, response, resolve, reject) {
        super();
        this.request = request;
        this.response = response;
        this.resolve = resolve;
        this.reject = reject;
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
        this.request.raw.res.end();
    }
    writeAndFlush(data) {
        this.write(data);
        this.flush();
    }
    redirect(url, code) {
        if (code === undefined) {
            code = 302;
        }
        this.request.raw.res.writeHead(code, {
            Location: url
        });
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
