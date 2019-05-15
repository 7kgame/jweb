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
const lib_1 = require("../../../../lib");
const lib_2 = require("../../../../lib");
let User = class User {
    constructor() {
        this.uid = undefined;
        this.name = undefined;
        this.age = undefined;
    }
};
__decorate([
    lib_1.Type('string'),
    lib_2.Required("uid是必填的参数"),
    __metadata("design:type", Object)
], User.prototype, "uid", void 0);
__decorate([
    lib_2.Required,
    lib_2.Size(20, 30, 'name的长度应该位于20-30之间'),
    __metadata("design:type", Object)
], User.prototype, "name", void 0);
__decorate([
    lib_1.Type('number', true),
    lib_2.Required("age is required"),
    lib_2.Min(18),
    lib_2.Max(100),
    __metadata("design:type", Object)
], User.prototype, "age", void 0);
User = __decorate([
    lib_1.Entity
], User);
exports.default = User;
