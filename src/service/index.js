export function Store() {
  let storage = window.localStorage || {};

  this.get = function(key) {
    return JSON.parse(storage[key]);
  };

  this.set = function(key, value) {
    storage[key] = JSON.stringify(value);
  };
}