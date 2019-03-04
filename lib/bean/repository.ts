import Bean from './bean';

export default class Repository {

  private static container = new Map();

  public static init (): void {
  }

  public static async initBeans (): Promise<void> {
  }

  public static addBean(key: any, target: any): void {
    Bean.addBean0(Repository.container, target, {
      key: key
    });
  }

  public static getBean(name) {
    return Bean.getBean0(Repository.container, name);
  }

  public static async destroy (): Promise<void> {
    Repository.container = null;
  }

}
