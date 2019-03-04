"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs");
const Path = require("path");
const YAML = require("yaml");
const application_1 = require("../application");
const utils_1 = require("../utils");
function default_1(option) {
    const application = application_1.default.getIns();
    let configDir = option && option.configDir;
    configDir = application.root + Path.sep + (configDir || 'config');
    utils_1.readDirSync(configDir, (fpath, isFile) => {
        if (fpath.endsWith('.yml') || fpath.endsWith('.json')) {
            let content = FS.readFileSync(fpath, 'utf8');
            if (!content) {
                return;
            }
            content = content.trim();
            if (fpath.endsWith('.yml')) {
                content = YAML.parse(content);
            }
            else {
                content = JSON.parse(content);
            }
            if (content) {
                application.addProperty(content);
            }
        }
    });
}
exports.default = default_1;
