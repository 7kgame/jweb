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
const UserDao_1 = require("./repository/UserDao");
const UserRepository_1 = require("./repository/UserRepository");
const UserCacheRepository_1 = require("./repository/UserCacheRepository");
let UserService = class UserService {
    constructor() {
    }
    beforeCall() {
        console.log('userService beforeCall');
    }
    hello(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield this.userCacheRepository.get('a'), '===== userCacheRepository.redis 1');
            console.log(yield this.userCacheRepository.sendCommand('hmget', 'hk', 'm0', 'm1'), '=====userCacheRepository.redis 2');
            console.log(yield this.userCacheRepository.sendCommand('hmget', 'hk12', 'm0', 'm1'), '=====userCacheRepository.redis 3');
            let d = yield this.userRepository.find(user, []);
            console.log('userRepository.find ', d, d['toObject']());
            let where = {
                $where: []
            };
            where.$where.push({ uid: '> 0' });
            where.$where.push({ age: '> 1' });
            where.$where.push({ age: '< 60' });
            // where = {uid: '> 1'}
            let p = yield this.userRepository.searchByPage(where, 0, 2);
            console.log('userRepository.searchByPage', p);
            let res1 = this.userDao.hello(user);
            let res2 = this.userDao.helloMongo();
            let res3 = this.userDao.helloRedis();
            return Promise.all([res1, res2, res3]);
        });
    }
};
__decorate([
    jbean_1.Autowired,
    __metadata("design:type", UserDao_1.default)
], UserService.prototype, "userDao", void 0);
__decorate([
    jbean_1.Autowired,
    __metadata("design:type", UserRepository_1.default)
], UserService.prototype, "userRepository", void 0);
__decorate([
    jbean_1.Autowired,
    __metadata("design:type", UserCacheRepository_1.default)
], UserService.prototype, "userCacheRepository", void 0);
UserService = __decorate([
    jbean_1.Service,
    __metadata("design:paramtypes", [])
], UserService);
exports.default = UserService;
