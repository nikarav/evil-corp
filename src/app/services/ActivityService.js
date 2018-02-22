import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
    const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
    return {
        fetchPosts: () => client.request({
            method: 'GET',
            url: '/api/activities',
            headers: []
        }),
    };
};
