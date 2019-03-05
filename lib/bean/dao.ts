import Application from '../application';

export default class Dao {

  private static container = new Map();

  public static init (): void {
  }

  public static async initBeans (): Promise<void> {
    const application: Application = Application.getIns();
    const configNS: string = application.configNS;
    const applicationProperties = application.properties;
    if ( !applicationProperties ||
        !applicationProperties[configNS] ||
        !applicationProperties[configNS].data ) {
      return;
    }

    const dataConfigs = applicationProperties[configNS].data;
    let dbKeys = Object.keys(dataConfigs);

    for (let i0 = 0; i0 < dbKeys.length; i0++) {
      let db = dbKeys[i0];
      let dataConfig = dataConfigs[db];
      if ( !Array.isArray(dataConfig) ) {
        dataConfig = [dataConfig];
      }
      if (!dataConfig[0].dao) {
        throw new Error(db + '.dao is required.');
      }
      let daoPath = dataConfig[0].dao;
      let dao = require(daoPath);
      if (dao.default) {
        dao = dao.default;
      }
      let i = 0;
      for (let j = 0; j < dataConfig.length; j++) {
        let config = dataConfig[j];
        let beanName = db + '.' + ( config.bean ? config.bean : 'db' + i );
        if ( !config.bean ) {
          i++;
        }
        let daoIns = new dao(config);
        if ( typeof config.autoconnect === 'undefined' || config.autoconnect) {
          if (daoIns.connect) {
            await daoIns.connect();
          }
        }
        Dao.addBean(beanName, daoIns);
      }
    }
  }

  public static addBean(name: string, target: any): void {
    if ( Dao.container.get(name) ) {
      return;
    }
    Dao.container.set(name, target);
  }

  public static getBean(name) {
    return Dao.container.get(name);
  }

  public static async destroy (): Promise<void> {
    let daoIns = Array.from(Dao.container.values());
    for (let i = 0; i < daoIns.length; i++) {
      let ins = daoIns[i];
      if (ins.disconnect) {
        await ins.disconnect();
      }
    }
    Dao.container = null;
  }

  public static remove (name): void {
  }
}
