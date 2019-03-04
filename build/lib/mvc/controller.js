"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("./template");
class Controller {
    initTemplate() {
        if (!this.tpl) {
            this.tpl = new template_1.default();
        }
    }
    template(name, fileName, data, options) {
        this.initTemplate();
        this.tpl.assignFile(name, fileName, data, options);
    }
    templateValue(name, value) {
        this.initTemplate();
        this.tpl.assign(name, value);
    }
    templateValues(data) {
        this.initTemplate();
        this.tpl.assigns(data);
    }
    // TODO: return Promise<string>
    show(fileName, contentKey, withoutDefaultLayoutDir) {
        this.initTemplate();
        if (!withoutDefaultLayoutDir) {
            fileName = this['__layoutDir'] + fileName + '.' + this['__tplExt'];
        }
        if (!contentKey) {
            contentKey = 'content';
        }
        if (contentKey) {
            let fileName1 = this['__tplDir'] + this['__method'] + '.' + this['__tplExt'];
            this.template(contentKey, fileName1, null, {
                filename: this['__tplDir']
            });
        }
        return this.tpl.render(fileName, null, {
            filename: this['__layoutDir']
        });
    }
}
exports.default = Controller;
