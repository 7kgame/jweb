import {LinkedQueue, LinkedNode} from '../utils'

export default class CacheController {
  private cacheQueue = new LinkedQueue()
  private cacheMap = {}
  private MAX_CACHE_SIZE = 1024 * 1024 * 300
  private tempCacheSize = 0
  private static ins = null
  private constructor() {
  }

  public static getIns(): CacheController {
    if (!CacheController.ins) {
      CacheController.ins = new CacheController()
      return CacheController.ins
    }
    return CacheController.ins
  }
  public cache(key: string, val: string) {
    let buffer = Buffer.from(val)
    let tempSize = this.tempCacheSize + buffer.length
    if (this.tempCacheSize + buffer.length >= this.MAX_CACHE_SIZE) {
      let temp = this.cacheQueue.pop().val
      let tempBuffer = this.cacheMap[temp]
      tempSize -= tempBuffer.length
      delete this.cacheMap[temp]
      while (tempSize >= this.MAX_CACHE_SIZE) {
        temp = this.cacheQueue.pop().val
        tempBuffer = this.cacheMap[temp]
        tempSize = tempSize - tempBuffer.length
        delete this.cacheMap[temp]
      }
    }
    this.cacheQueue.push(new LinkedNode(key))
    this.cacheMap[key] = buffer
    this.tempCacheSize = tempSize
  }
  public release(key: string): boolean {
    let cacheBuffer = this.cacheMap[key]
    if (!cacheBuffer) {
      return false
    }
    this.tempCacheSize -= cacheBuffer.length
    delete this.cacheMap[key]
    return true
  }
  public hit(key: string): string {
    return this.cacheMap[key] ? this.cacheMap[key].toString() : ''
  }
  public reset() {
    while (!this.cacheQueue.empty()) {
      this.release(this.cacheQueue.pop().val)
    }
  }
}

