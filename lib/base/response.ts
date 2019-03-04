import * as Hapi from 'hapi';
import * as Hoek from "hoek";
import * as Boom from 'boom';

export default class Response {

  private static primaryTypes = ['boolean', 'number', 'string'];

  private data;
  private request: Hapi.Request;
  private response: Hapi.ResponseToolkit;
  private resolve;
  private reject;

  constructor (request: Hapi.Request, response: Hapi.ResponseToolkit, resolve: any, reject: any) {
    this.request = request;
    this.response = response;
    this.resolve = resolve;
    this.reject = reject;
  }

  public append (data: any): void {
    if (data === null || data === undefined) {
      return;
    }
    if (this.data === null || this.data === undefined) {
      this.data = data;
    } else {
      let dataType = typeof data;
      if (Array.isArray(data)) {
        this.data = this.data.concat(data);
      } else if (Response.primaryTypes.indexOf(dataType) >= 0) {
        this.data = data;
      } else {
        Hoek.merge(this.data, data);
      }
    }
  }

  public setData (data: any): void {
    this.data = data;
  }

  public getData () {
    return this.data;
  }

  public write (data: any): void {
    if (data === null || data === undefined) {
      return;
    }
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    this.request.raw.res.write(data);
  }

  public flush (): void {
    this.data = null;
    this.request.raw.res.end();
  }

  public writeAndFlush (data: any): void {
    this.write(data);
    this.flush();
  }

  public setHeader (name: string, value: string): void {
    this.request.raw.res.setHeader(name, value);
  }

  public type (mimeType: string): void {
    this.setHeader('Content-Type', mimeType);
  }

  public setCookie (name: string, value: object | string, options?: any): void {
    this.response.response().state(name, value, options);
  }

  public delCookie (name: string, options?: any): void {
    this.response.response().unstate(name, options);
  }

  public error(message?: string): void {
    this.reject(Boom.badGateway(message));
  }

}