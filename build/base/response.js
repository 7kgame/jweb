"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reqres_1 = require("./reqres");
class Response extends reqres_1.default {
    constructor(request, response) {
        super();
        this.request = request;
        this.response = response;
    }
    write(data) {
        if (data === null || data === undefined) {
            return;
        }
        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }
        this.response.write(data);
    }
    flush() {
        this.response.end();
    }
    writeAndFlush(data) {
        this.write(data);
        this.flush();
    }
    redirect(url, code) {
        if (code === undefined) {
            code = 302;
        }
        this.response.writeHead(code, {
            Location: url
        });
        this.flush();
    }
    writeHeader(code, reason) {
        this.response.writeHead(code, reason);
    }
    setHeader(name, value) {
        this.response.setHeader(name, value);
    }
    type(mimeType) {
        this.setHeader('Content-Type', mimeType);
    }
    setCookie(name, value, options) {
        // this.response.response().state(name, value, options)
    }
    delCookie(name, options) {
        // this.response.response().unstate(name, options)
    }
    error(message) {
        this.writeHeader(500, message);
        this.flush();
    }
}
exports.default = Response;
Response.primaryTypes = ['boolean', 'number', 'string'];
