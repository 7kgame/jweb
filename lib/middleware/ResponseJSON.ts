import { Middleware } from '../decorator'
import IMiddleware from '../base/middleware'
import Request from '../base/request'
import Response from '../base/response'
import { jsonEncode } from '../utils'


@Middleware
export default class ResponseJSON implements IMiddleware {

  public pre(req: Request, res: Response, next: any): void {
    res.type('application/json')
    next()
  }

  public post(req: Request, res: Response, next: any): void {
    res.setData(jsonEncode(res.getData()))
    next()
  }

}
