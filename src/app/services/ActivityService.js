import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
    const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
    return {
        getPosts: () => client.request({
            method: 'GET',
            url: '/api/activities',
        }),
        createPost: formData => client.request({
          method: 'POST',
          url: '/api/activity',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }),
        search: ({text, min_age, max_age, min_price, max_price, distance, lat_lon, tags}) => client.request({
          method: 'POST',
          url: '/api/search',
          data: {
            text,
            min_age,
            max_age,
            min_price,
            max_price,
            distance,
            lat_lon,
            tags
          }
        }),
        getActivity: ({id}) => client.request({
            method: 'GET',
            url: `/api/activity/${id}`
        })
  };
}
