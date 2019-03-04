export class Application {
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
  options (options: any): Application;
  start (root: string): Promise<void>;
  route (option: any): void;
  addConfiguration (configuration: any): void;
}
