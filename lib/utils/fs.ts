import * as fs from 'fs'
import * as Path from 'path'

export function readDirSync (path, cb: Function) {
  let res = fs.readdirSync(path)
  res.forEach( (fname, index) => {
    let fpath = path + Path.sep + fname
    let stat = fs.statSync(fpath)
    if ( stat.isDirectory() ) {
      readDirSync(fpath, cb)
      cb(fpath, false)
    } else {
      cb(fpath, true)
    }
  });
}
