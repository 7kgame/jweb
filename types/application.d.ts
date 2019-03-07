import { EventEmitter } from "events";

export class Application extends EventEmitter {
  constructor();

  readonly properties: any;

  readonly root: string;
  readonly resource: string;

  readonly configNS: string;
  readonly controllerDir: string;
  readonly viewDir: string;
  readonly tplExt: string;

  static create (): Application;
  static getIns (): Application;
  // options (options: any): Application;
  start (root: string): Promise<Application>;
  route (option: any): Application;
  addProperty (property: any): Application;
}

export class AppErrorEvent {
  static readonly REQUEST: string;
}
