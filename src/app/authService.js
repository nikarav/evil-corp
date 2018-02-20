import { apiEndpoint } from '../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    login: ({ email, password }) => client.request({
      method: 'POST',
      url: '/sessions',
      data: {
        email,
        password
      }
    }),
    signUp: ({ name, surname, email, telephone, address, birthday, username, password }) => client.request({
      method: 'POST',
      url: '/api/parents',
      data: {
        name,
        surname,
        email,
        telephone,
        address,
        birthday,
        username,
        password
      }
    }),
    logOut: () => client.request({
      method: 'DELETE',
      url: '/sessions'
    })
  };
};
