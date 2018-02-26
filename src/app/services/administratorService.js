import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getData: () => client.request({
      method: 'GET',
      url: '/api/administrator',
    }),
    isLocked: ({username}) => client.request({
      method: 'POST',
      url: 'api/administrator/checkIfLocked',
      data: {
        username,
      }
    }),
    toggleLock: ({ username }) => client.request({
      method: 'POST',
      url: '/api/administrator/lockUnlockUser',
      data: {
        username,
      }
    }),
    changeEmail: ({email}) => client.request({
      method: 'POST',
      url: '/api/administrator/changeEmail',
      data: {
        email,
      }
    }),
    approveProvider: ({username} ) => client.request({
      method: 'POST',
      url: '/api/administrator/approveProvider',
      data: {
        username,
      }
    }),
    rejectProvider: ({username} ) => client.request({
      method: 'POST',
      url: '/api/administrator/rejectProvider',
      data: {
        username,
      }
    }),
    forgot: ({username} ) => client.request({
      method: 'POST',
      url: '/api/administrator/forgot',
      data: {
        username,
      }
    }),
    userData: ({username} ) => client.request({
      method: 'POST',
      url: '/api/administrator/userData',
      data: {
        username,
      }
    }),
    providersForApproval: () => client.request({
      method: 'GET',
      url: '/api/administrator/providersForApproval',
    }),
  };
};
