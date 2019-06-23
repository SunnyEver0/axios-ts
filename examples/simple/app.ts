/**
 * Created by apple on 2019/6/23.
 */
import axios from '../../src';

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
