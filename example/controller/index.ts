import { BaseController, Controller, Get, Post, Autowired, ResponseJSON, ResponseXML, Request, Response } from '../../lib'

@Controller('/')
export default class Index extends BaseController {

  constructor () {
    super()
  }

  @Get('/')
  public static index () {
    return 'hello'
  }
}
