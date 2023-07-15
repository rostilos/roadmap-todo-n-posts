import _get from 'lodash.get';

import { _isArrayEmpty, _keys } from '../../utils';

export function responseContainErrors(response) {
  const errors = _get(response, 'errors', []);

  return !_isArrayEmpty(errors);
}

export function responseDataEmpty(response) {
  const data = _get(response, 'data');
  const responseDataName = _get(_keys(data), '0');
  const responseData = _get(data, responseDataName);

  return !responseData;
}

export function paramsToObject(entries) {
  const result = {}
  for(const [key, value] of entries) { 
    result[key] = value;
  }
  return result;
}
