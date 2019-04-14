import { BaseController, Controller, Get, Post, Autowired, ResponseJSON, ResponseXML, Request, Response } from '../../lib'
import Auth from '../annos/Auth'

@Controller('/')
export default class Index extends BaseController {

  constructor () {
    super()
  }

  @Get('/')
  @Auth('this is auth for index')
  public static index () {
    return 'hello'
  }
}
