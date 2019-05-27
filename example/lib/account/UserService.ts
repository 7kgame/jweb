import { Autowired, Service, BusinessException, Page } from 'jbean'
import UserDao from './repository/UserDao'
import UserEntity from './entity/user'
import UserRepository from './repository/UserRepository'
import UserCacheRepository from './repository/UserCacheRepository'

@Service
export default class UserService {

  @Autowired
  private userDao: UserDao

  @Autowired
  private userRepository: UserRepository

  @Autowired
  private userCacheRepository: UserCacheRepository

  constructor () {
  }

  public beforeCall () {
    console.log('userService beforeCall')
  }

  public async hello (user: UserEntity) {
    console.log(await this.userCacheRepository.get('a'), '===== userCacheRepository.redis 1')
    console.log(await this.userCacheRepository.sendCommand('hmget', 'hk', 'm0', 'm1'), '=====userCacheRepository.redis 2')
    console.log(await this.userCacheRepository.sendCommand('hmget', 'hk12', 'm0', 'm1'), '=====userCacheRepository.redis 3')
    let d: UserEntity = await this.userRepository.find(user)
    console.log('userRepository.find ', d)
    let where: any = {
      $where: []
    }
    where.$where.push({uid: '> 0'})
    where.$where.push({age: '> 1'})
    where.$where.push({age: '< 60'})

    // where = {uid: '> 1'}
    let p: Page = await this.userRepository.searchByPage(where, 0, 2)
    console.log('userRepository.searchByPage', p)
    let res1 = this.userDao.hello(user)
    let res2 = this.userDao.helloMongo()
    let res3 = this.userDao.helloRedis()
    return Promise.all([res1, res2, res3])
  }

}

