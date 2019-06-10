import { Application, Task } from '../../lib'
import { Transactional } from 'jbean'

@Task
@Transactional
export default class HelloTask {

  constructor () {
  }

  public async process(application: Application, args: any) {
    console.log('hello task', args, this)
  }
}