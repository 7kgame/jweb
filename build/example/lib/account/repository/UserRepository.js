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
let UserRepository = class UserRepository {
    /*
    @Autowired('mysql.primary')
    private mysql: MysqlRepository;
  
    @Autowired('mongo.primary')
    private mongo;
     */
    constructor() {
        console.log('new userRepository');
    }
    hello() {
        /*
        let client = this.mysql.getClient();
        console.log(client.threadId);
        let a = await client.query("use tp5");
        let res = await client.query("select * from User limit 10");
        console.log(res);
        client.query("use tp5", function(err, ret) {});
        client.query("select * from User limit 10", function(err, res) {
          console.log(res);
        });
        */
        return "user repository";
    }
    helloMongo() {
        /*
        let dbName = 'test';
        let client = this.mongo.getClient();
        const db = client.db(dbName);
        const col = db.collection('user');
        col.find({}).toArray(function(err, items) {
          console.log(items);
          console.log('item', items.length);
        });
         */
        return 'helloMongo';
    }
};
UserRepository = __decorate([
    lib_1.Repository,
    __metadata("design:paramtypes", [])
], UserRepository);
exports.default = UserRepository;
