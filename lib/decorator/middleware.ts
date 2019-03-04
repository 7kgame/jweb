import Middleware from '../bean/middleware';

export default function (name: any) {
  if (typeof name === 'string') {
    return (target): void => {
      Middleware.addBean(name || target, target);
    };
  } else {
    Middleware.addBean(name, name);
    return name;
  }
}