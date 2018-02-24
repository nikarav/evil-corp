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
    signUpProvider: ({brand_name, email, telephone, address, tax_registration, bank_iban, username, password}) => client.request({
      method: 'POST',
      url: 'api/providers',
      data: {
        brand_name,
        email,
        telephone,
        address,
        tax_registration,
        bank_iban,
        username,
        password,
      }
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
