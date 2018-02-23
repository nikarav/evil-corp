import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
    const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
    return {
        getPosts: () => client.request({
            method: 'GET',
            url: '/api/activities',
        }),
        createPost: ({name, location, description, date, photo, total_tickets,
        available_tickets, min_age, max_age, tags, price}) => client.request({
          method: 'POST',
          url: '/api/activity',
          data: {
            name,
            location,
            description,
            date,
            photo,
            total_tickets,
            available_tickets,
            min_age,
            max_age,
            tags,
            price
          }
        })
    };
};
