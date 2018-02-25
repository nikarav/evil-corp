import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    signUpUser: ({ name, surname, email, telephone, address, birthday, username, password }) => client.request({
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
    signUpProvider: formData => client.request({
      method: 'POST',
      url: 'api/providers',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    }),
    logIn: ({ username, password }) => client.request({
      method: 'POST',
      url: '/api/sessions',
      data: {
        username,
        password
      }
    }),
    logOut: () => client.request({
      method: 'DELETE',
      url: '/api/sessions'
    }),
    forgot: ({username} ) => client.request({
      method: 'POST',
      url: '/api/parent/forgot',   // the same as /api/parent/forgot
      data: {
        username
      }
    })
  };
};
