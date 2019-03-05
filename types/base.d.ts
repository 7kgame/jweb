export interface Request {
  url: string;
  path: string;
  payload: any;
  query: any;
  params: any;
  paramsArray: any;
  headers: any;
  cookies: any;

  append (data: any): void;
  setData (data: any): void;
  getData (key?: string): any;
}

export interface Response {
  append (data: any): void;
  setData (data: any): void;
  getData (key?: string): any;
  write (data: any): void;
  flush (): void;
  writeAndFlush (data: any): void;
  redirect (url: string, code?: number): void;
  setHeader (name: string, value: string): void;
  type (mimeType: string): void;
  setCookie (name: string, value: object | string, options?: any): void;
  delCookie (name: string, options?: any): void;
  error(message?: string): void;
}

export interface IMiddleware {
  pre (req: Request, res: Response, next: any): void;
  post (req: Request, res: Response, next: any): void;
}
