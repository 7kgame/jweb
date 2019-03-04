import ResponseJSON from './ResponseJSON';
import ResponseXML from './ResponseXML';

export default function getInnerMiddleware (type) {
  switch (type) {
    case 'json':
      return ResponseJSON;
    case 'xml':
      return ResponseXML;
    default:
      return null;
  }
}