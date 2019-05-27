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
const user_1 = require("../entity/user");
let UserDao = class UserDao {
    constructor() {
        //console.log('new userRepository')
    }
    postInit() {
        console.log('userRepository.postInit');
    }
    beforeCall() {
        console.log('userRepository beforeCall');
    }
    hello(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield this.redis.get('a'), '=====redis 1');
            console.log(yield this.redis.sendCommand('hmget', 'hk', 'm0', 'm1'), '=====redis 2');
            console.log(yield this.redis.sendCommand('hmget', 'hk12', 'm0', 'm1'), '=====redis 3');
            yield this.mysql.delete(user_1.default, { uid: user.uid });
            const id = yield this.mysql.insert(user);
            console.log('insert id ', id);
            user.name = 'hello';
            yield this.mysql.update(user, { uid: user.uid });
            let num = yield this.mysql.count(user_1.default);
            console.log('count is ', num);
            // await this.mysql.delete(UserEntity, {uid: 14, age: 1})
            let delNum = yield this.mysql.deleteById(user_1.default, 1);
            console.log(delNum, '==========');
            const data = yield this.mysql.findAll(user_1.default);
            // console.log(data)
            const page = yield this.mysql.searchByPage(user_1.default, { uid: '> 1' }, 0, 4, { column: 'uid', op: 'desc' });
            console.log(page);
            const u = yield this.mysql.find(user_1.default, { uid: 160 });
            console.log(u);
            const u0 = yield this.mysql.findById(user_1.default, 160, null, true);
            console.log('find by id', u0);
            //console.log(JSON.stringify(u))
            return page;
        });
    }
    helloMongo() {
        return __awaiter(this, void 0, void 0, function* () {
            let dbName = 'test';
            let client = this.mongo.getClient();
            const db = client.db(dbName);
            const col = db.collection('runoob');
            let res = col.find({});
            // return Util.promisify(res.toArray)()
            return res.toArray();
        });
    }
    helloRedis() {
        return __awaiter(this, void 0, void 0, function* () {
            let client = this.redis.getClient();
            // return Util.promisify(client.get)("test")
            return new Promise((resolve, reject) => {
                client.get('test', (err, val) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(val);
                    }
                });
            });
        });
    }
};
__decorate([
    jbean_1.Autowired('mongo.primary'),
    __metadata("design:type", Object)
], UserDao.prototype, "mongo", void 0);
__decorate([
    jbean_1.Autowired('mysql.primary'),
    __metadata("design:type", Object)
], UserDao.prototype, "mysql", void 0);
__decorate([
    jbean_1.Autowired('redis.primary'),
    __metadata("design:type", Object)
], UserDao.prototype, "redis", void 0);
UserDao = __decorate([
    jbean_1.Repository,
    __metadata("design:paramtypes", [])
], UserDao);
exports.default = UserDao;
