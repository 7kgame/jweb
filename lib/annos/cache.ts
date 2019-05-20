import { AnnotationType, annotationHelper, BeanFactory, CTOR_ID } from 'jbean'
import LRUCache from '../cache/LRUCache'
import Application from '../application'

export const SET_CACHE = '__set_cache'
export const GET_CACHE = '__get_cache'

export default function Cache(expire?: number) {
  return annotationHelper(arguments, callback)
}

BeanFactory.registerStartBean(() => {
  let application = Application.getIns()
  const configNS: string = application.configNS
  const applicationConfigs = application.applicationConfigs
  if ( !applicationConfigs ||
      !applicationConfigs[configNS] ||
      !applicationConfigs[configNS].cache ) {
        LRUCache.create({})
    return
  }
  const cacheConfigs = applicationConfigs[configNS].cache
  let max_cache_size = cacheConfigs.maxCacheSize || undefined
  let expire = cacheConfigs.expire || undefined
  if (max_cache_size) {
    max_cache_size = Number.parseInt(max_cache_size, 10)
  }
  if (expire) {
    expire = Number.parseInt(expire, 10)
  }
  LRUCache.create({
    max_cache_size,
    expire
  })
})

function setCache(url: string, val: string, expire?: number) {
  LRUCache.getIns().set(url, val, expire)
}
function getCache(url: string):string {
  return LRUCache.getIns().get(url)
}
const callback = function (annoType: AnnotationType, ctor: Function | object, field: string, expire?:number) {
  if (typeof ctor === 'object') {
    ctor = ctor.constructor
  }
  ctor['__' + field] = {}
  ctor['__' + field][SET_CACHE] = setCache
  ctor['__' + field][GET_CACHE] = getCache
}