import MongoDao from 'jweb-mongo'
import MysqlDao from 'jweb-mysql'
import RedisDao from 'jweb-redis'
import { Autowired, Repository } from 'jbean'

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

  public async hello () {
    let client = this.mysql.getClient()
    // return Util.promisify(client.query)("select * from test.User limit 10")
    return new Promise((resolve, reject) => {
      client.query("select * from shoucai.User limit 10", function(err, res) {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  public async helloMongo ()  {
    let dbName = 'test'
    let client = this.mongo.getClient()
    const db = client.db(dbName)
    const col = db.collection('user')
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

