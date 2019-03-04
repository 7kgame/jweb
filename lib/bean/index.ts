import { readDirSync } from '../utils';

import Dao from './dao';
import Bean from './bean';
import Service from './service';
import Repository from './repository';
import Controller from './controller';
import Middleware from './middleware';

export default class BeanFactory {

  public static currentFilePath: string;

  public static async scan (dirs: String[]): Promise<void> {
    Bean.init();
    Dao.init();
    Service.init();
    Repository.init();
    Middleware.init();
    Controller.init();

    dirs.forEach( dir => {
      readDirSync(dir, (fpath: string, isFile: boolean) => {
        if (fpath.endsWith('.js')) {
          BeanFactory.currentFilePath = fpath;
          require(fpath);
        }
      });
    });

    await Dao.initBeans();
    await Bean.initBeans();
    await Service.initBeans();
    await Repository.initBeans();
    await Middleware.initBeans();
    await Controller.initBeans();
  }

  public static async destroy (): Promise<void> {
    await Controller.destroy();
    await Middleware.destroy();
    await Service.destroy();
    await Repository.destroy();
    await Bean.destroy();
    await Dao.destroy();
  }
}
