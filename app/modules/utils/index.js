import * as ERROR from './error';

export const $required = (key, value) => {
  if (value === undefined || value === null) {
    throw new Error(`Expect to have ${key} property.`);
  }
};

export const $checkResponse = (response) => {
  if (response.code !== 0) {
    throw new Error(`${response.message}(${response.errMsg})`);
  }
  return response.data;
};

export default ERROR;
