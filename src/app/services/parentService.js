import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getCredits: () => client.request({
      method: 'GET',
      url: '/api/parents/credits',
    }),
    addCredits: ( {credits}) => client.request({
      method: 'POST',
      url: 'api/parents/credits',
      data: {
        credits
      }
    }),
  };
};
