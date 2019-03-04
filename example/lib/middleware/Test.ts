import { Middleware, IMiddleware, Request, Response } from '../../../lib';

@Middleware
export default class Test implements IMiddleware {

  public pre(req: Request, res: Response, next: any): void {
    console.log('this is test middleware req');
    next();
  }

  public post(req: Request, res: Response, next: any): void {
    console.log('this is test middleware res');
    next();
  }

}
