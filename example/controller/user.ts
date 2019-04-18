import { Autowired } from 'jbean'
import { BaseController, Controller, Get, Post, ResponseBody, Request, Response } from '../../lib'
import UserService from '../lib/account/UserService'
import PayService from '../lib/account/PayService'
import Auth from '../annos/Auth'

@Controller('/user')
@Auth
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

  private async beforeCall () {
    console.log('beforeCall')
  }

  public async afterCall (ret) {
    console.log('afterCall')
    return ret
  }

  @Get('/process/{uid}')
  @ResponseBody('json')
  public async process (request: Request, response: Response, { uid }) {
    console.log('userService is', this.userService)
    // console.log('uid is ' + uid)
    // return uid
    // throw new Error('test err')
    // let data = await this.userService.hello()
    // return '<div style="color: red">' + 'this is user process ' + uid + ', ' + JSON.stringify(data) + ', ' + this.payService.hello() + '</div>'
    let u = await this.userService.hello()
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
  @Auth('ignore')
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

