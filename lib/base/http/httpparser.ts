import * as Http from 'http'

import * as formidable from 'formidable'

import Request, { NO_BODY_REQUESTS } from '../request'
import Response from '../response'

export function setCorsHeader (req: Http.IncomingMessage, res: Http.ServerResponse, options: any) {

}

export default function httpParser (req: Http.IncomingMessage, res: Http.ServerResponse, options: any, success: any, fail: any) {
  setCorsHeader(req, res, options)
  const request = new Request(req, res)
  const response = new Response(req, res)

  const hasBody = NO_BODY_REQUESTS.indexOf(request.method) < 0
  let form: formidable.IncomingForm = null
  if (hasBody) {
    // https://github.com/node-formidable/node-formidable
    form = new formidable.IncomingForm()
    form.parse(req, function(err, fields: formidable.Fields, files: formidable.Files) {
      if (err) {
        return fail(err, request, response)
      }
      console.log(fields)
      success(request, response)
    })
    // form.on('file', function(name, file: formidable.File) {
    // })
    // form.on('progress', function(bytesReceived, bytesExpected) {
    // })
    // form.on('field', function(name, value) {
    // })
  } else {
    success(request, response)
  }
}