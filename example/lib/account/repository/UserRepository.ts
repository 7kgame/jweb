import { Repository } from 'jbean'
import { MysqlRepository, escape, escapeId } from 'jweb-mysql'
import User from '../entity/user'

@Repository
export default class UserRepository extends MysqlRepository<User> {

  public constructor () {
    super(User)
    console.log(typeof escape, ' [mysql escape]')
  }

}