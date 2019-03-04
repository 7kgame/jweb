
export default class Bean {

  private static container = new Map();

  public static init (): void {
  }

  public static async initBeans (): Promise<void> {
  }

  private static getKey (name): string {
    if ( name && typeof name !== 'string' ) {
      if ( !name.name ) {
        return;
      }
      return `${name.name[0].toLowerCase()}${name.name.slice(1)}`;
    } else {
      return name;
    }
  }

  public static addBean0 (container, target, options): void {
    let key = Bean.getKey(options.key);
    if ( container.get(key) ) {
      return;
    }
    container.set(key, {
      target: target,
      ins: null
    });
  }

  public static addBean(target, options): void {
    Bean.addBean0(Bean.container, target, options);
  }

  public static getBean0 (container, name) {
    let key = Bean.getKey(name);
    if ( !container.get(key) ) {
      return;
    }
    const beanInfo = container.get(key);
    if ( !beanInfo.ins ) {
      beanInfo.ins = new (beanInfo.target)();
    }
    return beanInfo.ins;
  }

  public static getBean(name) {
    return Bean.getBean0(Bean.container, name);
  }

  public static async destroy (): Promise<void> {
    Bean.container = null;
  }

  public static remove (name): void {
  }
}
