import Application from '../application'
import daoInit from './dao'

export default async function applicationStarter(application: Application) {
  daoInit(application)
}
