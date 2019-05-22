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
const jbean_1 = require("jbean");
const UserRepository_1 = require("./repository/UserRepository");
let UserService = class UserService {
    constructor() {
        //console.log('new UserService')
    }
    beforeCall() {
        console.log('userService beforeCall');
    }
    hello(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(this.userRepository)
            let res1 = this.userRepository.hello(user);
            let res2 = this.userRepository.helloMongo();
            let res3 = this.userRepository.helloRedis();
            return Promise.all([res1, res2, res3]);
            // return 'hello'
        });
    }
};
__decorate([
    jbean_1.Autowired('userRepository0'),
    __metadata("design:type", UserRepository_1.default)
], UserService.prototype, "userRepository", void 0);
UserService = __decorate([
    jbean_1.Service('userService0'),
    __metadata("design:paramtypes", [])
], UserService);
exports.default = UserService;
