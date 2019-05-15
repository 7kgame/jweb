import { Autowired, Service } from 'jbean'
import UserRepository from './repository/UserRepository'
import UserEntity from './entity/user'

@Service('userService0')
export default class UserService {

  @Autowired('userRepository0')
  private userRepository: UserRepository

  constructor () {
    //console.log('new UserService')
  }

  public async hello (user: UserEntity) {
    // console.log(this.userRepository)
    let res1 = this.userRepository.hello(user)
    let res2 = this.userRepository.helloMongo()
    let res3 = this.userRepository.helloRedis()
    return Promise.all([res1, res2, res3])
    // return 'hello'
  }

}

