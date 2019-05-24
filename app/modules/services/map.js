
const hashMap = {};

export function AddValue(key, value) {
  hashMap[key] = value;
}

export function GetValueByKey(key) {
  return hashMap[key];
}

export function GetAll() {
  return hashMap;
}
