/**
 * Created by apple on 2019/6/23.
 */
import {AxiosRequestConfig} from './types';
import xhr from './xhr';

function axios(config: AxiosRequestConfig) {
  xhr(config);
}

export default axios
