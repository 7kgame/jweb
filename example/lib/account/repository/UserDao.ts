import MongoDao from 'jweb-mongo'
import MysqlDao, { SelectOptions } from 'jweb-mysql'
import RedisDao from 'jweb-redis'
import { Autowired, BeanFactory, Repository, Page } from 'jbean'
import UserEntity from '../entity/user'

@Repository
export default class UserDao {

  @Autowired('mongo.primary')
  private mongo: MongoDao

  @Autowired('mysql.primary')
  private mysql: MysqlDao

  @Autowired('redis.primary')
  private redis: RedisDao

  constructor () {
    //console.log('new userRepository')
  }

  private postInit (): void {
    console.log('userRepository.postInit')
  }

  public beforeCall () {
    console.log('userRepository beforeCall')
  }

  public async hello (user: UserEntity) {
    // const data: UserEntity[] = await this.mysql.find(UserEntity, {uid: null})
    // console.log(data, 'find null ,,,,,,,,,,,,,,,,,,,,,,,,,,')

    // const data1: UserEntity[] = await this.mysql.find(UserEntity)
    // console.log(data1, 'find ,,,,,,,,,,,,,,,,,,,,,,,,,,')

    // const data2: UserEntity[] = await this.mysql.findAll(UserEntity)
    // console.log(data2, 'find all ,,,,,,,,,,,,,,,,,,,,,,,,,,')

    // const data3: UserEntity[] = await this.mysql.findAll(UserEntity, [{uid: null, $op: 'is not'}, {name: ['hello', 'world'], $op: 'in'}, {age: [10, 13], $op: 'between'}])
    // console.log(data3, 'find by multi condition ,,,,,,,,,,,,,,,,,,,,,,,,,,')

    // console.log(await this.redis.get('a'), '=====redis 1')
    // console.log(await this.redis.sendCommand('hmget', 'hk', 'm0', 'm1'), '=====redis 2')
    // console.log(await this.redis.sendCommand('hmget', 'hk12', 'm0', 'm1'), '=====redis 3')
    await this.mysql.delete(UserEntity, {uid: user.uid}, BeanFactory.getRequestId(this))
    user.uid = 100
    const id = await this.mysql.insert(user, BeanFactory.getRequestId(this))
    console.log('insert id ', id)
    // user.name = 'hello'
    // let u1 = await this.mysql.update(user, {uid: user.uid})
    // console.log('update result', u1)
    let num = await this.mysql.count(UserEntity)
    console.log('count is ', num)
    // await this.mysql.delete(UserEntity, {uid: 14, age: 1})
    // let delNum = await this.mysql.deleteById(UserEntity, 1)
    // console.log(delNum, '==========')
    const page: Page<UserEntity> = await this.mysql.searchByPage<UserEntity>(UserEntity, {uid: '> 1'}, 0, 4, {column: 'uid', op: 'desc'})
    // console.log(page)
    const u:UserEntity = await this.mysql.find(UserEntity, {uid: 160})
    // console.log(u)

    // const u0 = await this.mysql.findById(UserEntity, 160, null, true)
    // console.log('find by id', u0)
    //console.log(JSON.stringify(u))
    return page
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