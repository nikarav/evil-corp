import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
    const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
    return {
        userSendMessage: ({email, subject, message}) => client.request({
            method: 'POST',
            url: '/api/user/sendMessage',
            data:{
              email,
              subject,
              message
            }
        }),
        parentSendMessage: ({ subject, message}) => client.request({
            method: 'POST',
            url: '/api/parent/sendMessage',
            data:{
              subject,
              message
            }
        }),
        providerSendMessage: ({ subject, message}) => client.request({
            method: 'POST',
            url: '/api/provider/sendMessage',
            data:{
              subject,
              message
            }
        }),
    };
};
