import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    resetParent: ({password}) => client.request({
      method: 'POST',
      url: '/api/parent/reset/:token',
      data:{
        password
      }
    }),
    resetProvider: ({password}) => client.request({
      method: 'POST',
      url: '/api/provider/reset/:token',
      data:{
        password
      }
    }),
  };
};
