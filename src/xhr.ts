/**
 * Created by apple on 2019/6/23.
 */
import { AxiosRequestConfig } from './types';

export default function xhr(config: AxiosRequestConfig) {
  const {url, data = null, method = 'get', headers} = config;
  const request = new XMLHttpRequest();
  request.open(method.toUpperCase(), url, true);

  Object.keys(headers).forEach((name) => {
    // 没有data的时候，设置content-type没有意义 可以直接删掉
    if (data === null && name.toUpperCase() === 'content-type') {
      delete headers[name];
    } else {
      request.setRequestHeader(name, headers[name]);
    }
  });

  request.send(data);
}
