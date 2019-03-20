import { Middleware } from '../decorator'
import IMiddleware from '../base/middleware'
import Request from '../base/request'
import Response from '../base/response'
import { xmlEncode } from '../utils'

@Middleware
export default class ResponseXML implements IMiddleware {

  public pre(req: Request, res: Response, next: any): void {
    res.type('application/xml')
    next()
  }

  public post(req: Request, res: Response, next: any): void {
    res.setData(xmlEncode(res.getData()))
    next()
  }

}
