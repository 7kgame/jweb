"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
function exec(cmd) {
    return new Promise((resolve, reject) => {
        child_process.exec(cmd, function (err, out, stderr) {
            if (err) {
                reject({ err: err.code, message: JSON.stringify(stderr) });
                return;
            }
            resolve({ err: null, data: out, message: null });
        });
    });
}
exports.exec = exec;
