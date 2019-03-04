import Request from './request';
import Response from './response';

export default interface IMiddleware {

  pre (req: Request, res: Response, next: any): void;
  post (req: Request, res: Response, next: any): void;

}
