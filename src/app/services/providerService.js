import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getProviderData: ({user}) => client.request({
      method: 'GET',
      url: '/api/provider',
    }),
    changeProfile: ({ name, surname, email, telephone, address, birthday }) => client.request({
      method: 'POST',
      url: '/api/parent/changeProfile',
      data: {
        name,
        surname,
        email,
        telephone,
        address,
        birthday
      }
    }),
    changeCredentials: ({ username, password }) => client.request({
      method: 'POST',
      url: '/api/parent/changeCredentials',
      data: {
        username,
        password
      }
    }),
  };
};
