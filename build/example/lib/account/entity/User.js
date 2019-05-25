"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
const lib_1 = require("../../../../lib");
const REGISTER_SCENE1 = 'register1';
const MODIFY_SCENE2 = 'modify';
let User = class User {
    constructor() {
        this.uid = undefined;
        this.name = undefined;
        this.age = undefined;
    }
};
__decorate([
    lib_1.ValidationScene(REGISTER_SCENE1, MODIFY_SCENE2),
    lib_1.Required("uid是必填的参数"),
    jbean_1.Id,
    __metadata("design:type", Object)
], User.prototype, "uid", void 0);
__decorate([
    lib_1.Required,
    lib_1.ValidationScene(REGISTER_SCENE1),
    lib_1.Email,
    lib_1.Size(2, 30, 'name的长度应该位于$min-$max之间'),
    __metadata("design:type", Object)
], User.prototype, "name", void 0);
__decorate([
    jbean_1.Type('number'),
    lib_1.ValidationScene(MODIFY_SCENE2),
    lib_1.Required("age is required"),
    lib_1.Between(18, 20, 'error exist $field : $min $val'),
    __metadata("design:type", Object)
], User.prototype, "age", void 0);
User = __decorate([
    jbean_1.Entity
], User);
exports.default = User;
