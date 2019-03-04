import Service from '../bean/service';

export default function (name: any) {
  if (typeof name === 'string') {
    return (target): void => {
      Service.addBean(name || target, target);
    };
  } else {
    Service.addBean(name, name);
    return name;
  }
}
