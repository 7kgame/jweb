"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
function readDirSync(path, cb) {
    let res = fs.readdirSync(path);
    res.forEach((fname, index) => {
        let fpath = path + Path.sep + fname;
        let stat = fs.statSync(fpath);
        if (stat.isDirectory()) {
            readDirSync(fpath, cb);
            cb(fpath, false);
        }
        else {
            cb(fpath, true);
        }
    });
}
exports.readDirSync = readDirSync;
