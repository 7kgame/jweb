import MongoDao from 'jweb-Mongo';
import MysqlDao from 'jweb-Mysql';
import RedisDao from 'jweb-Redis';
import * as Util from 'util';

import { Repository, Autowired } from '../../../../lib';

@Repository
export default class UserRepository {

  @Autowired('mongo.primary')
  private mongo: MongoDao;

  @Autowired('mysql.primary')
  private mysql: MysqlDao;

  @Autowired('redis.primary')
  private redis: RedisDao;

  constructor () {
    console.log('new userRepository');
  }

  public async hello () {
    let client = this.mysql.getClient();
    // return Util.promisify(client.query)("select * from test.User limit 10");
    return new Promise((resolve, reject) => {
      client.query("select * from test.User limit 10", function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  public async helloMongo ()  {
    let dbName = 'test';
    let client = this.mongo.getClient();
    const db = client.db(dbName);
    const col = db.collection('user');
    let res = col.find({});
    // return Util.promisify(res.toArray)();
    return res.toArray();
  }

  public async helloRedis () {
    let client = this.redis.getClient();
    // return Util.promisify(client.get)("test");
    return new Promise((resolve, reject) => {
      client.get('test', (err, val) => {
        if (err) {
          reject(err);
        } else {
          resolve(val);
        }
      });
    });
  }

}

