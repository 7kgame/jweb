"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formidable = require("formidable");
const request_1 = require("../request");
const response_1 = require("../response");
function setCorsHeader(req, res, options) {
}
exports.setCorsHeader = setCorsHeader;
function httpParser(req, res, options, success, fail) {
    setCorsHeader(req, res, options);
    const request = new request_1.default(req, res);
    const response = new response_1.default(req, res);
    const hasBody = request_1.NO_BODY_REQUESTS.indexOf(request.method) < 0;
    let form = null;
    if (hasBody) {
        // https://github.com/node-formidable/node-formidable
        form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) {
                return fail(err, request, response);
            }
            console.log(fields);
            success(request, response);
        });
        // form.on('file', function(name, file: formidable.File) {
        // })
        // form.on('progress', function(bytesReceived, bytesExpected) {
        // })
        // form.on('field', function(name, value) {
        // })
    }
    else {
        success(request, response);
    }
}
exports.default = httpParser;
