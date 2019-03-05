"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs");
const ejs = require("ejs");
const Hoek = require("hoek");
class Template {
    constructor() {
        this.data = {};
    }
    assign(name, value) {
        this.data[name] = value;
    }
    assigns(data) {
        if (!data) {
            return;
        }
        Object.keys(data).forEach(name => {
            this.assign(name, data[name]);
        });
    }
    assignFile(name, fileName, data, options) {
        const tpl = Template.getTemplateFile(fileName);
        data = data || {};
        Hoek.merge(data, this.data);
        this.assign(name, this.render(fileName, data, options));
    }
    render(fileName, data, options) {
        const tpl = Template.getTemplateFile(fileName);
        let html = ejs.render(tpl, data ? data : this.data, options);
        return html;
    }
    static getTemplateFile(fileName) {
        if (!Template.tpls[fileName]) {
            Template.tpls[fileName] = FS.readFileSync(fileName, 'utf8');
        }
        return Template.tpls[fileName];
    }
}
Template.tpls = {};
exports.default = Template;
