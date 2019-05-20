import { Autowired, BusinessException } from 'jbean'
import { BaseController, Controller, Get, Post, Request, Response, Transactional, Validation, ValidationMode, Cache } from '../../lib'
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
    console.log('init user')
  }

  private preAround (ret) {
    console.log('preAround', ret)
  }

  private postAround (ret) {
    let result = {
      status: 0,
      data: ret.data,
      message: null
    }
    if (ret.err) {
      if (ret.err instanceof BusinessException) {
        result.status = ret.err.code || -1
        result.data = ret.err.data
        result.message = ret.err.err || '系统异常'
      } else {
        result.status = -1
        result.message = ret.err
      }
    }
    return {
      err: null,
      data: result
    }
  }

  private beforeCall (ret) {
    console.log('beforeCall' , ret)
    return ret
  }

  public afterCall (ret) {
    if (ret.err) {
      return {
        status: ret.err.code || -1,
        message: ret.err,
        data: ret.data
      }
    } else {
      return ret
    }
  }

  @Get('/process/{uid}')
  @Cache(1000 * 600)
  @Auth
  @ResponseBody('json')
  @Validation(UserEntity)
  @Transactional
  public async process (req: Request, res: Response, { uid }) {
    const user: UserEntity = req.entity
    console.log('inside call', user, uid)
    // console.log(user['toObject']())
    // console.log('userService is', this.userService)
    // throw new Error('hdhhsh')
    // console.log('uid is ' + uid)
    // return uid
    // throw new Error('test err')
    // let data = await this.userService.hello()
    // return '<div style="color: red">' + 'this is user process ' + uid + ', ' + JSON.stringify(data) + ', ' + this.payService.hello() + '</div>'
    let u = await this.userService.hello(user)

    // throw new BusinessException('test Exception')
    let data = {
      a: 1,
      b: [2, 3, 4],
      uid: uid,
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

