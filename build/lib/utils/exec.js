"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
function exec(cmd) {
    return new Promise((resolve, reject) => {
        child_process.exec(cmd, function (err, out, stderr) {
            if (err) {
                reject({ code: err.code, message: JSON.stringify(stderr) });
                return;
            }
            resolve(out);
        });
    });
}
exports.exec = exec;
