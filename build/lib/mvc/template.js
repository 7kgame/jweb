"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs");
const ejs = require("ejs");
const Hoek = require("hoek");
class Template {
    constructor() {
        this.isDev = process.env.NODE_ENV === 'development';
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
        data = data || {};
        Hoek.merge(data, this.data);
        this.assign(name, this.render(fileName, data, options));
    }
    render(fileName, data, options) {
        const tpl = this.getTemplateFile(fileName);
        let html = ejs.render(tpl, data ? data : this.data, options);
        return html;
    }
    getTemplateFile(fileName) {
        if (this.isDev || !Template.tpls[fileName]) {
            Template.tpls[fileName] = FS.readFileSync(fileName, 'utf8');
        }
        return Template.tpls[fileName];
    }
}
Template.tpls = {};
exports.default = Template;
