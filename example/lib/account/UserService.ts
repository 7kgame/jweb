import { Service, Autowired } from '../../../lib'
import UserRepository from './repository/UserRepository'

@Service('userService0')
export default class UserService {

  @Autowired
  private userRepository: UserRepository

  constructor () {
    console.log('new UserService')
  }

  public async hello () {
    let res1 = this.userRepository.hello()
    let res2 = this.userRepository.helloMongo()
    let res3 = this.userRepository.helloRedis()
    return Promise.all([res1, res2, res3])
  }

}

