import * as Path from 'path';
import * as Hapi from "hapi";
import * as Inert from "inert";
import * as Hoek from "hoek";
import { EventEmitter } from "events";

import BeanFactory from './bean';
import PreStart from './prestart';

const defaultOptions = {
  port: 3000,
  host: 'localhost',

  configNS: 'node-web',
  controllerDir: 'controller',
  viewDir: 'view',
  tplExt: 'html'
};

export enum AppErrorEvent {
  REQUEST = 'error_request'
}

export default class Application extends EventEmitter {

  private static ins: Application;

  private appOptions: any = {};
  public properties = {};

  public root: string;
  public resource: string;

  public configNS: string;
  public controllerDir: string;
  public viewDir: string;
  public tplExt: string;

  private server: Hapi.Server;

  constructor () {
    super();
  }

  public static create (): Application {
    const ins = Application.ins = new Application();
    ins.appOptions = Hoek.applyToDefaults(defaultOptions, ins.appOptions);
    return ins;
  }

  public static getIns (): Application {
    return Application.ins;
  }

  public options (options: object): Application {
    Hoek.merge(this.appOptions, options, false, true);
    return this;
  }

  private init (root: string): void {
    if ( !root ) {
      console.log('root path is required!');
      process.exit();
    }
    this.root = root;

    if (typeof this.appOptions.resource === 'undefined') {
      this.appOptions.resource = Path.dirname(root) + Path.sep + 'public';
    }
    this.resource = this.appOptions.resource;

    this.configNS = this.appOptions.configNS;
    this.controllerDir = this.appOptions.controllerDir;
    this.viewDir = this.appOptions.viewDir;
    this.tplExt = this.appOptions.tplExt;

    this.bindEvent();

    this.server = new Hapi.Server({
      port: this.appOptions.port,
      host: this.appOptions.host
    });
  }

  private bindEvent (): void {
    this.on(AppErrorEvent.REQUEST, err => {
      console.error("Request error: ", err);
    });
  }

  public async start (root: string): Promise<Application> {
    this.init(root);
    PreStart(this);

    let dirs = this.appOptions.componentDirs || [this.root];
    await BeanFactory.scan(dirs);

    await this.server.register(Inert);
    await this.server.start();
    console.log(`Server running at: ${this.server.info.uri}`);

    this.registerExit();
    return this;
  }

  public route (option: any): Application {
    this.server.route(option);
    return this;
  }

  public addProperty (property): Application {
    Hoek.merge(this.properties, property, false, true);
    return this;
  }

  private registerExit (): void {
    let exitHandler = function (options, code) {
      if (options && options.exit) {
        console.log('application exit at', code);
        BeanFactory.destroy();
        process.exit();
      } else {
        console.log('exception', code);
      }
    };

    process.on('exit', exitHandler.bind(this, {exit: true}));

    // catch ctrl+c event
    process.on('SIGINT', exitHandler.bind(this, {exit: true}));

    // catch "kill pid"
    process.on('SIGUSR1', exitHandler.bind(this, {exit: true}));
    process.on('SIGUSR2', exitHandler.bind(this, {exit: true}));

    // catch uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(this, {exit: false}));
  }
}
