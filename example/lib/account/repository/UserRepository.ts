import MongoDao from 'jweb-mongo'
import MysqlDao from 'jweb-mysql'
import RedisDao from 'jweb-redis'
import { Autowired, Repository } from 'jbean'
import UserEntity from '../entity/user'

@Repository('userRepository0')
export default class UserRepository {

  @Autowired('mongo.primary')
  private mongo: MongoDao

  @Autowired('mysql.primary')
  private mysql: MysqlDao

  @Autowired('redis.primary')
  private redis: RedisDao

  constructor () {
    console.log('new userRepository')
  }

  private postInit (): void {
    console.log('userRepository.postInit')
  }

  public async hello (user: UserEntity) {
    this.mysql.insert(user)
    user.name = 'hello'
    this.mysql.update(user, {uid: 13})
    this.mysql.delete(UserEntity, {uid: 14, age: 1})
    const data = await this.mysql.select(UserEntity, {uid: 15, name: 'hello'})
    console.log(data)
    const u = await this.mysql.getEntity(UserEntity, {uid: 15})
    console.log(u)
    return data
  }

  public async helloMongo ()  {
    let dbName = 'test'
    let client = this.mongo.getClient()
    const db = client.db(dbName)
    const col = db.collection('runoob')
    let res = col.find({})
    // return Util.promisify(res.toArray)()
    return res.toArray()
  }

  public async helloRedis () {
    let client = this.redis.getClient()
    // return Util.promisify(client.get)("test")
    return new Promise((resolve, reject) => {
      client.get('test', (err, val) => {
        if (err) {
          reject(err)
        } else {
          resolve(val)
        }
      })
    })
  }

}

