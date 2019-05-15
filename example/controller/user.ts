import { Autowired, BusinessException } from 'jbean'
import { BaseController, Controller, Get, Post, Request, Response, Transactional, Validation } from '../../lib'
import UserService from '../lib/account/UserService'
import PayService from '../lib/account/PayService'
import Auth from '../annos/Auth'
import ResponseBody from '../annos/response_body'
import UserEntity from '../lib/account/entity/user'

@Controller('/user')
@Transactional
// @Auth
// @ResponseXML
export default class User extends BaseController {

  @Autowired('userService0')
  private userService: UserService

  @Autowired
  private payService: PayService

  constructor () {
    super()
    //console.log('init user')
  }

  private preAround (ret) {
    console.log('preAround', ret)
  }

  private postAround (ret) {
    console.log('postAround', ret)
  }
  private beforeCall (ret) {
    console.log('beforeCall' , ret)
    return ret
  }

  public afterCall (ret) {
    console.log('afterCall', ret)
    if (ret.err) {
      return {
        status: -1,
        errmessage: ret.err
      }
    } else {
      return ret.data
    }
  }

  @Get('/process/{uid0}')
  @Auth
  @ResponseBody('json')
  @Validation(UserEntity)
  @Transactional
  public async process (req: Request, res: Response, { uid0 }) {
    const user: UserEntity = req.entity
    console.log('inside call', user)
    // console.log(user['toObject']())
    // console.log('userService is', this.userService)
    // throw new Error('hdhhsh')
    // console.log('uid is ' + uid)
    // return uid
    // throw new Error('test err')
    // let data = await this.userService.hello()
    // return '<div style="color: red">' + 'this is user process ' + uid + ', ' + JSON.stringify(data) + ', ' + this.payService.hello() + '</div>'
    let u = await this.userService.hello(user)

    throw new BusinessException('test Exception')
    let data = {
      a: 1,
      b: [2, 3, 4],
      uid: uid0,
      u: u
    }
    return data
  }

  @Get('/list')
  public list () {
    this.templateValue('contentInfo', './header/css/main.css')
    this.templateValue('uid', 1)
    this.templateValue('name', '<span>Jim</span>')
    return this.show('page')
  }

  @Get('/list2')
  public list2 () {
    this.templateValue('contentInfo', './header/css/main.css')
    this.templateValue('uid', 2)
    this.templateValue('name', '<span>tim</span>')
    return this.show('page')
  }

  @Get('/info')
  @ResponseBody('xml')
  @Auth()
  // @ResponseXML
  public info(request: Request, response: Response) {
    // console.log('user/info exec')
    // response.error('出错啦')
    // return null
    let test = new Map()
    test.set("a", {k:1, k2: null, k3: false, k4: 'hello'})
    return test
  }
}

