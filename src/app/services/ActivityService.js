import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
    const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
    return {
        getPosts: () => client.request({
            method: 'GET',
            url: '/api/activities',
        }),
    };
};
