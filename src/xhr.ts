/**
 * Created by apple on 2019/6/23.
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types';
import { parseHeaders } from './helpers/headers';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const {url, data = null, method = 'get', headers, responseType} = config;
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }
    request.open(method.toUpperCase(), url, true);

    request.onreadystatechange = function handleLoad() {
      // 0: 请求未初始化
      // 1: 服务器连接已建立
      // 2: 请求已接收
      // 3: 请求处理中
      // 4: 请求已完成，且响应已就绪
      if (request.readyState !== 4) {
        return;
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType !== 'text' ? request.response : request.responseText;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      resolve(response);
    };

    Object.keys(headers).forEach((name) => {
      // 没有data的时候，设置content-type没有意义 可以直接删掉
      if (data === null && name.toUpperCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    request.send(data);
  })

}
