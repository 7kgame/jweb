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
const lib_1 = require("../../../../lib");
let UserRepository = class UserRepository {
    constructor() {
        console.log('new userRepository');
    }
    hello() {
        return __awaiter(this, void 0, void 0, function* () {
            let client = this.mysql.getClient();
            // return Util.promisify(client.query)("select * from test.User limit 10")
            return new Promise((resolve, reject) => {
                client.query("select * from test.User limit 10", function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                });
            });
        });
    }
    helloMongo() {
        return __awaiter(this, void 0, void 0, function* () {
            let dbName = 'test';
            let client = this.mongo.getClient();
            const db = client.db(dbName);
            const col = db.collection('user');
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
    lib_1.Autowired('mongo.primary'),
    __metadata("design:type", Object)
], UserRepository.prototype, "mongo", void 0);
__decorate([
    lib_1.Autowired('mysql.primary'),
    __metadata("design:type", Object)
], UserRepository.prototype, "mysql", void 0);
__decorate([
    lib_1.Autowired('redis.primary'),
    __metadata("design:type", Object)
], UserRepository.prototype, "redis", void 0);
UserRepository = __decorate([
    lib_1.Repository,
    __metadata("design:paramtypes", [])
], UserRepository);
exports.default = UserRepository;
