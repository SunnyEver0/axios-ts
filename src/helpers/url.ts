/**
 * Created by apple on 2019/6/25.
 */
import {isDate, isObject} from './util';

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url;
  }

  const parts: string[] = [];

  Object.keys(params).forEach((key) => {
    const val = params[key];
    if (val === null || typeof val === 'undefined') {
      return;
    }
    let values = [];
    // 1.判断params value是不是数组，
    //    a.如果是需要将key转换成'key'[]
    //    b.如果不是，则需要将value转换为数组，方便进行下一步的遍历
    if (Array.isArray(val)) {
      values = val;
      key += '[]'
    } else {
      values = [val];
    }

    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString();
      } else if (isObject(val)) {
        val = JSON.stringify(val);
      }

      parts.push(`${encode(key)}=${encode(val)}`);
    })
  });
  console.log(parts, 'parts');
  let serializedParams = parts.join('&');

  if (serializedParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}
