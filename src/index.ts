/**
 * Created by apple on 2019/6/23.
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { transformRequest } from './helpers/data'
import { buildURL } from './helpers/url'
import { processHeaders} from './helpers/headers';

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRuquestData(config);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRuquestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

export default axios
