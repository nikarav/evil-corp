import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    resetParent: ({token, password}) => client.request({
      method: 'POST',
      url:  `/api/parent/reset/${token}`,
      data:{
        password
      }
    }),
    resetProvider: ({token, password}) => client.request({
      method: 'POST',
      url: `/api/provider/reset/${token}`,
      data:{
        password
      }
    }),
  };
};
