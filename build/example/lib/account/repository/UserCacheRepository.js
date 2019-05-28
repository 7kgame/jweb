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
const jweb_redis_1 = require("jweb-redis");
const user_1 = require("../entity/user");
let UserCacheRepository = class UserCacheRepository extends jweb_redis_1.RedisRepository {
    constructor() {
        super(user_1.default);
    }
    testMulti() {
        return new Promise((res, rej) => {
            const client = this.getClient();
            client.multi().
                get('key1').
                set('key2', 'val2').
                exec((err, data) => {
                if (err) {
                    rej(err);
                }
                else {
                    console.log(data);
                    res(data);
                }
            });
        });
    }
};
UserCacheRepository = __decorate([
    jbean_1.Repository,
    __metadata("design:paramtypes", [])
], UserCacheRepository);
exports.default = UserCacheRepository;
