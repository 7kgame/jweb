import Repository from '../bean/repository';

export default function (name: any) {
  if (typeof name === 'string') {
    return (target): void => {
        Repository.addBean(name || target, target);
    };
  } else {
    Repository.addBean(name, name);
    return name;
  }
}
