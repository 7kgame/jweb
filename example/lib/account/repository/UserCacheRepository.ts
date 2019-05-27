import { Repository } from 'jbean'
import { RedisRepository } from 'jweb-redis'
import User from '../entity/user'

@Repository
export default class UserCacheRepository extends RedisRepository<User> {

  public constructor () {
    super(User)
  }

}