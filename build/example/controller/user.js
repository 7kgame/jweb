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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const UserService_1 = require("../lib/account/UserService");
const PayService_1 = require("../lib/account/PayService");
const Auth_1 = require("../lib/middleware/Auth");
const Test_1 = require("../lib/middleware/Test");
//import * as ejs from 'ejs';
let User = 
// @ResponseXML
class User extends lib_1.BaseController {
    constructor() {
        super();
        console.log('init user');
    }
    process({ uid }) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.userService.hello();
            console.log(data);
            return '<div style="color: red">' + 'this is user process ' + uid + ', ' + JSON.stringify(data) + ', ' + this.payService.hello() + '</div>';
        });
    }
    list() {
        this.templateValue('contentInfo', './header/css/main.css');
        this.templateValue('uid', 1);
        this.templateValue('name', '<span>Jim</span>');
        return this.show('page');
    }
    list2() {
        this.templateValue('contentInfo', './header/css/main.css');
        this.templateValue('uid', 2);
        this.templateValue('name', '<span>tim</span>');
        return this.show('page');
    }
    info(request, response) {
        console.log('user/info exec');
        response.error('出错啦');
        return null;
        let test = new Map();
        test.set("a", { k: 1, k2: null, k3: false, k4: 'hello' });
        return test;
    }
};
__decorate([
    lib_1.Autowired('userService0'),
    __metadata("design:type", UserService_1.default)
], User.prototype, "userService", void 0);
__decorate([
    lib_1.Autowired,
    __metadata("design:type", PayService_1.default)
], User.prototype, "payService", void 0);
__decorate([
    lib_1.Get('/process/{uid}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], User.prototype, "process", null);
__decorate([
    lib_1.Get('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "list", null);
__decorate([
    lib_1.Get('/list2'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "list2", null);
__decorate([
    lib_1.Get('/info'),
    lib_1.ResponseJSON,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lib_1.Request, lib_1.Response]),
    __metadata("design:returntype", void 0)
], User.prototype, "info", null);
User = __decorate([
    lib_1.Controller('/user', [Auth_1.default, Test_1.default])
    // @ResponseXML
    ,
    __metadata("design:paramtypes", [])
], User);
exports.default = User;
