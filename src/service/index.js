export function Store() {
  let storage = window.localStorage || {};

  this.get = function(key) {
    const storageForyKey = storage[key];
    return storageForyKey && JSON.parse(storageForyKey);
  };

  this.set = function(key, value) {
    storage[key] = JSON.stringify(value);
  };
}