export function src<T>(key: string, setMethod: string): PropertyDecorator {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      set: function (value: T) {
        if (this[key]) {
          this[key][setMethod](value);
        }
      },
    });
  };
}
