/**
 * Created by apple on 2019/6/25.
 */
// 谓词类型
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object';
}
